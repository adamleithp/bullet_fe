<template>
	<ul class="nav">
		<li v-for="(month, idx) in months" :key="month">
			<router-link :to="{ path: '/calendar/' + $route.params.year + '/' + idx }">{{month}}</router-link>
		</li>
		<!-- <div class="mini-cal">
			<li v-for="index in 10" :key="index" v-bind:style="{ height: (Math.random() * (12 - 0) + 0) + 'px' }"></li>
			<li class="mini-cal-today" v-bind:style="{ height: '48px', backgroundColor: '#16c156'}">
				<span class="">Today</span>
			</li>
			<li v-for="index in 10" :key="index" v-bind:style="{ height: (Math.random() * (12 - 0) + 0) + 'px' }"></li>
		</div> -->
	</ul>
</template>

<script>

const monthsArray = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'decemember',
];

export default {
	name: 'MonthNavigation',
	data() {
		return {
			months: monthsArray
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
