/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import querystring from 'querystring'

Vue.use(Vuex)

const getCardsQuery = `{
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
    loading: false,
    cards: null,
  },
  mutations: {
    isLoading(state, loading) {
      state.loading = loading;
    },
    setMonthCards(state, cards) {
      state.cards = cards;
    },
    newCardAdded(state, card) {
      state.cards.push(card)
    },
  },
  actions: {
    async getCardsOfThisMonth({ commit }) {
      commit('isLoading', true);
      const endpoint = `https://9o9ra2vwl6.execute-api.us-east-1.amazonaws.com/Prod/cards?query=${encodeURIComponent(getCardsQuery)}`;

      try {
        var result = await axios({
            method: "GET",
            url: endpoint ,
            headers: {
              'Content-Type': 'application/json',
            }
        });
        commit('setMonthCards', result.data.data.getCards);
        commit('isLoading', false);
      } catch (error) {
        console.error(error);
      }
    },

    async createCardOnThisDay({ commit }, {title, type, day, month, year}) {
      console.log('called', title, type, day, month, year);

      commit('isLoading', true);

      const endpoint = `https://9o9ra2vwl6.execute-api.us-east-1.amazonaws.com/Prod/cards?query=${encodeURIComponent(
        `mutation {
          createCard(input: {
            user_id: "10cd7fb7-0b3a-45dc-8817-d6a61cc2782e",
            name: "${title}",
            type: ${type},
            date: {
              day_number: ${day},
              month_number: ${month},
              year_number: ${year}
            }
          }){
            id,
            name,
            type,
            user_id
            date {
              day_number
              month_number
              year_number
            }
          }
        }`
      )}`;

      try {
        var result = await axios({
            method: "GET",
            url: endpoint ,
            headers: {
              'Content-Type': 'application/json',
            }
        });

        commit('newCardAdded', result.data.data.createCard);
        commit('isLoading', false);
      } catch (error) {
        console.error(error);
      }
    },
  }
})
