<template>
  <div v-if="isOpen">
    <div class="modal-backdrop" @click="closeGenerateWalletModal" />
    <div class="modal-content">
      <div class="modal-top">
        <span class="font-bold text-xl">Generate Wallet</span>
      </div>
      <div class="modal-bottom">
        <div
          class="w-full text-center text-gray-600"
        >{{ arkName }} | {{ selectedNetwork }} ( {{ getDateNow() }} )</div>
        <Alert class="mt-5" v-if="error" :msg="errorMsg" />
        <loading loader="dots" color="#fe463a" :active.sync="loading" />
        <div v-if="wallet && !loading">
          <div class="w-full mt-5 border-dashed border-b border-gray-600 py-4">
            <div class="w-full">
              <span class="text-gray-700 mr-2">Address</span>
              <button
                type="button"
                v-tooltip="'Copy'"
                v-clipboard:copy="wallet.address"
                v-clipboard:success="onCopy"
                v-clipboard:error="onCopyError"
              >
                <img src="@/assets/images/copy.svg" alt="Copy button" />
              </button>
            </div>
            <div class="flex w-full">
              <span class="font-semibold truncate">{{ wallet.address }}</span>
            </div>
          </div>
          <div class="w-full mt-2 border-dashed border-b border-gray-600 py-4">
            <div class="w-full">
              <span class="text-gray-700 mr-2">Passphrase</span>
              <button
                type="button"
                v-tooltip="'Copy'"
                v-clipboard:copy="wallet.passphrase"
                v-clipboard:success="onCopy"
                v-clipboard:error="onCopyError"
              >
                <img src="@/assets/images/copy.svg" alt="Copy button" />
              </button>
            </div>
            <div class="flex w-full">
              <span class="text-center italic">{{ wallet.passphrase }}</span>
            </div>
          </div>
          <div class="w-full mt-2 border-dashed border-b border-gray-600 py-4">
            <div class="w-full">
              <span class="text-gray-700 mr-2">Public Key</span>
              <button
                type="button"
                v-tooltip="'Copy'"
                v-clipboard:copy="wallet.publicKey"
                v-clipboard:success="onCopy"
                v-clipboard:error="onCopyError"
              >
                <img src="@/assets/images/copy.svg" alt="Copy button" />
              </button>
            </div>
            <div class="flex w-full">
              <span class="font-semibold truncate">{{ wallet.publicKey }}</span>
            </div>
          </div>
          <div class="w-full flex justify-center items-center mt-3">
            <button class="btn btn-secondary w-32 h-10" @click="handleGenerateWallet">Generate</button>
          </div>
        </div>
      </div>
      <div class="modal-close-button" @click="closeGenerateWalletModal">
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
import moment from 'moment';
import { Generator } from 'more-entropy';
import { randomBytes } from 'crypto';
import { mapState, mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';
import Alert from '@/components/Alert';
import { generateWallet } from '@/utils';
import * as constants from '@/utils/constants';

export default {
  name: 'GenerateWalletModal',
  props: {
    isOpen: Boolean
  },
  components: {
    Loading,
    Alert
  },
  data() {
    return {
      wallet: null,
      loading: false,
      error: false,
      errorMsg: ''
    };
  },
  computed: {
    ...mapState(['network']),
    ...mapGetters(['networkVersion']),
    arkName: () => constants.ARK_NAME,
    selectedNetwork() {
      return this.network.charAt(0).toUpperCase() + this.network.slice(1);
    }
  },
  mounted() {
    this.handleGenerateWallet();
  },
  methods: {
    closeGenerateWalletModal() {
      this.$emit('closeGenerateWalletModal');
    },
    getDateNow() {
      return moment().format('dddd, MMMM D, YYYY');
    },
    handleGenerateWallet() {
      try {
        this.loading = true;
        this.error = false;

        new Generator().generate(2048, values => {
          const entropy = values.concat(Array.from(randomBytes(256)));

          this.loading = false;
          this.wallet = generateWallet(entropy, this.networkVersion);
        });
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMsg = 'Error when generating wallet!';
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
  height: 30rem;
  @apply .bg-white .rounded-b-lg .p-10 .overflow-y-auto;
}

@screen sm {
  .modal-content {
    max-width: 30rem;
    @apply .w-full;
  }
}
</style>
