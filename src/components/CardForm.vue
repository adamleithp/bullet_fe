<template>
  <form
		class="form"
		v-on:submit.prevent="handleCardFormSubmit">

		<textarea-autosize
			class="input"
			v-model="title"
			placeholder="type some text"
			rows="1"
			@keydown.native.13="handleTextareaEnter"
			v-focus
		></textarea-autosize>

		<!-- Card create type radios -->
		<ul class="card__type-list">
			<li>
				<p>
					<label :for="`type-note-${dayIndex}`">
						<input
							type="radio"
							name="card-type"
							:id="`type-note-${dayIndex}`"
							v-model="type"
							value="note">
							Note
					</label>
				</p>
			</li>

			<li>
				<p>
					<label :for="`type-task-${dayIndex}`">
						<input
							type="radio"
							name="card-type"
							:id="`type-task-${dayIndex}`"
							v-model="type"
							value="task">
							Task
					</label>
				</p>
			</li>

			<li>
				<p>
					<label :for="`type-event-${dayIndex}`">
						<input
							type="radio"
							name="card-type"
							:id="`type-event-${dayIndex}`"
							v-model="type"
							value="event">
							Event
					</label>
				</p>
			</li>
		</ul>

		<!-- Card create action buttons -->
		<ul class="card__action-list">
			<li>
				<button
					type="submit"
					class="button button--save"
					title="Click, then Press E for event, Press T for task, Press N for note">
					Save
				</button>
			</li>
			<li>
				<button
					type="button"
					class="button button--cancel"
					@click="handleFormVisibility(false)"
					title="Click, then Press E for event, Press T for task, Press N for note">
					Cancel
				</button>
			</li>
		</ul>

	</form>
</template>

<script>

export default {
	name: 'CardForm',
	data() {
		return {
			title: '',
			type: 'note', // should be a prop...
		}
	},
  props: {
		formType: String,
		cardId: String,
		cardTitle: String,
		cardType: String,
    addingCardIndex: String,
		dayIndex: Number,
		handleFormVisibility: Function,
	},
	directives: {
		focus: {
			inserted: function (el) {
				el.focus()
			}
		}
	},

	mounted() {
		this.setFormDefaults();
	},

	methods: {
		setFormDefaults() {
			if (this.cardTitle) {
				this.title = this.cardTitle
			}
			if (this.cardType) {
				this.type = this.cardType
			}
		},

		// Card Create handle submit
		handleCardFormSubmit() {
			const currentDay = this.dayIndex + 1;
			const currentMonth = Number(this.$route.params.month);
			const currentYear = Number(this.$route.params.year);

			// Validation
			if (this.title === '') {
				// TODO: error validation
				return;
			}

			// Todo: if props, check if state changed vs props, you won't need to call API, just close form.

			// Decide what we are doing with the data (updating/creating)
			// Default is create, change depending on props
			let formActionType = 'createCardOnThisDay';
			let storeData = {
				title: this.title,
				type: this.type,
				day: currentDay,
				month: currentMonth,
				year: currentYear,
			};

			if (this.formType === 'edit') {
				formActionType = 'editCardOnThisDay';
				storeData['id'] = this.cardId
			}

			// Call async action
			this.$store.dispatch(formActionType, storeData);

			// Reset card create input
			this.title = '';

			if (this.formType === 'edit') {
				this.handleFormVisibility(false)
			}
		},

		// Card create textarea, prevent enter key, submit form
		handleTextareaEnter(event) {
			event.preventDefault()
			this.handleCardFormSubmit()
		},

		// Hide card create form
		handleHideAdd() {
			this.addingCardIndex = null;
		},
	}
}
</script>

<style lang="scss">
.form {
	margin-bottom: 1rem;
}
</style>
