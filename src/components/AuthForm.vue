<template>
  <form
		class="form"
		v-on:submit.prevent="handleAuthFormSubmit">
		<h1 v-if="formIntent === 'login'" class="f3 mb1">Login to your Bullet Journal</h1>
		<h1 v-if="formIntent === 'register'" class="f3 mb1">Welcome to Bullet Journal</h1>
		<p class="f5 mb2">Keep your tasks, events and notes in the cloud.</p>

		<input
			class="input mb1"
			v-model="email"
			placeholder="email"
			type="text">
		<input
			class="input mb1"
			v-model="password"
			placeholder="password"
			type="password">


		<ul class="flex justify-end" v-if="formIntent === 'login'">
			<li>
				<button
					type="submit"
					class="button button--primary button--large">
					Login
				</button>
			</li>
			<li>
				<button
					type="button"
					v-on:click="handleJoinClick"
					class="button button--option button--large">
					or Join
				</button>
			</li>
		</ul>


		<ul class="flex justify-end" v-if="formIntent === 'register'">
			<li>
				<button
					type="submit"
					class="button button--primary button--large">
					Join
				</button>
			</li>
			<li>
				<button
					type="button"
					v-on:click="handleLoginClick"
					class="button button--option button--large">
					or Login
				</button>
			</li>
		</ul>
	</form>
</template>

<script>

export default {
	name: 'AuthForm',
	data() {
		return {
			formIntent: 'login',
			email: 'adam@delete.com',
			password: '123123',
		}
	},
  // props: {
	// 	formType: String,
	// 	cardId: String,
	// 	cardTitle: String,
	// 	cardType: String,
  //   addingCardIndex: String,
	// 	dayIndex: Number,
	// 	handleFormVisibility: Function,
	// },
	// directives: {
	// 	focus: {
	// 		inserted: function (el) {
	// 			el.focus()
	// 		}
	// 	}
	// },

	// mounted() {
	// 	this.setFormDefaults();
	// },

	methods: {
		// handle clicking join, change state.
		handleJoinClick() {
			this.formIntent = 'register';
		},
		// handle clicking join, change state.
		handleLoginClick() {
			this.formIntent = 'login';
		},

		// handle form submit
		handleAuthFormSubmit() {
			const storeData = {
				email: this.email,
				password: this.password,
			}

			// Call async action
			if (this.formIntent === 'register') {
				this.$store.dispatch('createUser', storeData);
			}

			if (this.formIntent === 'login') {
				this.$store.dispatch('loginUser', storeData);
			}

			// Reset form inputs
			this.password = '';
		}
	}
}
</script>

<style lang="scss" scoped>
.form {
	width: 100%;
	padding: 0 1rem;
}

@media screen and (min-width: 500px) {
	.form {
		padding: 0 2rem;
	}
}

@media screen and (min-width: 600px) {
	.form {
		height: 600px;
		width: 440px;
	}
}
</style>
