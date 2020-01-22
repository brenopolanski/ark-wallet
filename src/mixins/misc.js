import moment from 'moment';
import * as constants from '@/utils/constants';

export default {
  methods: {
    readableNumber(value, digits = 0, omitSeparator = false) {
      if (omitSeparator) {
        return value.toFixed(digits);
      }

      return value.toLocaleString(constants.LOCALE, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      });
    },
    readableTimestampAgo(time, compareTime) {
      const momentTime = moment.unix(time).local();

      return typeof compareTime !== 'undefined' ? momentTime.from(moment.unix(compareTime).local()) : momentTime.fromNow();
    }
  }
};
