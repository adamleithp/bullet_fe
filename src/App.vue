	<template>
	<div>
		<ul class="nav">
			<li>
				<router-link :to="{ path: '/' }">Bullet Journal</router-link>
			</li>
			<li>
				<router-link class="link--active" :to="{ path: '/calendar/' + getCurrentYear + '/' + getCurrentMonth }">My Calendar</router-link>
			</li>
		</ul>
		<router-view/>
	</div>
</template>

<script>
export default {
	computed: {
		getCurrentMonth() {
			const today = new Date();
			return (today.getMonth())
		},
		getCurrentYear() {
			const today = new Date();
			return (today.getFullYear())
		}
	}
}
</script>


<style lang="scss">
@import './styles/global.scss';

body {
	background: #222;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
a {
	font-weight: bold;
	color: #fff;
}
.link--active {
	border-bottom: 2px solid green;
}
</style>
