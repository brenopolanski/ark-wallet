import { BigNumber } from './BigNumber';
import * as constants from './constants';

// Note: due to BigNumber config the max decimals is 8
export const readableCrypto = (value, decimals = 8) => {
  if (value) {
    const bigNumberValue = BigNumber.make(value);
    const normalizedValue = Number(bigNumberValue.dividedBy(1e8)).toLocaleString(constants.LOCALE, {
      maximumFractionDigits: decimals
    });

    return normalizedValue;
  }

  return value;
};
