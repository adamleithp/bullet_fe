<template>
  <div>
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
import MonthNavigation from '@/components/MonthNavigation.vue'
import DayNavigation from '@/components/DayNavigation.vue'

export default {
	name: 'monthView',
  components: {
		MonthNavigation,
		DayNavigation
	}
}
</script>

<style>
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
