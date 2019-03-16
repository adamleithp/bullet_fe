<template>
  <div>
		<ul id="days-list">
			<li
				v-for="(idx) in daysInMonth" :key="idx"
				:class="{'day-today': isCurrentDay(idx)}">
				<h1 class="title">{{getDayTitle(idx)}}</h1>
			</li>
		</ul>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
import { getDaysInMonth, getCurrentDay, getCurrentMonth, getCurrentYear } from '@/common';

export default {
	name: 'DayNavigation',
	computed: {
		daysInMonth() {
			return getDaysInMonth(this.$route.params.year, this.$route.params.month);
		},
		currentMonth() {
			let month = getCurrentMonth();
			return month
		},
		currentYear() {
			let year = getCurrentYear();
			return year
		},
	},
	methods: {
		isCurrentDay(idx) {
			const isToday = getCurrentDay(Number(this.$route.params.year), Number(this.$route.params.month), idx);
			return isToday
		},
		getDayTitle(idx) {
			const weekday = DateTime.local(Number(this.$route.params.year), Number(this.$route.params.month), idx).weekdayShort;
			return `${idx}. ${weekday}`
		},
		scrollToToday() {
			let content = document.querySelector('#days-list');
			let today = document.querySelector('.day-today');
			content.scrollLeft += (today.offsetLeft - ((document.body.clientWidth / 2) - (today.offsetWidth / 2) ));
		},
	},
	mounted() {
		this.scrollToToday();
	},
}
</script>


<style lang="scss" scoped>
$card-column-width: 300px;

ul {
	display: flex;
  overflow: auto;
  flex: none;
  width: 100%;
  flex-flow: row nowrap;
  scroll-snap-type: x mandatory;
	padding: 0;

	> li {
		padding: 1rem;
		width: $card-column-width;
		width: 100%;
		flex: 0 0 100%;
		scroll-snap-align: center;
		height: calc(100vh - 100px);
		// background: linear-gradient(90deg, rgb(239, 239, 239) 0%, rgba(245,246,247,1) 94%);
		overflow: scroll;

		.title {
			font-size: 1.5rem;
			margin: 0 0 1rem;
			font-weight: 100;
			letter-spacing: -0.05rem;
			padding-left: 1rem;
		}
		&.day-today {
			border: 3px solid #008b00;
		}
	}
}

@media screen and (min-width: 600px) {
  ul {
		scroll-snap-type: none;

		> li {
			flex: 0 0 50%;
		}
  }
}

@media screen and (min-width: 900px) {
	ul > li {
    flex: 0 0 300px;
	}
}
</style>

