import { createRouter, createWebHistory } from 'vue-router';

import Landing from '@/views/Landing';
import Generator from '@/views/Generator/Index';
import Upload from '@/views/Generator/Upload';
const PrinitngSettings = { template: '<h1>fuck you</h1>' };

const routes = [
  { name: 'home', path: '/', component: Landing },
  {
    path: '/numbers',
    component: Generator,
    redirect: { name: 'upload' },
    children: [
      {
        name: 'upload',
        path: './',
        component: Upload
      },
      { name: 'printing', path: './print', component: PrinitngSettings }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
