import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import * as constants from '@/utils/constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    network: constants.DEFAULT_NETWORK
  },
  getters: {
    api_url: state => {
      return state.network === 'mainnet'
        ? constants.MAINNET_API_URL
        : constants.DEVNET_API_URL;
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
