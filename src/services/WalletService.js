import api from '@/services/api';

class WalletService {
  async getAllWallets() {
    try {
      const response = await api.get('/wallets');
      return response.data;
    } catch (error) {
      return error.response;
    }
  }

  async getTopWallets(page = 1, limit = 25) {
    try {
      const response = await api.get('/wallets/top', {
        params: {
          page,
          limit
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  }

  async getWallet(address) {
    try {
      return await api.get(`/wallets/${address}`);
    } catch (error) {
      return error.response;
    }
  }

  async getTransactionsWallet(address, page = 1, limit = 25) {
    try {
      return await api.get(`/wallets/${address}/transactions`, {
        params: {
          orderBy: 'timestamp:desc',
          page,
          limit
        }
      });
    } catch (error) {
      return error.response;
    }
  }
}

export default new WalletService();
