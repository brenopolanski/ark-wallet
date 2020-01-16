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
        >Choose Network: ARK | {{ selectedNetwork }}</button>
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
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import { mapState, mapGetters, mapActions } from 'vuex';
import Alert from '@/components/Alert';
import WalletsModal from '@/components/WalletsModal';
import NetworkModal from '@/components/NetworkModal';
import { axiosHandleErrors, isEmpty } from '@/utils';

export default {
  name: 'Home',
  components: {
    Loading,
    Alert,
    WalletsModal,
    NetworkModal
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
  computed: {
    ...mapState(['network']),
    ...mapGetters(['apiUrl']),
    selectedNetwork() {
      return this.network.charAt(0).toUpperCase() + this.network.slice(1);
    }
  },
  methods: {
    ...mapActions(['importWallet']),
    toggleWalletsModal() {
      this.showWalletsModal = !this.showWalletsModal;
    },
    toggleNetworkModal() {
      this.showNetworkModal = !this.showNetworkModal;
    },
    async handleSubmit() {
      try {
        this.loading = true;
        this.error = false;

        if (!isEmpty(this.walletAddress)) {
          const response = await axios.get(`${this.apiUrl}/wallets/${this.walletAddress}`);
          const { data } = response.data;

          this.importWallet(data);
          this.$router.push({ path: `/wallets/${this.walletAddress}` });
        } else {
          this.$toast.error('Enter wallet address or public key', {
            position: 'top'
          });
        }
      } catch (error) {
        this.error = true;
        this.errorMsg = axiosHandleErrors(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  height: 100%;
  @apply .flex .justify-center .items-center;
}

.home-container form {
  width: 100%;
  max-width: 300px;
  @apply .flex .flex-col;
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
  color: #666;
}

.home-container form input::placeholder {
  color: #999;
}
</style>
