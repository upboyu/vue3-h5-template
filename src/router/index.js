import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/sign-in',
    },
    {
      path: '/1024',
      component: () => import('../views/1024/index.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/1024/HomeView.vue'),
          children: [
            {
              path: '',
              component: () => import('../components/1024/home/HomeRules.vue'),
              meta: { isRoot: true },
            },
            {
              path: 'signUp',
              component: () => import('../components/1024/home/HomeSignUp.vue'),
            },
          ],
        },
        {
          path: 'rank',
          component: () => import('../views/1024/RankView.vue'),
        },
        {
          path: 'final-confirmation',
          component: () => import('../views/1024/FinalConfirmation.vue'),
          meta: { isRoot: true },
        },
      ],
    },
    {
      path: '/sign-in',
      component: () => import('../views/signIn/index.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/signIn/Home.vue'),
          meta: { isRoot: true },
        },
        {
          path: 'overview',
          component: () => import('../views/signIn/Overview.vue'),
        },
      ],
    },
  ],
})

export default router
