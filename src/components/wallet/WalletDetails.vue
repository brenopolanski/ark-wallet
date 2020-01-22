<template>
  <section class="wallet-details-container mt-5">
    <div class="flex flex-wrap">
      <div v-if="!showPublicKey" class="w-full sm:w-3/6 md:w-3/6 lg:w-3/6 xl:w-3/6 pr-8">
        <div class="w-full mb-2">
          <span class="text-gray-600">Address</span>
        </div>
        <div class="flex w-full text-white">
          <span class="font-semibold truncate mr-2">{{ wallet.address }}</span>
          <button
            type="button"
            v-show="wallet.address"
            v-tooltip="'Copy'"
            v-clipboard:copy="wallet.address"
            v-clipboard:success="onCopy"
            v-clipboard:error="onCopyError"
          >
            <img src="@/assets/images/copy.svg" alt="Copy button" />
          </button>
        </div>
      </div>
      <div v-if="!showPublicKey" class="w-full sm:w-2/6 md:w-2/6 lg:w-2/6 xl:w-2/6 pr-8">
        <div class="w-full mb-2">
          <span class="text-gray-600">Balance (ARK)</span>
        </div>
        <div class="w-full text-white">
          <span class="font-semibold truncate">{{ readableCrypto(wallet.balance) }}</span>
        </div>
      </div>
      <div v-if="showPublicKey" class="w-full sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 pr-8">
        <div class="w-full mb-2">
          <span class="text-gray-600">Public Key</span>
        </div>
        <div class="flex w-full text-white">
          <span class="font-semibold mr-2 truncate">{{ wallet.publicKey }}</span>
          <button
            type="button"
            v-show="wallet.publicKey"
            v-tooltip="'Copy'"
            v-clipboard:copy="wallet.publicKey"
            v-clipboard:success="onCopy"
            v-clipboard:error="onCopyError"
          >
            <img src="@/assets/images/copy.svg" alt="Copy button" />
          </button>
        </div>
      </div>
      <div
        class="w-full sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 hidden sm:hidden md:block lg:block xl:block"
      >
        <div class="w-full h-full flex items-center justify-center">
          <button
            class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            @click.prevent="togglePublicKey"
          >{{ toggleButtonTitle }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WalletDetails',
  props: {
    wallet: Object
  },
  data() {
    return {
      showPublicKey: false
    };
  },
  computed: {
    isDelegate() {
      return this.wallet.isDelegate || false;
    },
    toggleButtonTitle() {
      return !this.showPublicKey ? 'Show Public Key' : 'Show Details';
    }
  },
  methods: {
    togglePublicKey() {
      this.showPublicKey = !this.showPublicKey;
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
.wallet-details-container {
  background: #333;
  padding: 30px;
  border-radius: 5px;
}
</style>
