import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/groups',
      name: 'Groups',
      component: () => import('../views/GroupsView.vue'),
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: () => import('../views/LeaderboardView.vue'),
    },
    {
      path: '/nominations',
      name: 'Nominations',
      component: () => import('../views/NominationsView.vue'),
    },
    {
      path: '/playoff',
      name: 'Playoff',
      component: () => import('../views/PlayoffView.vue'),
    },
  ],
})

export default router
