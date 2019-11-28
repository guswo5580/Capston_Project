<template>
	<div class="secondHeader">
		현재 상황
		<span class="timeShow">{{ timeShow }}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			timeShow: '',
		};
	},
	methods: {
		timeFunction() {
			let v = this;
			setInterval(function() {
				let date = new Date().toLocaleDateString();
				let time = new Date().toLocaleTimeString();
				v.timeShow = date + ' ' + time;
			}, 100);
		},
	},
	mounted() {
		this.timeShow = this.timeFunction();
	},
};
</script>

<style>
.secondHeader {
	font-weight: bold;
	font-size: 20px;
	padding: 20px;
}
.timeShow {
	font-size: 1px;
	color: lightgray;
	padding-left: 35%;
}
</style>
