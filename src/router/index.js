import { createRouter, createWebHistory } from 'vue-router';

import Landing from '@/views/Landing';
import Generator from '@/views/Generator/Index';
import Upload from '@/views/Generator/Upload';
import Printing from '@/views/Generator/Printing';

export const ROUTES = {
  Home: 'home',
  Upload: 'upload',
  Print: 'print'
};

const routes = [
  { name: ROUTES.Home, path: '/', component: Landing },
  {
    component: Generator,
    redirect: { name: ROUTES.Upload },
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
