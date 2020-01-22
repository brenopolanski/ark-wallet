<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@/services/api';
import { storage } from '@/services/storage';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['apiUrl'])
  },
  watch: {
    apiUrl: value => (api.defaults.baseURL = value)
  },
  mounted() {
    api.defaults.baseURL = this.apiUrl;
    this.setConfigNetwork();
  },
  methods: {
    ...mapActions(['setNetwork']),
    setConfigNetwork() {
      this.setNetwork(storage.get('network'));
    }
  }
};
</script>
