<template>
  <div v-if="isOpen">
    <div class="modal-backdrop" @click="closeFavoriteWalletsModal" />
    <div class="modal-content">
      <div class="modal-top">
        <span class="font-bold text-xl">Favorite Wallets</span>
      </div>
      <div class="modal-bottom">
        <div class="w-full flex justify-center items-center">
          <div class="inline-flex">
            <button
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              @click="handleRemoveAllFavoriteWallets"
            >Remove All</button>
          </div>
        </div>
        <div class="mt-10">
          <div
            v-if="!favoriteWallets.length"
            class="w-full text-center"
          >No favorite wallets found for the {{ selectedNetwork }} network</div>
          <div v-if="favoriteWallets.length > 0">
            <div
              v-for="address of favoriteWallets"
              :key="address"
              class="flex border rounded p-2 mb-5"
            >
              <div class="w-5/6">
                <div class="w-full truncate">
                  <a
                    href="#"
                    class="font-semibold hover:underline mr-2"
                    @click.prevent="handleWalletRoute(address)"
                  >{{ address }}</a>
                </div>
              </div>
              <div class="w-1/6">
                <div class="w-full h-full flex items-center justify-center">
                  <button
                    type="button"
                    v-tooltip="'Remove'"
                    @click="handleRemoveFavoriteWallet(address)"
                  >
                    <img width="19" src="@/assets/images/remove.svg" alt="Remove icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-close-button" @click="closeFavoriteWalletsModal">
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
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'FavoriteWalletsModal',
  props: {
    isOpen: Boolean
  },
  data() {
    return {
      favoriteWallets: []
    };
  },
  computed: {
    ...mapState(['network', 'wallet']),
    ...mapGetters(['bookmarks'])
  },
  watch: {
    bookmarks(value) {
      this.favoriteWallets = value;
    }
  },
  mounted() {
    this.favoriteWallets = this.wallet.bookmarks[this.network];
  },
  methods: {
    ...mapActions(['removeAllFavoriteWallets', 'removeFavoriteWallet']),
    closeFavoriteWalletsModal() {
      this.$emit('closeFavoriteWalletsModal');
    },
    handleWalletRoute(address) {
      this.$router.push({ name: 'wallets', params: { address } });
      this.closeFavoriteWalletsModal();
    },
    handleRemoveAllFavoriteWallets() {
      this.$toast.success('All Wallets Removed!', {
        duration: 2000,
        position: 'top'
      });
      this.removeAllFavoriteWallets();
      this.closeFavoriteWalletsModal();
    },
    handleRemoveFavoriteWallet(address) {
      this.$toast.success('Wallet Removed!', {
        duration: 1000,
        position: 'top'
      });
      this.removeFavoriteWallet(address);
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
