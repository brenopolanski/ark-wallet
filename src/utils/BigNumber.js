import BigNumberJS from 'bignumber.js';

export class BigNumber extends BigNumberJS {
  constructor(props) {
    super(props);

    BigNumber.config({ DECIMAL_PLACES: 8, EXPONENTIAL_AT: 1e9 });
  }

  static make(value, base) {
    return new BigNumber(value, base);
  }
}
