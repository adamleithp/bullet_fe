<template>
  <div>
		<div class="loading" v-if="loading">
			LOADING
		</div>

		<MonthNavigation/>
		<DayNavigation/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MonthNavigation from '@/components/MonthNavigation.vue'
import DayNavigation from '@/components/DayNavigation.vue'

export default {
	name: 'monthView',
  components: {
		MonthNavigation,
		DayNavigation
	},

	computed: {
		// Build Scene
		...mapState({
			loading: state => state.loading
		}),
	},

	// watch: {
	// 	// Watch for cards state change, then call build.
	// 	loading(newValue, oldValue) {
  //     if (newValue) {
	// 			this.buildScene();
  //     }
  //   },
	// },
}
</script>

<style>
.loading {
	position: fixed;
	width: 100vw;
	height: 100vh;
	background: #000;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1;
	opacity: 0.8;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
