import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Particles from 'particles.vue3';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/global.less'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App);

app.use(VMdPreview).use(store).use(router).use(Particles).use(ElementPlus).mount('#app');
