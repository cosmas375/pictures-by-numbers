import { createRouter, createWebHistory } from 'vue-router';

import Landing from '@/views/Landing';
import PaintByNumbers from '@/views/PaintByNumbers';
const PrinitngSettings = { template: '<h1>fuck you</h1>' };

const routes = [
  { name: 'home', path: '/', component: Landing },
  { name: 'generator', path: '/numbers', component: PaintByNumbers },
  { name: 'printing', path: '/printing', component: PrinitngSettings }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
