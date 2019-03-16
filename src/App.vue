<template>
  <div id="app">
		<div v-if="swDebugging" class="sw-debugging-banner">
			Service Worker: {{swDebugging}}
		</div>

    <div id="nav">
      <router-link to="/">Home</router-link> |
			<router-link :to="{ path: '/calendar/' + getCurrentYear + '/' + getCurrentMonth }">Calendar</router-link>
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
		},

		// Service Worker Debugging.
		swDebugging() {
			const swState = localStorage.getItem('sw_state') || false
			return swState;
		}
	}
}
</script>


<style lang="scss">
body {

	background: #222;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
#nav {
  padding: 30px;
}
  a {
    font-weight: bold;
    color: #fff;
  }
</style>
