import api from '@/services/api';

class WalletService {
  async getWallets() {
    try {
      return await api.get('/wallets');
    } catch (error) {
      return error.response;
    }
  }

  async getTopWallets() {
    try {
      return await api.get('/wallets/top');
    } catch (error) {
      return error.response;
    }
  }
}

export default new WalletService();
