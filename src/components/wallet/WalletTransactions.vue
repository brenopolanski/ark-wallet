<template>
  <section class="wallet-transactions-container mt-5">
    <loading loader="dots" color="#fe463a" :active.sync="loading" />
    <Alert class="mt-5" v-if="error" :msg="errorMsg" />
    <div
      v-if="!transactions.length && !loading && !error"
      class="w-full text-center"
    >No transactions</div>
    <div v-if="transactions.length > 0 && !loading" class="table">
      <div class="row header">
        <div class="cell">ID</div>
        <div class="cell">Timestamp</div>
        <div class="cell">Sender</div>
        <div class="cell">Recipient</div>
        <div class="cell">Amount</div>
        <div class="cell">Fee</div>
      </div>
      <div v-for="transaction of transactions" :key="transaction.id" class="row">
        <div class="cell" data-title="ID">
          <a
            class="text-blue-500 hover:text-blue-700 hover:underline hidden sm:hidden md:hidden lg:block xl:block"
            v-tooltip="transaction.id"
            :href="`https://explorer.ark.io/transaction/${transaction.id}`"
            target="_blank"
          >{{ transaction.id | truncate(15) }}</a>
          <a
            class="text-blue-500 hover:text-blue-700 hover:underline truncate block sm:block md:block lg:hidden xl:hidden"
            :href="`https://explorer.ark.io/transaction/${transaction.id}`"
            target="_blank"
          >{{ transaction.id }}</a>
        </div>
        <div class="cell" data-title="Timestamp">{{ formatDate(transaction.timestamp.unix) }}</div>
        <div class="cell" data-title="Sender">
          <a
            class="text-blue-500 hover:text-blue-700 hover:underline hidden sm:hidden md:hidden lg:block xl:block"
            v-tooltip="transaction.sender"
            :href="`https://explorer.ark.io/wallets/${transaction.sender}`"
            target="_blank"
          >{{ transaction.sender | truncate(15) }}</a>
          <a
            class="text-blue-500 hover:text-blue-700 hover:underline truncate block sm:block md:block lg:hidden xl:hidden"
            :href="`https://explorer.ark.io/wallets/${transaction.sender}`"
            target="_blank"
          >{{ transaction.sender }}</a>
        </div>
        <div class="cell" data-title="Recipient">
          <a
            class="text-blue-500 hover:text-blue-700 hover:underline hidden sm:hidden md:hidden lg:block xl:block"
            v-tooltip="transaction.recipient"
            :href="`https://explorer.ark.io/wallets/${transaction.recipient}`"
            target="_blank"
          >{{ transaction.recipient | truncate(15) }}</a>
          <a
            class="text-blue-500 hover:text-blue-700 hover:underline truncate block sm:block md:block lg:hidden xl:hidden"
            :href="`https://explorer.ark.io/wallets/${transaction.recipient}`"
            target="_blank"
          >{{ transaction.recipient }}</a>
        </div>
        <div
          class="cell text-red-600"
          data-title="Amount"
        >{{ formatCryptoValue(transaction.amount) }} {{ arkSymbol }}</div>
        <div class="cell" data-title="Fee">{{ formatCryptoValue(transaction.fee) }} {{ arkSymbol }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';
import Alert from '@/components/Alert';
import { axiosHandleErrors, readableCrypto } from '@/utils';
import * as constants from '@/utils/constants';

export default {
  name: 'WalletTransactions',
  props: {
    wallet: Object
  },
  components: {
    Loading,
    Alert
  },
  data() {
    return {
      transactions: [],
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
    this.loadTransactionsWallet();
  },
  methods: {
    formatDate(value) {
      return moment.unix(value).format(constants.DATE_FORMAT);
    },
    formatCryptoValue(value) {
      return readableCrypto(value);
    },
    async loadTransactionsWallet() {
      try {
        this.loading = true;
        this.error = false;

        if (this.wallet.address) {
          const response = await axios.get(`${this.apiUrl}/wallets/${this.wallet.address}/transactions`);
          const { data } = response.data;

          this.transactions = data;
        }
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
.wallet-transactions-container {
  background: #fff;
  padding: 30px;
  border-radius: 5px;
}
</style>
