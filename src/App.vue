<template>
	<div>
		<div class="overlay loading" v-if="loading">
			LOADING
		</div>

		<div class="overlay" v-if="!user">
			{{user}}
			<AuthForm/>
		</div>

		<div class="flex justify-between">
			<ul class="nav">
				<li>
					<router-link class="link" :to="{ path: '/' }">Bullet Journal</router-link>
				</li>
				<li>
					<router-link class="link link--active" :to="{ path: '/calendar/' + currentYear + '/' + currentMonth }">My Calendar</router-link>
				</li>
			</ul>
			<ul v-if="user" class="nav">
				<li>
					<button v-on:click="handleLogoutClick()" class="link">Logout</button>
				</li>
			</ul>
		</div>
		<router-view/>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { getCurrentMonth, getCurrentYear } from '@/common';
import AuthForm from '@/components/AuthForm.vue';

export default {
	// data() {
	// 	return {
	// 		authorizing: true
	// 	}
	// },
	components: {
		AuthForm
	},
	computed: {
		currentMonth() {
			let month = getCurrentMonth();
			return month
		},
		currentYear() {
			let year = getCurrentYear();
			return year
		},
		...mapState({
			user: state => state.user,
			loading: state => state.loading
		}),
	},
	methods: {
		handleLogoutClick() {
			this.$store.dispatch('logoutUser');
		}
	}
}
</script>


<style lang="scss">
@import './styles/global.scss';

body {
	font-size: 14px;
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
