import {
  createRouter,
  createWebHistory,
  createMemoryHistory
} from 'vue-router';
import isServer from '@/utils/isServer';

const Landing = () => import('@/views/Landing');
const Generator = () => import('@/views/Generator/Index');
const Upload = () => import('@/views/Generator/Upload');
const Printing = () => import('@/views/Generator/Printing');

export const ROUTES = {
  Home: 'home',
  Upload: 'upload',
  Print: 'print'
};

const routes = [
  { path: '/', name: ROUTES.Home, component: Landing },
  {
    path: '/numbers',
    component: Generator,
    children: [
      {
        name: ROUTES.Upload,
        path: '',
        component: Upload
      },
      {
        name: ROUTES.Print,
        path: './print',
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
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: ROUTES.Home }
  }
];

const history = isServer() ? createMemoryHistory() : createWebHistory();

const router = createRouter({ routes, history });

export default router;
