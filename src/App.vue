<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/services/api';

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
  }
};
</script>
