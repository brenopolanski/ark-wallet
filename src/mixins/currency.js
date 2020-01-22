import { BigNumber } from '@/utils';
import * as constants from '@/utils/constants';

export default {
  methods: {
    // Note: due to BigNumber config the max decimals is 8
    readableCrypto(value, decimals = 8) {
      if (value) {
        const bigNumberValue = BigNumber.make(value);
        const normalizedValue = Number(bigNumberValue.dividedBy(1e8)).toLocaleString(constants.LOCALE, {
          maximumFractionDigits: decimals
        });

        return normalizedValue;
      }

      return value;
    }
  }
};
