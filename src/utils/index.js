import moment from 'moment';
import { BigNumber } from './BigNumber';
import { readableCrypto } from './currency';
import { generateWallet } from './crypto';
import * as constants from './constants';

// Reference: https://github.com/axios/axios#handling-errors
const axiosHandleErrors = error => {
  const errorMsg = 'Something went wrong!';

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);

    const { message } = error.response.data;

    return message || errorMsg;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(error.request);

    return errorMsg;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);

    return error.message;
  }
};

const isEmpty = value => {
  return value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);
};

const percentageString = (value, decimals = 2) => {
  if (typeof value !== 'undefined') {
    return (value / 100).toLocaleString(constants.LOCALE, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      style: 'percent'
    });
  }

  return '-';
};

const readableNumber = (value, digits = 0, omitSeparator = false) => {
  if (omitSeparator) {
    return value.toFixed(digits);
  }

  return value.toLocaleString(constants.LOCALE, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
};

const readableTimestampAgo = (time, compareTime) => {
  const momentTime = moment.unix(time).local();

  return typeof compareTime !== 'undefined'
    ? momentTime.from(moment.unix(compareTime).local())
    : momentTime.fromNow();
};

export {
  axiosHandleErrors,
  BigNumber,
  generateWallet,
  isEmpty,
  percentageString,
  readableCrypto,
  readableNumber,
  readableTimestampAgo
};
