<template>
  <div v-if="isOpen">
    <div class="modal-backdrop" @click="close()" />
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
                class="hover:border-gray-500 focus:outline-none focus:shadow-outline container-inputs"
              ></select>
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
              class="light-button font-bold sm:w-1/5"
              @click.prevent="saveConfigFromNetwork"
            >Save</button>
          </div>
        </div>
      </div>

      <div class="modal-close-button" @click="close">
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
export default {
  name: 'modal',
  props: {
    isOpen: Boolean
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style>
.modal-top {
  background-color: #2d2f38;
  @apply .flex .flex-col .rounded-t-lg .p-10 .text-white;
}

.modal-top img {
  width: 8rem;
  @apply .mt-3 .self-center;
}

.modal-bottom {
  @apply .bg-white .rounded-b-lg .p-10;
}

.modal-content {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  @apply .fixed .rounded-lg .overflow-auto .z-10;
}

@screen sm {
  .modal-content {
    max-width: 30rem;
    @apply .w-full;
  }

  .modal-top img {
    width: 12rem;
  }
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.4);
  @apply .w-screen .h-screen .fixed .left-0 .top-0 .z-10 .overflow-hidden;
}

.modal-close-button {
  top: 10px;
  right: 10px;
  @apply .absolute .text-white .cursor-pointer;
}

@screen sm {
  /* Inputs */
  .container-inputs {
    min-width: 311px !important;
  }
}

/* Existing Networks */
select {
  @apply .block .appearance-none .w-full .bg-white .border .border-gray-400 .px-4 .py-2 .pr-8 .rounded .shadow .leading-tight;
}

/* Custom Networks */
input[type='number'] {
  appearance: none;
  @apply .bg-white .py-2 .border-b-2 .border-gray-500 .rounded-none;
}

/* Shared */
select:focus,
input[type='number']:focus {
  border-color: #2585ff;
}
</style>
