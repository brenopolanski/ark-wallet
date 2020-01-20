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
        <div class="cell" data-title="Username">{{ delegate.username }}</div>
        <div class="cell" data-title="Forged blocks">{{ formatNumber(delegate.blocks.produced) }}</div>
        <div
          class="cell"
          data-title="Last forged"
        >{{ formatTimestampAgo(delegate.blocks.last.timestamp.unix) }}</div>
        <div class="cell" data-title="Status">
          <img
            class="active-icon mx-auto"
            width="19"
            src="@/assets/images/active.svg"
            alt="Active icon"
          />
        </div>
        <div class="cell" data-title="Votes">
          <span
            class="text-xs text-gray-600"
          >{{ formatStringToPercentage(delegate.production.approval) }}</span>
          {{ formatCryptoValue(delegate.votes) }} {{ arkSymbol }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';
import Alert from '@/components/Alert';
import { axiosHandleErrors, percentageString, readableCrypto, readableNumber, readableTimestampAgo } from '@/utils';
import * as constants from '@/utils/constants';

export default {
  name: 'ActiveDelegates',
  components: {
    Loading,
    Alert
  },
  data() {
    return {
      delegates: [],
      loading: false,
      error: false,
      errorMsg: ''
    };
  },
  computed: {
    ...mapGetters(['apiUrl']),
    arkSymbol: () => constants.ARK_SYMBOL
  },
  mounted() {
    this.loadActiveDelegates();
  },
  methods: {
    formatNumber(value) {
      return readableNumber(value);
    },
    formatTimestampAgo(value) {
      return readableTimestampAgo(value);
    },
    formatStringToPercentage(value) {
      return percentageString(value);
    },
    formatCryptoValue(value) {
      return readableCrypto(value);
    },
    async loadActiveDelegates() {
      try {
        this.loading = true;
        this.error = false;

        const response = await axios.get(`${this.apiUrl}/delegates`, {
          params: {
            limit: constants.ACTIVE_DELEGATES_SIZE
          }
        });
        const { data } = response.data;

        this.delegates = data;
      } catch (error) {
        this.error = true;
        this.errorMsg = axiosHandleErrors(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.active-delegates-container {
  background: #fff;
  padding: 30px;
  border-radius: 5px;
}

@media screen and (max-width: 1200px) {
  .active-icon {
    margin: 0;
  }
}
</style>
