import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import * as constants from '@/utils/constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    network: constants.DEFAULT_NETWORK,
    wallet: {}
  },
  getters: {
    apiUrl: state => {
      return state.network === constants.DEFAULT_NETWORK
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
    },
    importWallet({ commit }, value) {
      commit({
        type: types.IMPORT_WALLET,
        value
      });
    }
  },
  mutations: {
    [types.SET_NETWORK](state, payload) {
      state.network = payload.value;
    },
    [types.IMPORT_WALLET](state, payload) {
      state.wallet = payload.value;
    }
  }
});
