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
      <loading loader="dots" color="#fe463a" :active.sync="loading" />
      <WalletDetails :wallet="wallet" />
      <WalletTransactions :wallet="wallet" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import { Footer, Header } from '@/components';
import { WalletDetails, WalletTransactions } from '@/components/wallet';
import { WalletService } from '@/services';
import { axiosHandleErrors } from '@/utils';

export default {
  name: 'Wallet',
  components: {
    Footer,
    Header,
    Loading,
    WalletDetails,
    WalletTransactions
  },
  data() {
    return {
      wallet: {},
      loading: false
    };
  },
  computed: {
    walletAddressParam() {
      return this.$route.params.address;
    }
  },
  watch: {
    walletAddressParam() {
      this.loadWalletFromAddressParam();
    }
  },
  mounted() {
    this.loadWalletFromAddressParam();
  },
  methods: {
    loadWalletFromAddressParam() {
      this.loading = true;

      WalletService.getWallet(this.walletAddressParam)
        .then(res => {
          const { data } = res.data;

          if (res.status === 200) {
            this.wallet = data;
          } else {
            this.$toast.error(res.data.message, {
              position: 'top'
            });
          }
        })
        .catch(error => {
          this.$toast.error(axiosHandleErrors(error), {
            position: 'top'
          });
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style scoped>
.wallet-container {
  max-width: 88%;
  @apply .mx-auto;
}
</style>
