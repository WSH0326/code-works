import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BackToindex from './components/BackToindex.vue';
import pageoffSet from './components/pageoffSet.vue';

Vue.use(ElementUI);

Vue.component('BackToindex',BackToindex)
Vue.component('pageoffSet',pageoffSet)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
