import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    network: 'mainnet'
  },
  getters: {
    api_url: state => {
      return state.network === 'mainnet'
        ? 'https://explorer.ark.io/api'
        : 'https://dexplorer.ark.io/api';
    }
  },
  actions: {
    setNetwork({ commit }, value) {
      commit({
        type: types.SET_NETWORK,
        value
      });
    }
  },
  mutations: {
    [types.SET_NETWORK](state, payload) {
      state.network = payload.value;
    }
  }
});
