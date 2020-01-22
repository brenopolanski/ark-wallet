import axios from 'axios';
import * as constants from '@/utils/constants';

const api = axios.create({
  baseURL: constants.MAINNET_API_URL
});

export default api;
