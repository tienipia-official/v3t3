import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import Vue from '@vitejs/plugin-vue';
import * as child from 'child_process';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import Layouts from 'vite-plugin-vue-layouts';

const commitHash = child.execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig({
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash)
  },
  plugins: [
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        '@vueuse/core',
        '@vueuse/head',
        'pinia',
        VueRouterAutoImports,
        {
          'vue-router/auto': ['createRouter', 'createWebHistory']
        },
        {
          from: 'vue-router/auto',
          imports: ['RouteRecordRaw'],
          type: true
        }
      ]
    }),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/locales/**/*.json')]
    }),
    VueRouter({}),
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      resolvers: [
        HeadlessUiResolver({ prefix: 'Hui' }),
        {
          type: 'component',
          resolve: (name) => {
            if (name === 'AgGridVue') {
              return { name: 'AgGridVue', from: 'ag-grid-vue3' };
            }
          }
        }
      ]
    }),
    Layouts(),
    {
      name: 'vue-auto-component-name',
      transform(code, id) {
        if (!id.endsWith('.vue')) {
          return;
        }

        let path = id.replace(__dirname, '');
        let rpath;
        if (path.startsWith('/src/components')) {
          rpath = path.replace('/src/components/', '');
        } else if (path.startsWith('/src/pages')) {
          rpath = path.replace('/src/pages/', '');
        }

        if (rpath) {
          let componentName = rpath.replace('.vue', '').replace(/\//g, '-');
          code += '\n_sfc_main.name="' + componentName + '"';
          return code;
        }
      }
    },
    ViteMinifyPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
