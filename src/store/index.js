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
      bookmarks: {
        [constants.NETWORK_MAINNET]: [],
        [constants.NETWORK_DEVNET]: []
      }
    }
  },
  getters: {
    apiUrl: state => {
      return state.network === constants.NETWORK_MAINNET ? constants.MAINNET_API_URL : constants.DEVNET_API_URL;
    },
    networkVersion: state =>
      state.network === constants.NETWORK_MAINNET
        ? constants.NETWORK_VERSION[constants.NETWORK_MAINNET]
        : constants.NETWORK_VERSION[constants.NETWORK_DEVNET],
    bookmarks: state => state.wallet.bookmarks[state.network]
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
    },
    setFavoriteWallets({ commit }, value) {
      commit({
        type: types.SET_FAVORITE_WALLETS,
        value
      });
    },
    setFavoriteWallet({ commit }, value) {
      commit({
        type: types.SET_FAVORITE_WALLET,
        value
      });
    },
    removeAllFavoriteWallets({ commit }) {
      commit({
        type: types.REMOVE_ALL_FAVORITE_WALLETS
      });
    },
    removeFavoriteWallet({ commit }, value) {
      commit({
        type: types.REMOVE_FAVORITE_WALLET,
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
      storage.set('walletAddress', payload.value);
      state.wallet.address = payload.value;
    },
    [types.SET_FAVORITE_WALLETS](state, payload) {
      state.wallet.bookmarks = payload.value;
    },
    [types.SET_FAVORITE_WALLET](state, payload) {
      const { value } = payload;

      if (state.wallet.bookmarks[state.network].includes(payload.value)) {
        state.wallet.bookmarks[state.network] = state.wallet.bookmarks[state.network].filter(
          address => address !== value
        );
        storage.set('walletBookmarks', JSON.stringify(state.wallet.bookmarks));
      } else {
        state.wallet.bookmarks[state.network].push(value);
        storage.set('walletBookmarks', JSON.stringify(state.wallet.bookmarks));
      }
    },
    [types.REMOVE_ALL_FAVORITE_WALLETS](state) {
      state.wallet.bookmarks[state.network] = [];
      storage.set('walletBookmarks', JSON.stringify(state.wallet.bookmarks));
    },
    [types.REMOVE_FAVORITE_WALLET](state, payload) {
      state.wallet.bookmarks[state.network] = state.wallet.bookmarks[state.network].filter(
        address => address !== payload.value
      );
      storage.set('walletBookmarks', JSON.stringify(state.wallet.bookmarks));
    }
  }
});
