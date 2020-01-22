import * as constants from '@/utils/constants';

export default {
  methods: {
    percentageString(value, decimals = 2) {
      if (typeof value !== 'undefined') {
        return (value / 100).toLocaleString(constants.LOCALE, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          style: 'percent'
        });
      }

      return '-';
    }
  }
};
