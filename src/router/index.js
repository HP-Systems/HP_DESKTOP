import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import DashboardAuth from '@/pages/DashboardAuth.vue';
import GuestIndex from '@/pages/Guests/GuestIndex.vue'
import ReservationsIndex from '@/pages/Reservations/ReservationsIndex.vue';

const routes = [
  { path: '/', name: 'Login', component: LoginForm },
  { path: '/dashboard', name: 'Dashboard', component: DashboardAuth, meta: { requiresAuth: true }},
  { path: '/guests', name: 'Guests', component: GuestIndex, meta: { requiresAuth: true }},
  { path: '/rooms', name: 'Rooms', component: ReservationsIndex, meta: { requiresAuth: true }},
  { path: '/staff', name: 'Personal', component: () => import('@/pages/Staff/StaffIndex.vue'), meta: { requiresAuth: true }},
  { path: '/cards', name: 'NfcCards', component: () => import('@/pages/NFC/NFCIndex.vue'), meta: { requiresAuth: true }},
  { path: '/services', name: 'Services', component: () => import('@/pages/Services/ServicesIndex.vue'), meta: { requiresAuth: true }},
  { path: '/cleaners', name: 'Cleaners', component: () => import('@/pages/Cleaners/CleanersIndex.vue'), meta: { requiresAuth: true }},
  { path: '/:pathMatch(.*)', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;