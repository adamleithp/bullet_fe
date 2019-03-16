<template>
  <div>
		<Header/>

		<!-- <h1>{{$route.params.month}}/{{$route.params.year}}</h1> -->

		<DayNavigation/>

  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import DayNavigation from '@/components/DayNavigation.vue'

export default {
	name: 'monthView',
  components: {
		Header,
		DayNavigation
	},
	// computed: {
	// 	getMonthTitle() {
	// 		var monthNumber = new Date(this.$route.params.year, this.$route.params.month);
	// 		console.log(monthNumber.getMonth());

	// 		return date
	// 	},
	// }
}
</script>
