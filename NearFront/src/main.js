import Vue from 'vue';
import App from './App.vue';
import { router } from './routes/index';
import { store } from './store/store';
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

import Trend from 'vuetrend';
Vue.use(Trend);

Vue.prototype.$eventBus = new Vue();

// import VueSocketIO from 'vue-socket.io';
// Vue.use(
// 	new VueSocketIO({
// 		debug: true,
// 		connection: SocketIO('http://metinseylan.com:1992', options), //options object is Optional
// 		vuex: {
// 			store,
// 			actionPrefix: 'SOCKET_',
// 			mutationPrefix: 'SOCKET_',
// 		},
// 	})
// );

// import socketIo from 'socket.io';
// import socketIoClient from 'socket.io-client';

// // Vue.use(socketIo, 'http://localhost:7499/');
// // Vue.use(socketIoClient, 'http://localhost:7499/');

new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app');
