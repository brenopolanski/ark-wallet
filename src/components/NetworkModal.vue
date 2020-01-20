<template>
  <div v-if="isOpen">
    <div class="modal-backdrop" @click="closeNetworkModal" />
    <div class="modal-content">
      <div class="modal-top">
        <span class="font-bold text-2xl">Select a Network</span>
        <span>Choose the network to use the wallet</span>
        <img src="@/assets/images/globe.png" />
      </div>
      <div class="modal-bottom">
        <div>
          <span class="mr-3 block w-full text-sm font-bold text-gray-500">Network</span>
          <div class="flex items-center">
            <div class="inline-block relative w-full sm:w-4/5 mr-3">
              <select
                v-model="selectedNetwork"
                class="hover:border-gray-500 focus:outline-none focus:shadow-outline container-inputs"
              >
                <option
                  v-for="network of networks"
                  :value="network.value"
                  :key="network.label"
                >{{ arkName }} | {{ network.label.charAt(0).toUpperCase() + network.label.slice(1) }}</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>

            <button
              class="btn btn-secondary h-10 sm:w-1/5"
              @click.prevent="saveConfigFromNetwork"
            >Save</button>
          </div>
        </div>
      </div>

      <div class="modal-close-button" @click="closeNetworkModal">
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
import { mapState, mapActions } from 'vuex';
import * as constants from '@/utils/constants';

export default {
  name: 'NetworkModal',
  props: {
    isOpen: Boolean
  },
  data() {
    return {
      networks: constants.NETWORKS,
      selectedNetwork: constants.NETWORK_MAINNET
    };
  },
  computed: {
    ...mapState(['network']),
    arkName: () => constants.ARK_NAME
  },
  mounted() {
    this.selectedNetwork = this.network;
  },
  methods: {
    ...mapActions(['setNetwork']),
    closeNetworkModal() {
      this.$emit('closeNetworkModal');
    },
    saveConfigFromNetwork() {
      this.setNetwork(this.selectedNetwork);
      this.closeNetworkModal();
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
  top: 10px;
  right: 10px;
  @apply .absolute .text-white .cursor-pointer;
}

.modal-top {
  background-color: #2d2f38;
  @apply .flex .flex-col .rounded-t-lg .p-10 .text-white;
}

.modal-top img {
  width: 8rem;
  @apply .mt-3 .self-center;
}

.modal-content {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  @apply .fixed .rounded-lg .overflow-auto .z-10;
}

.modal-bottom {
  @apply .bg-white .rounded-b-lg .p-10;
}

@screen sm {
  .modal-top img {
    width: 12rem;
  }

  .modal-content {
    max-width: 30rem;
    @apply .w-full;
  }

  .container-inputs {
    min-width: 311px !important;
  }
}

select {
  @apply .block .appearance-none .w-full .bg-white .border .border-gray-400 .px-4 .py-2 .pr-8 .rounded .shadow .leading-tight;
}

select:focus,
input[type='number']:focus {
  border-color: #2585ff;
}
</style>
