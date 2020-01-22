<template>
  <div v-if="isOpen">
    <div class="modal-backdrop" @click="closeDelegateVoteModal" />
    <div class="modal-content">
      <div class="modal-top">
        <span class="font-bold text-xl">Vote</span>
      </div>
      <div class="modal-bottom">
        <div class="w-full">
          <h3 class="text-gray-600 font-bold text-xl mb-5">Delegate</h3>
          <ul>
            <li>
              <span class="font-bold mr-1">username:</span>
              {{ delegate.username }}
            </li>
            <li class="truncate">
              <span class="font-bold mr-2">address:</span>
              <span>{{ delegate.address }}</span>
            </li>
          </ul>
        </div>
        <loading loader="dots" color="#fe463a" :active.sync="loading" />
        <div class="w-full mt-10" v-if="!loading">
          <h3 class="text-gray-600 font-bold text-xl mb-5">Vote on</h3>
          <Alert class="mt-5" v-if="error" :msg="errorMsg" />
          <ul v-if="!error">
            <li>
              <span class="font-bold mr-1">username:</span>
              {{ vote.username }}
            </li>
            <li class="truncate">
              <span class="font-bold mr-2">address:</span>
              <span>{{ vote.address }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="modal-close-button" @click="closeDelegateVoteModal">
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
import Loading from 'vue-loading-overlay';
import Alert from '@/components/Alert';
import { WalletService } from '@/services';
import { axiosHandleErrors } from '@/utils';

export default {
  name: 'DelegateVoteModal',
  props: {
    delegate: Object,
    isOpen: Boolean
  },
  components: {
    Alert,
    Loading
  },
  data() {
    return {
      vote: {},
      loading: false,
      error: false,
      errorMsg: ''
    };
  },
  mounted() {
    this.loadWalletVote();
  },
  methods: {
    closeDelegateVoteModal() {
      this.$emit('closeDelegateVoteModal');
    },
    loadWalletVote() {
      this.loading = true;
      this.error = false;

      if (this.delegate.vote) {
        WalletService.getWallet(this.delegate.vote)
          .then(res => {
            const { data } = res.data;

            if (res.status === 200) {
              this.vote = data;
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
        this.loading = false;
        this.error = true;
        this.errorMsg = 'No vote found';
      }
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
