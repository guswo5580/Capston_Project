import Vue from 'vue';
import VueRouter from 'vue-router';
import NearPopUp from '../view/NearPopUp.vue';
import NearMissionComplete from '../view/NearMissionComplete';
import NearFlow from '../view/NearFlow';

Vue.use(VueRouter);

export const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/popup',
		},

		{
			path: '/popup',
			component: NearPopUp,
		},

		{
			path: '/missionComplete',
			component: NearMissionComplete,
		},
		{
			path: '/flow',
			component: NearFlow,
		},
	],
});
