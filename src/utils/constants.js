export const APP_TITLE = 'ARK Wallet';
export const ARK_NAME = 'ARK';
export const ARK_SYMBOL = 'Ѧ';
export const LOCALE = navigator.language || 'en-GB';
export const STORAGE_NAME = 'arkwallet';
export const MAINNET_API_URL = 'https://explorer.ark.io/api';
export const DEVNET_API_URL = 'https://dexplorer.ark.io/api';
export const NETWORK_MAINNET = 'mainnet';
export const NETWORK_DEVNET = 'devnet';
export const NETWORK_VERSION = {
  [NETWORK_MAINNET]: 23,
  [NETWORK_DEVNET]: 30
};
export const NETWORKS = [
  { value: NETWORK_MAINNET, label: NETWORK_MAINNET },
  { value: NETWORK_DEVNET, label: NETWORK_DEVNET }
];
export const ACTIVE_DELEGATES_SIZE = 51;
