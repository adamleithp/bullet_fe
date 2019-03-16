<template>
	<div class="headers">
    <MonthNavigation/>
		<!-- <YearNavigation/> -->

		<!-- Viewing: {{$route.params.month}}/{{$route.params.year}} -->
  </div>
</template>

<script>
// import YearNavigation from '@/components/YearNavigation.vue'
import MonthNavigation from '@/components/MonthNavigation.vue'

export default {
	name: 'monthView',
  components: {
    // YearNavigation,
    MonthNavigation,
	},
}
</script>
