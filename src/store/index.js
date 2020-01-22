import Vue from 'vue';
import Vuex from 'vuex';
import { storage } from '@/services/storage';
import * as constants from '@/utils/constants';
import * as types from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    network: constants.NETWORK_MAINNET,
    wallet: {
      address: '',
      bookmarks: []
    }
  },
  getters: {
    apiUrl: state => {
      return state.network === constants.NETWORK_MAINNET ? constants.MAINNET_API_URL : constants.DEVNET_API_URL;
    },
    networkVersion: state => state.network === constants.NETWORK_MAINNET
      ? constants.NETWORK_VERSION[constants.NETWORK_MAINNET]
      : constants.NETWORK_VERSION[constants.NETWORK_DEVNET]
  },
  actions: {
    setNetwork({ commit }, value) {
      commit({
        type: types.SET_NETWORK,
        value
      });
    },
    importWalletAddress({ commit }, value) {
      commit({
        type: types.IMPORT_WALLET_ADDRESS,
        value
      });
    }
  },
  mutations: {
    [types.SET_NETWORK](state, payload) {
      storage.set('network', payload.value);
      state.network = payload.value;
    },
    [types.IMPORT_WALLET_ADDRESS](state, payload) {
      storage.set('wallet_address', payload.value);
      state.wallet.address = payload.value;
    }
  }
});
