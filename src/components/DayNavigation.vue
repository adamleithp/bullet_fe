<template>
  <div>
		<ul id="days-list" class="day-list">
			<li
				v-for="(day, idx) in scene.days" :key="`${idx}-${Math.random()}`"
				:class="{'day-today': isCurrentDay(idx)}">
				<h1 class="title">{{getDayTitle(idx)}}</h1>

				<ul class="cards-list">
					<li
						v-for="(card) in day.cards" :key="card.id">
						<button class="card card--icon">
              <svg v-if="card.type === 'task'" class="icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Task</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle fill="#fff" fill-rule="nonzero" cx="12" cy="12" r="4"></circle></g>
              </svg>
              <svg v-if="card.type === 'event'" class="icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Event</title>
								<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <circle stroke="#fff" stroke-width="2" fill-rule="nonzero" cx="12" cy="12" r="4"></circle>
                </g>
              </svg>
              <svg v-if="card.type === 'note'" class="icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<title>Note</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(7.000000, 11.000000)" fill="#fff">
                    <polygon points="10 2 0 2 0 0 10 0"></polygon>
                  </g>
                </g>
							</svg>
              <p class="text">{{card.name}}</p>
            </button>
					</li>
					<!-- <li>
						<button class="card card--icon">
              <svg class="icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Task</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle fill="#000000" fill-rule="nonzero" cx="12" cy="12" r="4"></circle></g>
              </svg>
              <p class="text">Task Title</p>
            </button>
					</li>
					<li>
						<button class="card card--icon">
              <svg class="icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Event</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <circle stroke="#000000" stroke-width="2" fill-rule="nonzero" cx="12" cy="12" r="4"></circle>
                </g>
              </svg>
              <p class="text">Event Title</p>
            </button>
					</li>
					<li>
						<button class="card card--icon">
              <svg class="icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Note</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(7.000000, 11.000000)" fill="#000000">
                    <polygon points="10 2 0 2 0 0 10 0"></polygon>
                  </g>
                </g>
              </svg>
              <p class="text">Note Title</p>
            </button>
					</li> -->


					<!-- Card Create ///////////////////////////////////////////////////////////////////////// -->
					<li>
						<button
							type="button"
							class="button button--add"
							:title="`Add a card on ${getDayTitle(idx)}`"
							@click="handleShowAdd(idx)"
							v-show="addingCardIndex !== idx">
							Add Card
						</button>

						<form
							v-if="addingCardIndex === idx"
							v-on:submit.prevent="handleCardFormSubmit">
							<textarea-autosize
								class="input"
								:min-height="24"
								:max-height="(24*4)"
								placeholder="type some text"
								rows="1"
								@keydown.native.13="handleTextareaEnter"
							></textarea-autosize>

							<ul class="card__type-list">
								<li>
									<p>
										<label :for="`type-note-${idx}`">
											<input type="radio" name="card-type" :id="`type-note-${idx}`" checked>Note
										</label>
									</p>
								</li>

								<li>
									<p>
										<label :for="`type-task-${idx}`">
											<input type="radio" name="card-type" :id="`type-task-${idx}`">Task
										</label>
									</p>
								</li>

								<li>
									<p>
										<label :for="`type-event-${idx}`">
											<input type="radio" name="card-type" :id="`type-event-${idx}`">Event
										</label>
									</p>
								</li>
							</ul>

							<ul class="card__action-list">
								<li>
									<button
										type="submit"
										class="button"
										title="Click, then Press E for event, Press T for task, Press N for note">
										Save
									</button>
								</li>
								<li>
									<button
										type="button"
										class="button"
										@click="handleHideAdd()"
										title="Click, then Press E for event, Press T for task, Press N for note">
										Cancel
									</button>
								</li>
							</ul>

						</form>
					</li>
				</ul>
			</li>
		</ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DateTime } from 'luxon';
// import { Container, Draggable } from "vue-smooth-dnd";
import { getDaysInMonth, getCurrentDay, getCurrentMonth, getCurrentYear, isCurrentMonth } from '@/common';

export default {
	name: 'DayNavigation',
	data() {
		return {
			scene: [],
			addingCardActive: false,
			addingCardIndex: null,
		}
	},

	// components: {
  //   Container,
  //   Draggable
  // },

	created() {
		this.$store.dispatch('getCardsOfThisMonth', {
			year: Number(this.$route.params.year),
			month: Number(this.$route.params.month)
		})

		const daysInMonth = getDaysInMonth(this.$route.params.year, this.$route.params.month);

		let sceneArray = [];

		// Build Scene for days of month.
		for (let i = 1; i < daysInMonth; i++) {
			const cardsForToday = this.cards.filter(card => {
			// console.log('card.date.month_number', card.date.month_number);
				return (card.date.month_number == this.$route.params.month && card.date.day_number === i)
			});
			// console.log('cardsForToday', cardsForToday);

			sceneArray.push({
				cards: cardsForToday,
			});
		}

		// TODO: make Days have a unique ID so we can pass it to :key and force a rerender of the days.
		this.scene = {
			days: sceneArray
		};
	},

	computed: {
		daysInMonth() {
			return getDaysInMonth(this.$route.params.year, this.$route.params.month);
		},
		currentMonth() {
			let month = getCurrentMonth();
			return month
		},
		currentYear() {
			let year = getCurrentYear();
			return year
		},


		// Build Scene
		...mapState({
			cards: state => state.cards
		})
	},



	methods: {
		isCurrentDay(idx) {
			idx = idx + 1;
			const isToday = getCurrentDay(Number(this.$route.params.year), Number(this.$route.params.month), idx);
			return isToday
		},
		getDayTitle(idx) {
			idx = idx + 1;
			const weekday = DateTime.local(Number(this.$route.params.year), Number(this.$route.params.month), idx).weekdayShort;
			return `${idx}. ${weekday}`
		},
		scrollToToday() {
			// if (isCurrentMonth(Number(this.$route.params.year), Number(this.$route.params.month))) {
			// 	let content = document.querySelector('#days-list');
			// 	let today = document.querySelector('.day-today');
			// 	content.scrollLeft += (today.offsetLeft - ((document.body.clientWidth / 2) - (today.offsetWidth / 2) ));
			// }
		},

		// Card Create methods
		/////////////////////////////////////

		// Click "Add Card"
		handleShowAdd(idx) {
			this.addingCardActive = true;
			this.addingCardIndex = idx;
		},
		handleHideAdd() {
			this.addingCardActive = false;
			this.addingCardIndex = null;
		},
		// Card Add Submit
		handleCardFormSubmit() {},
		// Prevent Enter on textarea
		handleTextareaEnter(event) {
			event.preventDefault()
			this.handleCardFormSubmit()
    }
	},

	mounted() {
		this.scrollToToday();
	},
}
</script>


<style lang="scss" scoped>
$card-column-width: 300px;

// Card Styles
/////////////////////////////////////

.day-list {
	display: flex;
  overflow: auto;
  flex: none;
  width: 100%;
  flex-flow: row nowrap;
  scroll-snap-type: x mandatory;
	padding: 0;

	> li {
		padding: 1rem;
		width: $card-column-width;
		width: 100%;
		flex: 0 0 100%;
		scroll-snap-align: center;
		height: calc(100vh - 100px);
		overflow: scroll;

		.title {
			font-size: 1.5rem;
			margin: 0 0 1rem;
			font-weight: 100;
			letter-spacing: -0.05rem;
		}

		&.day-today {
			border: 3px solid #008b00;
		}
	}
}

@media screen and (min-width: 600px) {
  .day-list {
		scroll-snap-type: none;

		> li {
			flex: 0 0 50%;
		}
  }
}

@media screen and (min-width: 900px) {
	.day-list > li {
    flex: 0 0 300px;
	}
}


.font-style {
  font-family: verveine, sans-serif;
  font-weight: 400;
  font-style: normal;
}

// Card Styles
/////////////////////////////////////
$card-add--color: #333;

.card {
	padding: 0.5rem;
	cursor: pointer;
	border: 0;
	background: transparent;
	-webkit-appearance: none;
	width: 100%;
	line-height: 24px;
	align-items: center;
	color: #fff;

	.input, .text {
		@extend .font-style;
		font-weight: 500;
		font-size: 1rem;
		line-height: 24px;
		font-style: normal;
		margin: 0;
		align-items: center;
		text-align: left;
	}

	.input {
		height: 24px;
		width: 100%;
		color:#333;
		font-size: 1.5rem;
		border: 0;
		background: transparent;
		line-height: 24px;
		width: 100%;
		padding: 0;
		margin:0;

		&:focus {
			outline: 0px;
		}
	}
}
	.card-text {
		display: inherit;
	}

	.card--icon {
		display: flex;

		.icon-wrapper {
			height: 24px
		}
		.icon {
			margin-right: 1rem;
		}
	}


.button {
	-webkit-appearance: none;
	background: #fff;
	border-radius: 5px;
	line-height: 24px;
	padding: 0 0.5rem;
	border: 0;
	cursor: pointer;
}

.button--add {
	width: 100%;
	// opacity: .2;
	transition: opacity .2s ease-in-out;
	margin-bottom: 1rem;
	margin-top: 1rem;

	&:hover,
  &:focus {
    opacity: 1;
  }
}

.flex {
	display: flex;
}

// Card Add form
//////////////////////////////
.input {
	height: 24px;
	width: 100%;
	color:#333;
	font-size: 1.1rem;
	border: 0;
	// background: transparent;
	line-height: 24px;
	width: 100%;
	padding: .5rem;
	margin:0;

	&:focus {
		outline: 0px;
	}
}

.card__type-list {
	display: flex;

	label {
		padding: .5rem;
		display: flex;
		align-items: center;
		font-size: 14px;

		input {
			margin-right: .5rem;
		}
	}
}

.card__action-list {
	display: flex;

	> li {
		margin-right: .5rem;

		> .button {
			font-size: 14px;
		}
	}
}


// .button--card-type {
// 	-webkit-appearance: none;
// 	border: 1px solid #ccc;
// 	border-radius: 50%;
// 	height: 2rem;
// 	width: 2rem;
// 	padding: 0;
// 	background: transparent;
// 	color: #fff;
// 	margin-right: .5rem;
// }
// 	.button--card-type--active {
// 		background: #fff;
// 		color: #333;
// 	}

</style>

