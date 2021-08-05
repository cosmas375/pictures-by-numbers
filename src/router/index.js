import { createRouter, createWebHistory } from 'vue-router';

import Landing from '@/views/Landing';
import Generator from '@/views/Generator/Index';
import Upload from '@/views/Generator/Upload';
const PrinitngSettings = { template: '<h1>fuck you</h1>' };

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
    redirect: { name: ROUTES.Upload },
    children: [
      {
        name: ROUTES.Upload,
        path: './',
        component: Upload
      },
      { name: ROUTES.Print, path: './print', component: PrinitngSettings }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
