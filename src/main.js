import { createApp } from 'vue';
import Localization from '@/plugins/Localization';
import ElementUIPlugin from '@/plugins/ElementUI';
import UIKit from '@/plugins/UIKit';
import Router from '@/router';
import App from '@/App.vue';

createApp(App)
  .use(Localization)
  .use(ElementUIPlugin)
  .use(UIKit)
  .use(Router)
  .mount('#app');
