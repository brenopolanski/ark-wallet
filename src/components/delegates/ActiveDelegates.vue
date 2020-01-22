<template>
  <section class="active-delegates-container mt-5">
    <loading loader="dots" color="#fe463a" :active.sync="loading" />
    <Alert class="mt-5" v-if="error" :msg="errorMsg" />
    <div v-if="!delegates.length && !loading && !error" class="w-full text-center">No delegates</div>
    <div v-if="delegates.length > 0 && !loading" class="table">
      <div class="row header">
        <div class="cell">Rank</div>
        <div class="cell">Username</div>
        <div class="cell">Forged blocks</div>
        <div class="cell">Last forged</div>
        <div class="cell text-center">Status</div>
        <div class="cell">Votes</div>
      </div>
      <div v-for="delegate of delegates" :key="delegate.address" class="row">
        <div class="cell" data-title="Rank">{{ delegate.rank }}</div>
        <div class="cell" data-title="Username">
          <router-link
            class="text-blue-500 hover:text-blue-700 hover:underline"
            v-tooltip="delegate.address"
            :to="{ name: 'wallets', params: { address: delegate.address } }"
          >{{ delegate.username }}</router-link>
        </div>
        <div class="cell" data-title="Forged blocks">{{ readableNumber(delegate.blocks.produced) }}</div>
        <div
          class="cell"
          data-title="Last forged"
        >{{ readableTimestampAgo(delegate.blocks.last.timestamp.unix) }}</div>
        <div class="cell" data-title="Status">
          <img
            class="active-icon mx-auto"
            width="19"
            src="@/assets/images/active.svg"
            alt="Active icon"
          />
        </div>
        <div class="cell" data-title="Votes">
          <span class="text-xs text-gray-600">{{ percentageString(delegate.production.approval) }}</span>
          {{ readableCrypto(delegate.votes) }} {{ arkSymbol }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import Alert from '@/components/Alert';
import { DelegateService } from '@/services';
import { axiosHandleErrors } from '@/utils';

export default {
  name: 'ActiveDelegates',
  components: {
    Alert,
    Loading
  },
  data() {
    return {
      delegates: [],
      loading: false,
      error: false,
      errorMsg: ''
    };
  },
  mounted() {
    this.loadActiveDelegates();
  },
  methods: {
    loadActiveDelegates() {
      this.loading = true;
      this.error = false;

      DelegateService.getActiveDelegates()
        .then(res => {
          const { data } = res;
          this.delegates = data;
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
.active-delegates-container {
  background: var(--color-panel);
  padding: 30px;
  border-radius: 5px;
}

@media screen and (max-width: 1200px) {
  .active-icon {
    @apply .m-0;
  }
}
</style>
