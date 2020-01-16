<template>
  <div>
    <Header />
    <div class="wallet-container">
      <div class="flex justify-between">
        <h1 class="font-bold text-3xl">Wallet Summary</h1>
        <span
          class="flex items-center text-gray-500 inline-link"
        >Network: {{ arkName }} | {{ selectedNetwork }}</span>
      </div>
      <WalletDetails :wallet="wallet" />
      <WalletTransactions :wallet="wallet" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header';
import { WalletDetails, WalletTransactions } from '@/components/wallet';
import * as constants from '@/utils/constants';

export default {
  name: 'Wallet',
  components: {
    Header,
    WalletDetails,
    WalletTransactions
  },
  computed: {
    ...mapState(['network', 'wallet']),
    arkName: () => constants.ARK_NAME,
    selectedNetwork() {
      return this.network.charAt(0).toUpperCase() + this.network.slice(1);
    },
    addressParam() {
      return this.$route.params.address;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.wallet-container {
  max-width: 88%;
  margin-left: auto;
  margin-right: auto;
}
</style>
