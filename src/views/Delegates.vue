<template>
  <div>
    <Header />
    <div class="delegates-container">
      <div class="flex justify-between">
        <h1 class="font-bold text-3xl">Delegates</h1>
        <span
          class="flex items-center text-gray-500 inline-link"
        >Network: {{ arkName }} | {{ selectedNetwork }}</span>
      </div>
      <ActiveDelegates />
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ActiveDelegates } from '@/components/delegates';
import * as constants from '@/utils/constants';

export default {
  name: 'Delegates',
  components: {
    Header,
    ActiveDelegates,
    Footer
  },
  computed: {
    ...mapState(['network']),
    arkName: () => constants.ARK_NAME,
    selectedNetwork() {
      return this.network.charAt(0).toUpperCase() + this.network.slice(1);
    }
  }
};
</script>

<style scoped>
.delegates-container {
  max-width: 88%;
  margin-left: auto;
  margin-right: auto;
}
</style>
