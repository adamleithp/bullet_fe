<template>
	<ul class="nav">
		<li v-for="(month, idx) in months" :key="month">
			<router-link :to="{ path: '/calendar/' + currentMonth + '/' + getDateIndex(idx) }">
				{{capitalizeMonth(month)}}
			</router-link>
		</li>
	</ul>
</template>

<script>
import {capitalizeString} from '@/common';

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
		},
		capitalizeMonth(str) {
			return capitalizeString(str)
		}
	}
}
</script>

<style lang="scss" scoped>
ul {
	overflow-y: hidden;
}
</style>
