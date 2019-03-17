/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import { GraphQLClient } from 'graphql-request'

Vue.use(Vuex)

const query = `{
  getCards {
    id
    user_id
    name
    type
    date {
      day_number
      month_number
      year_number
    }
    value {
      text
    }
  }
}`;

const fakeData = [
  {
    "id": "dd32990c-d218-4c9c-a45c-c22b3030c714",
    "name": "Wifi Password: this_is2842",
    "type": "note",
    "date": {
      "day_number": 17,
      "month_number": 3,
      "year_number": 2019
    }
  },
  {
    "id": "dd32990c-d218-4c9c-a45c-c22be030c714",
    "name": "Do the thing",
    "type": "task",
    "date": {
      "day_number": 17,
      "month_number": 3,
      "year_number": 2019
    }
  },
  {
    "id": "dd32990c-d2318-4c9c-a45c-c22be030c714",
    "name": "Standup @9am",
    "type": "event",
    "date": {
      "day_number": 17,
      "month_number": 3,
      "year_number": 2019
    }
  },
  {
    "id": "dd32990c-d231d8-4c9c-a45c-c22be030c714",
    "name": "Pick up laundry",
    "type": "task",
    "date": {
      "day_number": 17,
      "month_number": 3,
      "year_number": 2019
    }
  },
]


export default new Vuex.Store({
  state: {
    cards: null,
  },
  mutations: {
    setMonthCards(state, cards) {
      state.cards = cards;
    },
  },
  actions: {
    async getCardsOfThisMonth({ commit }, year, month) {
      // const endpoint = 'https://9o9ra2vwl6.execute-api.us-east-1.amazonaws.com/Prod'
      // const graphQLClient = new GraphQLClient(endpoint, {
      //   credentials: 'include',
      //   mode: 'cors',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // })

      // const data = await graphQLClient.request(query)
      // console.log(JSON.stringify(data, undefined, 2))


      commit('setMonthCards', fakeData)
    },
  }
})
