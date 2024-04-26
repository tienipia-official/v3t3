import { setupLayouts } from 'virtual:generated-layouts';

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  scrollBehavior: () => ({ left: 0, top: 0 }),
  extendRoutes: (route: RouteRecordRaw[]) => setupLayouts(route)
});

router.beforeEach(async (to, from) => {
  // router-guard
});

export default router;
