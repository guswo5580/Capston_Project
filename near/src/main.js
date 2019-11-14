import Vue from 'vue';
import App from './App.vue';
import { router } from './routes/index';
Vue.config.productionTip = false;

import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyA0vOfiRA790kgJ4-7Rx22ZvJL2g4VHA-c',
		libraries: 'places', // necessary for places input
	},
});

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);
new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
