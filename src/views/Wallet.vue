<template>
  <div>
    <Header />
    <div class="wallet-container">
      <div class="flex justify-between">
        <h1 class="title">Wallet Summary</h1>
        <button type="button" class="text-gray-500 inline-link">Network: ARK | Mainnet</button>
      </div>
      <WalletDetails :wallet="wallet" />
      <div class="wallet-transactions mt-5">
        <div class="table">
          <div class="row header">
            <div class="cell">Name</div>
            <div class="cell">Age</div>
            <div class="cell">Occupation</div>
            <div class="cell">Location</div>
          </div>

          <div class="row">
            <div class="cell" data-title="Name">Luke Peters</div>
            <div class="cell" data-title="Age">25</div>
            <div class="cell" data-title="Occupation">Freelance Web Developer</div>
            <div class="cell" data-title="Location">Brookline, MA</div>
          </div>

          <div class="row">
            <div class="cell" data-title="Name">Joseph Smith</div>
            <div class="cell" data-title="Age">27</div>
            <div class="cell" data-title="Occupation">Project Manager</div>
            <div class="cell" data-title="Location">Somerville, MA</div>
          </div>

          <div class="row">
            <div class="cell" data-title="Name">Maxwell Johnson</div>
            <div class="cell" data-title="Age">26</div>
            <div class="cell" data-title="Occupation">UX Architect & Designer</div>
            <div class="cell" data-title="Location">Arlington, MA</div>
          </div>

          <div class="row">
            <div class="cell" data-title="Name">Harry Harrison</div>
            <div class="cell" data-title="Age">25</div>
            <div class="cell" data-title="Occupation">Front-End Developer</div>
            <div class="cell" data-title="Location">Boston, MA</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header';
import { WalletDetails } from '@/components/wallet';

export default {
  name: 'Wallet',
  components: {
    Header,
    WalletDetails
  },
  computed: {
    ...mapState(['wallet']),
    addressParam() {
      return this.$route.params.address;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.wallet-container {
  max-width: 88%;
  margin-left: auto;
  margin-right: auto;
}

.wallet-container h1 {
  font-size: 2rem;
  font-weight: bold;
}

.wallet-info {
  background: #333;
  padding: 30px;
  border-radius: 5px;
}

.wallet-transactions {
  background: #fff;
  padding: 30px;
  border-radius: 5px;
}

.table {
  margin: 0 0 40px 0;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: table;
}

@media screen and (max-width: 580px) {
  .table {
    display: block;
  }
}

.row {
  display: table-row;
  background: #f6f6f6;
}

.row:nth-of-type(odd) {
  background: #e9e9e9;
}

.row.header {
  font-weight: 900;
  color: #ffffff;
  background: #ea6153;
}

.row.green {
  background: #27ae60;
}

.row.blue {
  background: #2980b9;
}

@media screen and (max-width: 580px) {
  .row {
    padding: 14px 0 7px;
    display: block;
  }
  .row.header {
    padding: 0;
    height: 6px;
  }
  .row.header .cell {
    display: none;
  }
  .row .cell {
    margin-bottom: 10px;
  }
  .row .cell:before {
    margin-bottom: 3px;
    content: attr(data-title);
    min-width: 98px;
    font-size: 10px;
    line-height: 10px;
    font-weight: bold;
    text-transform: uppercase;
    color: #969696;
    display: block;
  }
}

.cell {
  padding: 6px 12px;
  display: table-cell;
}

@media screen and (max-width: 580px) {
  .cell {
    padding: 2px 16px;
    display: block;
  }
}
</style>
