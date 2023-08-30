import { createRouter, createWebHistory } from 'vue-router';
import Designer from './views/Designer.vue';
import Account from './views/Account.vue';
import { supabase } from './supabaseClient';

const routes = [
  { path: '/', redirect: '/account' },
  { path: '/designer', component: Designer }, // Odebráno meta: { requiresAuth: true }
  { path: '/account', component: Account }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});






export default router;
