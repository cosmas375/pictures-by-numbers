import { createSSRApp } from 'vue';
import Localization from '@/plugins/Localization';
import UIKit from '@/plugins/UIKit';
import router from '@/router';
import App from '@/App.vue';

function createApp() {
  const app = createSSRApp(App)
    .use(Localization)
    .use(UIKit)
    .use(router);

  return { app, router };
}

export default createApp;
