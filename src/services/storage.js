import * as constants from '@/utils/constants';

const defaults = {
  network: constants.NETWORK_MAINNET
};

export const storage = {
  get(name) {
    const storageName = `${constants.STORAGE_NAME}_${name}`;
    const item = localStorage.getItem(storageName);

    if (item === null) {
      return {}.hasOwnProperty.call(defaults, storageName) ? defaults[storageName] : undefined;
    }

    if (item === 'true' || item === 'false') {
      return item === 'true';
    }

    return item;
  },
  set: (name, value) => localStorage.setItem(`${constants.STORAGE_NAME}_${name}`, value),
  remove: name => localStorage.removeItem.bind(`${constants.STORAGE_NAME}_${name}`),
  reset: localStorage.clear.bind(localStorage)
};
