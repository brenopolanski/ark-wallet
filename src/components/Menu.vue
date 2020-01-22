<template>
  <div class="menu-container">
    <Slide right>
      <router-link
        v-show="walletAddress"
        :to="{ name: 'wallets', params: { address: walletAddress } }"
      >
        <span class="text-lg hover:text-red-500">My Wallet</span>
      </router-link>
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
    <GenerateWalletModal
      v-if="showGenerateWalletModal"
      :is-open="showGenerateWalletModal"
      @closeGenerateWalletModal="toggleGenerateWalletModal"
    />
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu';
import { mapState } from 'vuex';
import GenerateWalletModal from '@/components/GenerateWalletModal';

export default {
  name: 'Menu',
  components: {
    GenerateWalletModal,
    Slide
  },
  data() {
    return {
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
