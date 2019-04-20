/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import querystring from 'querystring'

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
    async getCardsOfThisMonth({ commit }) {
      const endpoint = `https://9o9ra2vwl6.execute-api.us-east-1.amazonaws.com/Prod/cards?query=${encodeURIComponent(query)}`;

      try {
        var result = await axios({
            method: "GET",
            url: endpoint ,
            headers: {
              'Content-Type': 'application/json',
            }
        });
        commit('setMonthCards', result.data.data.getCards);
      } catch (error) {
        console.error(error);
      }
    },
  }
})
