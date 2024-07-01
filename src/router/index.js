import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import DashboardAuth from '@/pages/DashboardAuth.vue';
import GuestIndex from '@/pages/Guests/GuestIndex.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginForm },
  { path: '/dashboard', name: 'Dashboard', component: DashboardAuth, meta: { requiresAuth: true }},
  { path: '/guests', name: 'Guests', component: GuestIndex, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;