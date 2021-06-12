import { createRouter, createWebHistory } from 'vue-router';
import PaintByNumbers from '@/views/PaintByNumbers';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'numbers'
  },
  {
    path: '/numbers',
    name: 'numbers',
    component: PaintByNumbers
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
