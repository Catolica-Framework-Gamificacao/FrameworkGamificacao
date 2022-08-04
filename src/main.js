import Vue from 'vue';
import VueToastr from 'vue-toastr';
import toastrConfiguration from '@/plugins/toastr';
import vuetify from '@/plugins/vuetify';
import axios from 'axios';
import router from '@/router';
import App from './App.vue';

axios.defaults.baseURL = process.env.VUE_APP_API_PATH;

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueToastr, toastrConfiguration);

new Vue({
    router,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
