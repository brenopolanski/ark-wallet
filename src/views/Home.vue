<template>
  <div class="home-container">
    <form>
      <img src="@/assets/images/logo.svg" alt="Ark logo" />
      <h3>ARK Wallet</h3>
      <input placeholder="Enter wallet address or public key" />
      <div class="flex flex-col">
        <button type="submit" class="btn btn-primary mt-2">Import Wallet</button>
        <button type="button" class="btn btn-secondary mt-2" @click="openWalletsModal">Search Wallet</button>
      </div>
      <div class="flex flex-wrap justify-center items-center mt-10">
        <button type="button" class="text-gray-500 inline-link hover:underline">Choose Network: ARK | Mainnet</button>
      </div>
    </form>
    <WalletsModal :is-open="isOpenWalletsModal" @closeWalletsModal="closeWalletsModal" />
  </div>
</template>

<script>
import WalletsModal from '@/components/WalletsModal';

export default {
  name: 'home',
  components: {
    WalletsModal
  },
  data() {
    return {
      isOpenWalletsModal: false
    };
  },
  methods: {
    openWalletsModal() {
      this.isOpenWalletsModal = true;
    },
    closeWalletsModal() {
      this.isOpenWalletsModal = false;
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
