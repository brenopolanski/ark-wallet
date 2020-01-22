<template>
  <div v-if="isOpen">
    <div class="modal-backdrop" @click="closeDelegateVotersModal" />
    <div class="modal-content">
      <div class="modal-top">
        <span class="font-bold text-xl">Voters - {{ delegate.username }}</span>
      </div>
      <div class="modal-bottom">
        <Alert class="mt-5" v-if="error" :msg="errorMsg" />
        <div class="mt-5">
          <loading loader="dots" color="#fe463a" :active.sync="loading" />
          <div v-if="!voters.length && !loading && !error" class="w-full text-center">No voters found</div>
          <div v-if="voters.length > 0 && !loading">
            <div v-for="[index, voter] of voters.entries()" :key="voter.address" class="flex border rounded p-2 mb-5">
              <div class="w-1/6">
                <div class="w-full h-full flex items-center justify-center">
                  <span>{{ index + 1 }}</span>
                </div>
              </div>
              <div class="w-5/6">
                <div class="w-full truncate">
                  <span class="font-semibold mr-2">{{ voter.address }}</span>
                </div>
                <div class="w-full truncate">{{ arkSymbol }} {{ readableCrypto(voter.balance) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-close-button" @click="closeDelegateVotersModal">
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
import { DelegateService } from '@/services';
import { axiosHandleErrors } from '@/utils';

export default {
  name: 'DelegateVotersModal',
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
      voters: [],
      loading: false,
      error: false,
      errorMsg: ''
    };
  },
  mounted() {
    this.loadAllVotersDelegate();
  },
  methods: {
    closeDelegateVotersModal() {
      this.$emit('closeDelegateVotersModal');
    },
    loadAllVotersDelegate() {
      const { address } = this.delegate;

      this.loading = true;
      this.error = false;

      DelegateService.getAllVotersDelegate(address)
        .then(res => {
          const { data } = res.data;

          if (res.status === 200) {
            this.voters = data;
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
