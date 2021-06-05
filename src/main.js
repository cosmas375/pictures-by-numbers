import { createApp } from 'vue';
import Localization from '@/plugins/Localization';
import ElementUIPlugin from '@/plugins/ElementUI';
import UIKit from '@/plugins/UIKit';
import App from '@/App.vue';

const app = createApp(App);

app.use(Localization);
app.use(ElementUIPlugin);
app.use(UIKit);

app.mount('#app');
