import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['network']),
    selectedNetwork() {
      return this.network.charAt(0).toUpperCase() + this.network.slice(1);
    }
  }
};
