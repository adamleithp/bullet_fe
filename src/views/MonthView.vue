<template>
  <div>
		<YearNavigation/>
		<MonthNavigation/>
		<DayNavigation/>

		Viewing: {{$route.params.month}}/{{$route.params.year}}
    Month
  </div>
</template>

<script>
import YearNavigation from '@/components/YearNavigation.vue'
import MonthNavigation from '@/components/MonthNavigation.vue'
import DayNavigation from '@/components/DayNavigation.vue'

export default {
	name: 'monthView',
  components: {
    YearNavigation,
    MonthNavigation,
    DayNavigation,
	},
}
</script>
