import BigNumberJS from 'bignumber.js';

export class BigNumber extends BigNumberJS {
  static make(value, base) {
    return new BigNumber(value, base);
  }
}

BigNumberJS.config({ DECIMAL_PLACES: 8, EXPONENTIAL_AT: 1e9 });
