<template>
  <div>
		<div class="loading" v-if="loading">
			LOADING
		</div>

		<div class="flex">

			<!-- Current Calendar -->
			<div class="current-calendar">
				<MonthNavigation/>
				<DayNavigation/>
			</div>

			<!-- Future Log -->
			<div class="future-calendar">
				<ul class="nav">
					<li class="w100">
						<router-link :to="{ path: '/' }">Future Log</router-link>
					</li>
				</ul>
			</div>
		</div>
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

.current-calendar {
	/* width: calc(100% - 300px) */
	width: 100%;
}
.future-calendar {
	width: 300px;
	height: calc(100vh - 60px);
	background: #222;
	border: 5px solid #3e3e3e;
	border-width: 0 0px 0px 5px;
	display: none;
}

</style>
