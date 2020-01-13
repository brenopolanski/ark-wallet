<template>
  <div>
    <Menu />
    <div class="wallet-container">
      <h1 class="title">Wallet</h1>
      <div class="wallet-info mt-5">
        <div class="flex flex-wrap">
          <div class="w-full sm:w-3/6 md:w-3/6 lg:w-3/6 xl:w-3/6 pr-8">
            <div class="w-full mb-2">
              <span class="text-gray-600">Address</span>
            </div>
            <div class="w-full text-white truncate">
              <span class="font-semibold">AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv</span>
            </div>
          </div>
          <div class="w-full sm:w-2/6 md:w-2/6 lg:w-2/6 xl:w-2/6 pr-8">
            <div class="w-full mb-2">
              <span class="text-gray-600">Balance (ARK)</span>
            </div>
            <div class="w-full text-white truncate">
              <span class="font-semibold">19,241,023.54890976</span>
            </div>
          </div>
          <div
            class="w-full sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 hidden sm:hidden md:block lg:block xl:block"
          >
            <div class="w-full h-full flex items-center justify-center">
              <button
                class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >Show Public Key</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu';

export default {
  name: 'wallet',
  components: {
    Menu
  }
};
</script>

<style scoped>
.wallet-container {
  max-width: 88%;
  margin-left: auto;
  margin-right: auto;
}

.wallet-container h1 {
  font-size: 2rem;
  font-weight: bold;
}

.wallet-info {
  background: #333;
  padding: 30px;
  border-radius: 5px;
}
</style>
