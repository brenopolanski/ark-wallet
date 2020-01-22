<template>
  <div class="home-container">
    <form @submit.prevent="handleSubmit" v-show="!loading">
      <img src="@/assets/images/logo.svg" alt="Ark logo" />
      <h3>ARK Wallet</h3>
      <Alert class="mt-5" v-if="error" :msg="errorMsg" />
      <input v-model="walletAddress" placeholder="Enter wallet address or public key" />
      <div class="flex flex-col">
        <button type="submit" class="btn btn-primary mt-2">Import Wallet</button>
        <button
          type="button"
          class="btn btn-secondary mt-2"
          @click="toggleWalletsModal"
        >Search Wallet</button>
      </div>
      <div class="flex flex-wrap justify-center items-center mt-10">
        <button
          type="button"
          class="text-gray-500 inline-link hover:underline"
          @click="toggleNetworkModal"
        >Choose Network: {{ arkName }} | {{ selectedNetwork }}</button>
      </div>
    </form>
    <loading loader="dots" color="#fe463a" :active.sync="loading" />
    <WalletsModal
      v-if="showWalletsModal"
      :is-open="showWalletsModal"
      @closeWalletsModal="toggleWalletsModal"
    />
    <NetworkModal
      v-if="showNetworkModal"
      :is-open="showNetworkModal"
      @closeNetworkModal="toggleNetworkModal"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Loading from 'vue-loading-overlay';
import Alert from '@/components/Alert';
import { NetworkModal, WalletsModal } from '@/components';
import { WalletService } from '@/services';
import { axiosHandleErrors, isEmpty } from '@/utils';

export default {
  name: 'Home',
  components: {
    Alert,
    Loading,
    NetworkModal,
    WalletsModal
  },
  data() {
    return {
      walletAddress: '',
      showWalletsModal: false,
      showNetworkModal: false,
      loading: false,
      error: false,
      errorMsg: ''
    };
  },
  methods: {
    ...mapActions(['importWalletAddress']),
    toggleWalletsModal() {
      this.showWalletsModal = !this.showWalletsModal;
    },
    toggleNetworkModal() {
      this.showNetworkModal = !this.showNetworkModal;
    },
    handleSubmit() {
      if (!isEmpty(this.walletAddress)) {
        this.loading = true;
        this.error = false;

        WalletService.getWallet(this.walletAddress)
          .then(res => {
            const { data } = res.data;

            if (res.status === 200) {
              const { address } = data;
              this.importWalletAddress(address);
              this.$router.push({ name: 'wallets', params: { address } });
            } else {
              this.error = true;
              this.errorMsg = res.data.message;
            }
          })
          .catch(error => {
            this.error = true;
            this.errorMsg = axiosHandleErrors(error);
          })
          .finally(() => (this.loading = false));
      } else {
        this.$toast.error('Enter wallet address or public key', {
          position: 'top'
        });
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  @apply .h-full .flex .justify-center .items-center;
}

.home-container form {
  max-width: 300px;
  @apply .w-full .flex .flex-col;
}

.home-container form h3 {
  margin: 10px 0;
  @apply .font-bold .text-center .uppercase;
}

.home-container form input {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 48px;
  padding: 0 20px;
  font-size: 16px;
  color: var(--color-medium-gray);
}

.home-container form input::placeholder {
  color: var(--color-light-gray);
}
</style>
