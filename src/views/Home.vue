<template>
  <div class="home-container">
    <form>
      <img src="../assets/images/logo.svg" alt="Ark logo" />
      <h3>ARK Wallet</h3>
      <input placeholder="Enter wallet address or public key" />
      <div class="flex flex-col">
        <button type="submit" class="btn btn-import">Import Wallet</button>
        <button class="btn btn-search">Search Wallet</button>
      </div>
      <div class="flex flex-wrap justify-center items-center mt-10">
        <button
          type="button"
          class="text-gray-500 inline-link"
          @click="openSettings()"
        >Choose Network: ARK | Mainnet</button>
      </div>
    </form>
    <Modal :is-open="isOpen" @close="closeSettings()"></Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal';

export default {
  name: 'home',
  components: {
    Modal
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    openSettings() {
      this.isOpen = true;
    },
    closeSettings() {
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>
.home-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-container form {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
}

.home-container form h3 {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  margin: 10px 0;
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

.home-container form .btn {
  margin-top: 10px;
  border: 0;
  border-radius: 4px;
  height: 48px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.home-container form .btn-import {
  background: #e1382d;
  color: #fff;
}

.home-container form .btn-search {
  background: #e2e8f0;
  color: #2d3748;
}
</style>
