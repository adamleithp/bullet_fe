<template>
  <div>
		<Header/>

		Params: {{$route.params.month}}/{{$route.params.year}}
    Month View

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
}
</script>
