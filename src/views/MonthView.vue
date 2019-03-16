<template>
  <div>
		<MonthNavigation/>
		<DayNavigation/>
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
	},
}
</script>
