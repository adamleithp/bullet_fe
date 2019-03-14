<template>
  <div>
		<ul class="flex">
			<li v-for="(year) in years" :key="year">
				<router-link :to="{ path: '/' + year + '/1' }">{{year}}</router-link>
			</li>
		</ul>
  </div>
</template>

<script>
export default {
	name: 'MonthNavigation',
	data() {
		return {
			years: [
				2019,
				2020
			],
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
