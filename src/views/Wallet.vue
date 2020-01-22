<template>
  <div>
    <Header />
    <div class="wallet-container">
      <div class="flex justify-between">
        <div class="flex">
          <h1
            class="font-bold text-3xl mr-2 hidden sm:hidden md:block lg:block xl:block"
          >Wallet Summary</h1>
          <h1 class="font-bold text-3xl mr-2 block sm:block md:hidden lg:hidden xl:hidden">Wallet</h1>
          <a href="#" class="star-icon" @click.prevent="toggleFavorite">
            <img
              width="32"
              :src="isFavoriteWallet ? require('@/assets/images/star-active.svg') : require('@/assets/images/star.svg')"
              alt="Star icon"
            />
          </a>
        </div>
        <span
          class="flex items-center text-gray-500 inline-link"
        >Network: {{ arkName }} | {{ selectedNetwork }}</span>
      </div>
      <loading loader="dots" color="#fe463a" :active.sync="loading" />
      <WalletDetails :wallet="importedWallet" />
      <WalletTransactions :wallet="importedWallet" />
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
      importedWallet: {},
      loading: false
    };
  },
  computed: {
    ...mapState(['network', 'wallet']),
    walletAddressParam() {
      return this.$route.params.address;
    },
    isFavoriteWallet() {
      const { address } = this.importedWallet;
      return this.wallet.bookmarks[this.network].includes(address);
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
    ...mapActions(['setFavoriteWallet']),
    loadWalletFromAddressParam() {
      this.loading = true;

      WalletService.getWallet(this.walletAddressParam)
        .then(res => {
          const { data } = res.data;

          if (res.status === 200) {
            this.importedWallet = data;
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
    },
    toggleFavorite() {
      const { address } = this.importedWallet;
      this.setFavoriteWallet(address);
    }
  }
};
</script>

<style scoped>
.wallet-container {
  max-width: 88%;
  @apply .mx-auto;
}

.wallet-container .star-icon {
  @apply .self-center;
}

.wallet-container .star-icon:hover img {
  transform: translateY(-5px);
  transition: all 0.2s;
}
</style>
