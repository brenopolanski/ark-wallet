<template>
  <div>
    <Header />
    <div class="wallet-container">
      <div class="flex justify-between">
        <h1 class="font-bold text-3xl">Wallet Summary</h1>
        <span class="flex items-center text-gray-500 inline-link">Network: {{ arkName }} | {{ selectedNetwork }}</span>
      </div>
      <WalletDetails :wallet="wallet" />
      <WalletTransactions :wallet="wallet" />
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WalletDetails, WalletTransactions } from '@/components/wallet';
import { axiosHandleErrors } from '@/utils';
import * as constants from '@/utils/constants';

export default {
  name: 'Wallet',
  components: {
    Header,
    WalletDetails,
    WalletTransactions,
    Footer
  },
  computed: {
    ...mapState(['network', 'wallet']),
    ...mapGetters(['apiUrl', 'walletIsEmpty']),
    arkName: () => constants.ARK_NAME,
    selectedNetwork() {
      return this.network.charAt(0).toUpperCase() + this.network.slice(1);
    },
    addressParam() {
      return this.$route.params.address;
    }
  },
  mounted() {
    if (this.walletIsEmpty) {
      this.loadWalletFromAddressParam();
    }
  },
  methods: {
    ...mapActions(['importWallet']),
    async loadWalletFromAddressParam() {
      try {
        const response = await axios.get(`${this.apiUrl}/wallets/${this.addressParam}`);
        const { data } = response.data;

        this.importWallet(data);
      } catch (error) {
        this.$toast.error(axiosHandleErrors(error), {
          position: 'top'
        });
      }
    }
  }
};
</script>

<style scoped>
.wallet-container {
  max-width: 88%;
  margin-left: auto;
  margin-right: auto;
}
</style>
