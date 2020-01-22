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
          <router-link
            class="text-blue-500 hover:text-blue-700 hover:underline hidden sm:hidden md:hidden lg:block xl:block"
            v-tooltip="transaction.sender"
            :to="{ name: 'wallets', params: { address: transaction.sender } }"
          >{{ transaction.sender | truncate(15) }}</router-link>
          <router-link
            class="text-blue-500 hover:text-blue-700 hover:underline truncate block sm:block md:block lg:hidden xl:hidden"
            :to="{ name: 'wallets', params: { address: transaction.sender } }"
          >{{ transaction.sender }}</router-link>
        </div>
        <div class="cell" data-title="Recipient">
          <router-link
            class="text-blue-500 hover:text-blue-700 hover:underline hidden sm:hidden md:hidden lg:block xl:block"
            v-tooltip="transaction.recipient"
            :to="{ name: 'wallets', params: { address: transaction.recipient } }"
          >{{ transaction.recipient | truncate(15) }}</router-link>
          <router-link
            class="text-blue-500 hover:text-blue-700 hover:underline truncate block sm:block md:block lg:hidden xl:hidden"
            :to="{ name: 'wallets', params: { address: transaction.recipient } }"
          >{{ transaction.recipient }}</router-link>
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
import moment from 'moment';
import Loading from 'vue-loading-overlay';
import Alert from '@/components/Alert';
import { WalletService } from '@/services';
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
    arkSymbol: () => constants.ARK_SYMBOL
  },
  watch: {
    wallet() {
      this.loadTransactionsWallet();
    }
  },
  mounted() {
    this.loadTransactionsWallet();
  },
  methods: {
    formatDate(value) {
      return moment.unix(value).format('MM/DD/YYYY h:mm:ss A');
    },
    formatCryptoValue(value) {
      return readableCrypto(value);
    },
    loadTransactionsWallet() {
      if (this.wallet.hasOwnProperty('address')) {
        this.loading = true;
        this.error = false;

        WalletService.getTransactionsWallet(this.wallet.address)
          .then(res => {
            const { data } = res.data;
            this.transactions = data;
          })
          .catch(error => {
            this.error = true;
            this.errorMsg = axiosHandleErrors(error);
          })
          .finally(() => (this.loading = false));
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
