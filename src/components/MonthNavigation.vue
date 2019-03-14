<template>
  <div>
		<ul class="flex">
			<li v-for="(month) in months" :key="month">
				<router-link :to="{ path: '/' + $route.params.year + '/' + month }">{{month}}</router-link>
			</li>
		</ul>
  </div>
</template>

<script>
export default {
	name: 'MonthNavigation',
	data() {
		return {
			months: 12,
		}
	},
  props: {
    // msg: String
  }
}
</script>

<style>
.flex {
	list-style: none;
	display: flex;
}
</style>
