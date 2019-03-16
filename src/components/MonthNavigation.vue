<template>
	<ul class="nav">
		<li v-for="(month, idx) in months" :key="month">
			<router-link :to="{ path: '/calendar/' + currentMonth + '/' + getDateIndex(idx) }">{{month}} ---</router-link>
		</li>
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
			months: monthsArray,
			currentMonth: this.$route.params.year
		}
	},
	methods: {
		getDateIndex(idx) {
			const index = idx + 1;
			return index
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
