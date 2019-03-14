<template>
  <div>
		<ul class="flex">
			<li v-for="(idx) in getDaysInMonth" :key="idx">
				{{idx}}
			</li>
		</ul>
  </div>
</template>

<script>
export default {
	name: 'DayNavigation',
	computed: {
		getDaysInMonth() {
			return new Date(this.$route.params.year, this.$route.params.month, 0).getDate();
		}
	}
}
</script>

<style>
.flex {
	list-style: none;
	display: flex;
}
</style>
