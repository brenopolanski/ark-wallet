import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import * as constants from '@/utils/constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    network: constants.NETWORK_MAINNET,
    wallet: {}
  },
  getters: {
    apiUrl: state => {
      return state.network === constants.NETWORK_MAINNET ? constants.MAINNET_API_URL : constants.DEVNET_API_URL;
    },
    networkVersion: state => state.network === constants.NETWORK_MAINNET
      ? constants.NETWORK_VERSION[constants.NETWORK_MAINNET]
      : constants.NETWORK_VERSION[constants.NETWORK_DEVNET],
    walletIsEmpty: state => !state.wallet.hasOwnProperty('address')
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
