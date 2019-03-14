<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
			<router-link :to="{ path: '/' + getCurrentYear + '/' + getCurrentMonth }">Calendar</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
	computed: {
		getCurrentMonth() {
			const thisMonth = new Date();
			return thisMonth.getMonth() + 1;
		},
		getCurrentYear() {
			const thisYear = new Date();
			return thisYear.getFullYear();
		}
	}
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
