import AppVue from './App.vue';
import router from '@/router';
import messages from '@intlify/unplugin-vue-i18n/messages';
import * as LZString from 'lz-string';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  locale: (() => {
    const language = localStorage.locale ?? navigator.language;
    if (language === 'ko' || language === 'ko-KR') {
      document.documentElement.lang = 'ko-KR';
      return 'ko-KR';
    } else if (language === 'ja' || language === 'ja-JP') {
      document.documentElement.lang = 'ja-JP';
      return 'ja-JP';
    } else {
      document.documentElement.lang = 'en-US';
      return 'en-US';
    }
  })(),
  fallbackLocale: 'en-US',
  messages
});

const pinia = createPinia();
pinia.use(
  createPersistedState({
    serializer: {
      serialize: (value: any) => LZString.compressToBase64(JSON.stringify(value)),
      deserialize: (value: string) => JSON.parse(LZString.decompressFromBase64(value))
    }
  })
);
pinia.use(({ store }) => {
  store.router = markRaw(router);
  if (store.init) {
    store.init();
  }
});

const app = createApp(AppVue);
app.use(pinia);
app.use(i18n);
app.use(router);

app.mount('#app');
