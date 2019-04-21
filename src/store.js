/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user')); // change this to token

  if (user && user.id) {
      return {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + user.id
      };
  } else {
      return {
        'Content-Type': 'application/json',
      };
  }
}


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

const user = JSON.parse(localStorage.getItem('user'));

export default new Vuex.Store({
  state: {
    loading: false,
    user: user ? user : null,
    cards: null,
  },
  mutations: {
    isLoading(state, loading) {
      state.loading = loading;
    },
    updateUser(state, user) {
      state.user = user;
      localStorage.setItem('token', JSON.stringify(user.id));
      localStorage.setItem('user', JSON.stringify(user));
    },
    logoutUser(state) {
      state.user = null,
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setMonthCards(state, cards) {
      state.cards = cards;
    },
    newCardAdded(state, card) {
      state.cards.push(card)
    },
    cardEdited(state, updatedCard) {
      // Get index position from ID, replace with updated data
      var cardPosition = state.cards.map(function(x) {return x.id; }).indexOf(updatedCard.id);
      state.cards.splice(cardPosition, 1, updatedCard);
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
            headers: authHeader()
        });
        commit('setMonthCards', result.data.data.getCards);
        commit('isLoading', false);
      } catch (error) {
        console.error(error);
      }
    },


    async logoutUser({ commit }) {
      commit('logoutUser');
    },


    async createUser({ commit }, { email, password }) {
      commit('isLoading', true);

      const endpoint = `https://9o9ra2vwl6.execute-api.us-east-1.amazonaws.com/Prod/users?query=${encodeURIComponent(
        `mutation {
          createUser(
            input: {
              email: "${email}",
              password: "${password}"
            }
          ){
            id,
            email,
          }
        }`
      )}`;

      try {
        var result = await axios({
            method: "GET",
            url: endpoint,
            headers: {
              'Content-Type': 'application/json',
            }
        });

        const response = result.data;

        if (response.errors) {
          console.log(response.errors[0].message);
          return;
        }

        commit('updateUser', response.data.createUser);
        commit('isLoading', false);
      } catch (error) {
        console.error(error);
      }
    },


    async loginUser({ commit }, { email, password }) {
      commit('isLoading', true);

      console.log('there is no login endpoint yet');


      // const endpoint = `https://9o9ra2vwl6.execute-api.us-east-1.amazonaws.com/Prod/users?query=${encodeURIComponent(
      //   `mutation {
      //     createUser(
      //       input: {
      //         email: "${email}",
      //         password: "${password}"
      //       }
      //     ){
      //       id,
      //       email,
      //     }
      //   }`
      // )}`;

      try {
      //   var result = await axios({
      //       method: "GET",
      //       url: endpoint,
      //       headers: {
      //         'Content-Type': 'application/json',
      //       }
      //   });

      //   const response = result.data;

      //   if (response.errors) {
      //     console.log(response.errors[0].message);
      //     return;
      //   }

      //   commit('updateUser', response.data.createUser);
        commit('isLoading', false);
      } catch (error) {
        console.error(error);
      }
    },



    async createCardOnThisDay({ commit }, {title, type, day, month, year}) {
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
            headers: authHeader()
        });

        commit('newCardAdded', result.data.data.createCard);
        commit('isLoading', false);
      } catch (error) {
        console.error(error);
      }
    },





    async editCardOnThisDay({ commit }, {id, title, type, day, month, year}) {
      commit('isLoading', true);

      const endpoint = `https://9o9ra2vwl6.execute-api.us-east-1.amazonaws.com/Prod/cards?query=${encodeURIComponent(
        `mutation {
          updateCard(
            id: "${id}",
            input: {
              name: "${title}",
              type: ${type},
              date: {
                day_number: ${day},
                month_number: ${month},
                year_number: ${year}
              }
            }
          ){
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
            headers: authHeader()
        });

        commit('cardEdited', result.data.data.updateCard);
        commit('isLoading', false);
      } catch (error) {
        console.error(error);
      }
    },





    // Update Cards date
    async editCardDate({ commit }, {id, day, month, year}) {
      const endpoint = `https://9o9ra2vwl6.execute-api.us-east-1.amazonaws.com/Prod/cards?query=${encodeURIComponent(
        `mutation {
          updateCard(
            id: "${id}",
            input: {
              date: {
                day_number: ${day},
                month_number: ${month},
                year_number: ${year}
              }
            }
          ){
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
            headers: authHeader()
        });

      } catch (error) {
        console.error(error);
      }
    },
  }
})
