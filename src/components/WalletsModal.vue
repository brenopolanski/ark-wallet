<template>
  <div v-if="isOpen">
    <div class="modal-backdrop" @click="closeWalletsModal" />
    <div class="modal-content">
      <div class="modal-top">
        <span class="font-bold text-xl">Wallets</span>
      </div>
      <div class="modal-bottom">
        <div class="flex justify-center items-center w-full">
          <div class="inline-flex">
            <button
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
              :class="fetchFor === 'all' ? 'bg-gray-500 ' : 'bg-gray-300'"
              @click.prevent="handleFetchFor('all')"
            >All</button>
            <button
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
              :class="fetchFor === 'top' ? 'bg-gray-500 ' : 'bg-gray-300'"
              @click.prevent="handleFetchFor('top')"
            >Top</button>
          </div>
        </div>
        <Alert class="mt-5" v-if="error" :msg="errorMsg" />
        <div class="mt-10">
          <loading
            loader="dots"
            color="#fe463a"
            :active.sync="loading"
            :is-full-page="loadingFullPage"
          />
          <div v-if="wallets.length === 0 && !loading" class="w-full text-center">No wallets found!</div>
          <div v-if="wallets.length > 0 && !loading">
            <div
              v-for="wallet of wallets"
              :key="wallet.address"
              class="flex border rounded p-2 mb-5"
            >
              <div class="w-5/6">
                <div class="w-full truncate">
                  <span class="font-semibold mr-2">{{ wallet.address }}</span>
                </div>
                <div class="w-full truncate">Ѧ {{ wallet.balance }}</div>
              </div>
              <div class="w-1/6">
                <div class="w-full h-full flex items-center justify-center">
                  <button
                    type="button"
                    v-tooltip="'Copy'"
                    v-clipboard:copy="wallet.address"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onCopyError"
                  >
                    <img src="@/assets/images/copy.svg" alt="Copy" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-close-button" @click="closeWalletsModal">
        <svg width="15" height="15" viewBox="0 0 15 15" class="fill-current">
          <path
            d="M1764,6323.5l-1.5-1.5-6,6-6-6-1.5,1.5,6,6-6,6,1.5,1.5,6-6,6,6,1.5-1.5-6-6Z"
            transform="translate(-1749 -6322)"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import Alert from './Alert';

export default {
  name: 'walletsModal',
  props: {
    isOpen: Boolean
  },
  components: {
    Loading,
    Alert
  },
  data() {
    return {
      wallets: [],
      fetchFor: 'all',
      loading: false,
      loadingFullPage: false,
      error: false,
      errorMsg: ''
    };
  },
  computed: {
    ...mapGetters(['api_url'])
  },
  mounted() {
    this.loadAllWallets();
  },
  methods: {
    closeWalletsModal() {
      this.$emit('closeWalletsModal');
    },
    handleFetchFor(value) {
      this.fetchFor = value;

      if (value === 'all') {
        this.loadAllWallets();
      } else {
        this.loadTopWallets();
      }
    },
    async loadAllWallets() {
      try {
        this.loading = true;
        this.error = false;

        const response = await axios.get(`${this.api_url}/wallets`);
        const { data } = response.data;

        this.wallets = data;
      } catch (error) {
        this.error = true;
        this.errorMsg = error.message;
      } finally {
        this.loading = false;
      }
    },
    async loadTopWallets() {
      try {
        this.loading = true;
        this.error = false;

        const response = await axios.get(`${this.api_url}/wallets/top`);
        const { data } = response.data;

        this.wallets = data;
      } catch (error) {
        this.error = true;
        this.errorMsg = error.message;
      } finally {
        this.loading = false;
      }
    },
    onCopy() {
      this.$toast.success('Copied!', {
        duration: 1000,
        position: 'top'
      });
    },
    onCopyError() {
      this.$toast.error('Failed to copy! Try again...', {
        position: 'top'
      });
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.4);
  @apply .w-screen .h-screen .fixed .left-0 .top-0 .z-10 .overflow-hidden;
}

.modal-close-button {
  top: 20px;
  right: 12px;
  @apply .absolute .text-white .cursor-pointer;
}

.modal-top {
  background-color: #2d2f38;
  @apply .flex .flex-col .rounded-t-lg .p-3 .text-white;
}

.modal-content {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  @apply .fixed .rounded-lg .overflow-auto .z-10;
}

.modal-bottom {
  max-height: 30rem;
  @apply .bg-white .rounded-b-lg .p-10 .overflow-y-auto;
}

@screen sm {
  .modal-content {
    max-width: 30rem;
    @apply .w-full;
  }
}
</style>
