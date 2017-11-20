import Vue from 'vue'
import Vuex from 'vuex'
import countries from './data/earth.js';
import GeoData from './models/GeoData';

var geoData = new GeoData(countries);

Vue.use(Vuex)

const state = {
  count: 0,
  countries: geoData.countries,
  mapkey: "AIzaSyC6JTJVlQ3EZHiNF9V9yim91Wh1tlhJuI0",
  geocode: "AIzaSyBnwbe8HJoZudRFjADyOYmIFBTsK3JMc4U"
}

const mutations = {
  increment (state) {
    state.count++
  }
}

const actions = {
  increment: ({ commit }) => commit('increment')
}

const getters = {
  countPlural: ({ count }) => Math.min(count, 2)
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})