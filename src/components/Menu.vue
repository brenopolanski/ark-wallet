<template>
  <div class="menu-container">
    <Slide right>
      <router-link to="/">
        <span class="text-lg hover:text-red-500">Home</span>
      </router-link>
      <a href="#" @click.prevent="toggleGenerateWalletModal">
        <span class="text-lg hover:text-red-500">Generate Wallet</span>
      </a>
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
import GenerateWalletModal from '@/components/GenerateWalletModal';

export default {
  name: 'Menu',
  components: {
    Slide,
    GenerateWalletModal
  },
  data() {
    return {
      showGenerateWalletModal: false
    };
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
