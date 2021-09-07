import { createRouter, createWebHistory } from 'vue-router';

import Landing from '@/views/Landing';
const Generator = () => import('@/views/Generator/Index');
const Upload = () => import('@/views/Generator/Upload');
const Printing = () => import('@/views/Generator/Printing');

export const ROUTES = {
  Home: 'home',
  Upload: 'upload',
  Print: 'print'
};

const routes = [
  { name: ROUTES.Home, path: '/', component: Landing },
  {
    path: '/numbers',
    component: Generator,
    children: [
      {
        name: ROUTES.Upload,
        path: '/numbers',
        component: Upload
      },
      {
        name: ROUTES.Print,
        path: '/numbers/print',
        component: Printing,
        beforeEnter: (to, from, next) => {
          if (from.name) {
            next();
          } else {
            next({ name: ROUTES.Home });
          }
        }
      }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
