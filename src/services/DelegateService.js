import api from '@/services/api';
import * as constants from '@/utils/constants';

class DelegateService {
  async getActiveDelegates() {
    try {
      const response = await api.get('/delegates', {
        params: {
          limit: constants.ACTIVE_DELEGATES_SIZE
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  }

  async getAllVotersDelegate(address, page = 1, limit = 25) {
    try {
      return await api.get(`/delegates/${address}/voters`, {
        params: {
          page,
          limit
        }
      });
    } catch (error) {
      return error.response;
    }
  }
}

export default new DelegateService();
