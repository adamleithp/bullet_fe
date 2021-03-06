<template>
  <div>
		<ul class="day-list">
			<li
				v-for="(day, idx) in scene.days" :key="`${day.id}`"
				:class="{
					'day-today': isCurrentDay(idx),
					'day-is-clicked': dayClicked === idx,
					'card-on-clipboard': cardOnClipboard ? true : false,
				}"
				v-on:click="handleCardListClick(idx)"
				@paste="handleCardPaste()">

				<!-- Column title -->
				<h1 class="title">{{getDayTitle(idx)}}</h1>

				<Container
					group-name="col"
					class="cards-list"
					tag="ul"
					@drop="(e) => onCardDrop(day.id, e)"
					drag-class="card--dragging"
					drop-class="card--dropping"
					:get-child-payload="getCardPayload(day.id)"
					drag-handle-selector=".card">

					<Draggable
						v-for="(card) in day.cards"
						:key="card.id"
						drag-class="card--dragging">

						<button
							class="card card--icon"
							@keydown.meta.88="handleCardCut(card.id)"
							v-on:dblclick="handleClickToEdit(idx, card.id)"
							v-if="edittingCardId !== card.id"
							:class="{
								'card--is-cut': cardOnClipboard ? (cardOnClipboard.id === card.id) : false,
							}">
              <div class="flex">

								<!-- This is for if you copy the column for exporting -->
								<span class="clip">{{card.type}}:</span>

								<!-- card icons -->
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

							</div>

							<!-- Card title -->
              <p class="text">{{card.name}}</p>
            </button>


						<div v-if="edittingCardId === card.id">
							<CardForm
								formType="edit"
								:dayIndex="idx"
								:handleFormVisibility="handleHideEdit"
								:cardId="card.id"
								:cardTitle="card.name"
								:cardType="card.type"
							/>
						</div>


					</Draggable>
				</Container>

				<!-- Card Create -->
				<ul>
					<li>

						<!-- Click to show form -->
						<button
							type="button"
							class="button button--add"
							:title="`Add a card on ${getDayTitle(idx)}`"
							@click="handleShowAdd(idx)"
							v-show="addingCardIndex !== idx">
							Add Card
						</button>

						<!-- Card create form -->
						<div v-if="addingCardIndex === idx">
							<CardForm
								formType="create"
								:dayIndex="idx"
								:handleFormVisibility="handleHideAdd"
							/>
						</div>
					</li>
				</ul>
			</li>
		</ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DateTime } from 'luxon';
import { Container, Draggable } from "vue-smooth-dnd";
import { getDaysInMonth, getCurrentDay, getCurrentMonth, getCurrentYear, applyDrag } from '@/common';
import CardForm from '@/components/CardForm.vue';

export default {
	name: 'DayNavigation',
	data() {
		return {
			scene: [],
			addingCardActive: false,
			addingCardIndex: null,
			edittingCardActive: false,
			edittingCardId: null,
			dayClicked: null,
			cardOnClipboard: null,
			// newTitle: '',
			// newType: 'note',
		}
	},

	components: {
    Container,
		Draggable,
		CardForm
	},

	watch: {
		// Watch 'route' to trigger rebuild of scene.
    '$route'(to, from) {
			if (from !== to) {
				this.buildScene();
			}
		},

		// Watch 'cards' state to trigger rebuild of scene.
		cards(to) {
      if (to) {
				// TODO: Optimization opt; Diff only necesary becuase this causes a full rebuild of cards...
				this.buildScene();
      }
		},

		// Watch 'refresh' state to trigger rebuild of scene.
		refresh(from, to) {
			if (from !== to) {
				this.$store.dispatch('getCardsOfThisMonth');
				this.cardOnClipboard = null;
			}
		},
	},

	// Call async action
	beforeCreate() {
		this.$store.dispatch('getCardsOfThisMonth');
	},

	computed: {
		// Build local state from application state.
		...mapState({
			cards: state => state.cards,
			refresh: state => state.refresh
		}),
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
	},



	methods: {
		// Used in column class to signify is this column is today
		isCurrentDay(idx) {
			idx = idx + 1;
			const isToday = getCurrentDay(Number(this.$route.params.year), Number(this.$route.params.month), idx);
			return isToday
		},
		// Used in column title, format column title here
		getDayTitle(idx) {
			idx = idx + 1;
			const weekday = DateTime.local(Number(this.$route.params.year), Number(this.$route.params.month), idx).weekdayShort;
			return `${idx}. ${weekday}`
		},
		// Renable for auto-scrolling to today on load.
		// call on on mount?
		scrollToToday() {
			// if (isCurrentMonth(Number(this.$route.params.year), Number(this.$route.params.month))) {
			// 	let content = document.querySelector('#days-list');
			// 	let today = document.querySelector('.day-today');
			// 	content.scrollLeft += (today.offsetLeft - ((document.body.clientWidth / 2) - (today.offsetWidth / 2) ));
			// }
		},

		// Build main view of columns/cards
		buildScene() {
			// Get number of days by routes
			const daysInMonth = getDaysInMonth(this.$route.params.year, this.$route.params.month);

			// Days/Columns array (28-31~)
			let daysArray = [];

			// Build Scene for Days/Columns array
			for (let i = 1; i < daysInMonth; i++) {
				const cardsForToday = this.cards.filter(card => {
					return (card.date.month_number == this.$route.params.month && card.date.day_number === i)
				});
				daysArray.push({
					id: `${this.$route.params.month}-${i}`,
					cards: cardsForToday,
				});
			}

			// Set to state, render
			this.scene = {
				days: daysArray
			};
		},

		// Card
		/////////////////////////////////////

		// show card create form
		handleShowAdd(dayIndex) {
			this.addingCardActive = true;
			this.addingCardIndex = dayIndex;
		},

		// Hide card create form
		handleHideAdd() {
			this.addingCardActive = false;
			this.addingCardIndex = null;
		},

// Card click to edit handling
		handleClickToEdit(dayIndex, cardId) {
			this.handleShowEdit(cardId);
		},

		// show card create form
		handleShowEdit(cardId) {
			this.edittingCardActive = true;
			this.edittingCardId = cardId;
		},

		// Hide card create form
		handleHideEdit() {
			this.edittingCardActive = false;
			this.edittingCardId = null;
		},



		// save day that's clicked as currnet
		handleCardListClick(dayIndex) {
			if (this.dayClicked === dayIndex) return;

			this.dayClicked = dayIndex
		},



		// save card data selected white CMD+X
		handleCardCut(cardId) {
			if (this.cardOnClipboard === cardId) return;

			const thisCard = this.cards.filter(card => {
				return card.id === cardId
			});

			this.cardOnClipboard = thisCard[0]
		},


		handleCardPaste() {
			if (!this.cardOnClipboard) return;

			const storeData = {
				render: true,
				id: this.cardOnClipboard.id,
				day: this.dayClicked + 1,
				month: Number(this.$route.params.month),
				year: Number(this.$route.params.year)
			}

			// Call async action
			this.$store.dispatch('editCardDate', storeData);
		},

		// get cards by day/column ID
		getCardPayload(dayId) {
			return index => {
        return this.scene.days.filter(p => p.id === dayId)[0].cards[
          index
        ];
      };
		},

		// handle drag n drop.
		onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
				const scene = Object.assign({}, this.scene);
        const column = scene.days.filter(p => p.id === columnId)[0];
        const columnIndex = scene.days.indexOf(column);
        const newColumn = Object.assign({}, column);
        newColumn.cards = applyDrag(newColumn.cards, dropResult);
				scene.days.splice(columnIndex, 1, newColumn);

				// const card = dropResult.payload;
				const dayId = columnId.substr(columnId.length - 1);

				// for each card in newColumn, update their dates.
				newColumn.cards.forEach(card => {
					const storeData = {
						render: false,
						id: card.id,
						day: dayId,
						month: Number(this.$route.params.month),
						year: Number(this.$route.params.year)
					}

					// Call async action
					this.$store.dispatch('editCardDate', storeData);
				});

        // UI setting.
        this.scene = scene;
      }
    }
	},

}
</script>


<style lang="scss">
$card-column-width: 300px;
$height-offset: 110px;
// Card Styles
/////////////////////////////////////
@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

@for $i from 1 through 32 {
	.day-list > li:nth-of-type(#{$i}) {
		animation: fadein .2s #{$i/17}s forwards;
	}
}





.day-list {
	display: flex;
  overflow: auto;
  flex: none;
  width: 100%;
	padding: 0;
  flex-flow: row nowrap;
	-webkit-overflow-scrolling: touch;
  -webkit-scroll-snap-type: x mandatory;
  	  -ms-scroll-snap-type: x mandatory;
          scroll-snap-type: x mandatory;

	> li {
		padding: 1rem;
		width: $card-column-width;
		width: 100%;
		flex: 0 0 100%;
		height: calc(100vh - #{$height-offset});
		overflow: scroll;
		opacity: 0;
		-webkit-scroll-snap-align: center;
		    -ms-scroll-snap-align: center;
						scroll-snap-align: center;

		.title {
			font-size: 1.5rem;
			margin: 0 0 1rem;
			font-weight: 100;
			letter-spacing: -0.05rem;
		}

		&.day-today {
			border: 3px solid #008b00;
		}

		&:hover {
			.button--add {
				opacity: 1;
			}
		}
	}
}
.button--add {
	opacity: .2;
}

@media screen and (min-width: 600px) {
  .day-list {
		-webkit-scroll-snap-type: none;
				-ms-scroll-snap-type: none;
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



.cards-list {
	min-height: 100px;
	border: 1px solid #272727;
	border-radius: 5px;
	margin-bottom: 1rem;
	transition: border .1s .1s linear;

	&:focus {
		border: 1px solid red;
	}
	.day-is-clicked & {
		border: 1px solid #333;

	}
	.day-is-clicked.card-on-clipboard & {
		&:after {
			position: absolute;
			top: 0;
			right: 0;
			color: #fff;
			opacity: .3;
			content: 'CTRL+V to paste';
			line-height: 10px;
			padding: 2px;
			border: 1px solid #444;
			border-radius: 3px;
		}
	}
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
	align-items: initial;
	color: #fff;
	border: 1px solid transparent;
	transition: border .1s linear;

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

	// .text {
	// 	white-space: nowrap;
	// 	overflow: hidden;
	// 	text-overflow: ellipsis;
	// }

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
	&:focus {
		border: 1px dashed #545454;
		outline: 0;
	}
}
	.card--dragging {
		background: #222222;
		border: 1px dashed #ccc;
		box-shadow: 0px 3px 3px -1px rgba(0,0,0,.6);
		overflow: hidden;
	}
	.card--dropping {
		border: 1px dashed #545454;
	}
	.card--is-cut {
		position: relative;
		background: #333;
    z-index: 1;

		&:after {
			position: absolute;
			opacity: .3;
			top: 0;
			right: 0;
			color: #fff;
			content: 'CUT';
			line-height: 10px;
			padding: 2px;
			border: 1px solid #444;
			border-radius: 3px;
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

/// Buttons
.button--add {
	width: 100%;
	transition: opacity .2s ease-in-out;
	background: #0000004d;
	color: #fff;

	&:hover,
  &:focus {
    opacity: 1;
  }
}
.button--add {
	height: 3rem;
}

// Card Add form
/////////////////////////////

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
	> li {
		margin-right: .5rem;
	}
}
</style>

