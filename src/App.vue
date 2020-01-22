<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import api from '@/services/api';
import { storage } from '@/services/storage';

export default {
  name: 'App',
  computed: {
    ...mapState(['network', 'wallet']),
    ...mapGetters(['apiUrl'])
  },
  watch: {
    apiUrl: value => (api.defaults.baseURL = value)
  },
  mounted() {
    api.defaults.baseURL = this.apiUrl;
    this.saveConfigFromNetwork();
    this.setWallet();
  },
  methods: {
    ...mapActions(['setNetwork', 'importWalletAddress', 'setFavoriteWallets']),
    saveConfigFromNetwork() {
      const network = storage.get('network') || this.network;
      this.setNetwork(network);
    },
    setWallet() {
      const address = storage.get('walletAddress') || this.wallet.address;
      const bookmarks = JSON.parse(storage.get('walletBookmarks')) || this.wallet.bookmarks;
      this.importWalletAddress(address);
      this.setFavoriteWallets(bookmarks);
    }
  }
};
</script>
