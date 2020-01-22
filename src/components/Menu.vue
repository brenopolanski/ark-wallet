<template>
  <div class="menu-container">
    <Slide right>
      <router-link v-show="walletAddress" :to="{ name: 'wallets', params: { address: walletAddress } }">
        <span class="text-lg hover:text-red-500">My Wallet</span>
      </router-link>
      <a href="#" @click.prevent="toggleFavoriteWalletsModal">
        <span class="text-lg hover:text-red-500">Favorite Wallets</span>
      </a>
      <a href="#" @click.prevent="toggleGenerateWalletModal">
        <span class="text-lg hover:text-red-500">Generate Wallet</span>
      </a>
      <router-link to="/delegates">
        <span class="text-lg hover:text-red-500">Delegates</span>
      </router-link>
      <router-link to="/">
        <span class="text-lg hover:text-red-500">Exit</span>
      </router-link>
    </Slide>
    <FavoriteWalletsModal
      v-if="showFavoriteWalletsModal"
      :is-open="showFavoriteWalletsModal"
      @closeFavoriteWalletsModal="toggleFavoriteWalletsModal"
    />
    <GenerateWalletModal
      v-if="showGenerateWalletModal"
      :is-open="showGenerateWalletModal"
      @closeGenerateWalletModal="toggleGenerateWalletModal"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Slide } from 'vue-burger-menu';
import { FavoriteWalletsModal, GenerateWalletModal } from '@/components';

export default {
  name: 'Menu',
  components: {
    FavoriteWalletsModal,
    GenerateWalletModal,
    Slide
  },
  data() {
    return {
      showFavoriteWalletsModal: false,
      showGenerateWalletModal: false
    };
  },
  computed: {
    ...mapState(['wallet']),
    walletAddress() {
      return this.wallet.address;
    }
  },
  methods: {
    toggleFavoriteWalletsModal() {
      this.showFavoriteWalletsModal = !this.showFavoriteWalletsModal;
    },
    toggleGenerateWalletModal() {
      this.showGenerateWalletModal = !this.showGenerateWalletModal;
    }
  }
};
</script>

<style>
.menu-container {
  padding-top: 25px;
}

.bm-overlay {
  background: #f5f5f5 !important;
}

.bm-burger-button {
  right: 6% !important;
}
</style>
