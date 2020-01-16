import niceware from 'niceware';
import * as crypto from '@arkecosystem/crypto';
import * as contants from '@/utils/constants';

export const generatePassphrase = () => {
  const passphrase = niceware.generatePassphrase(contants.GENERATE_PASSPHRASE_SIZE);

  return passphrase.join(' ');
};

export const generateAddress = passphrase => {
  return crypto.Identities.Address.fromPassphrase(passphrase);
};

export const generatePublicKey = passphrase => {
  return crypto.Identities.PublicKey.fromPassphrase(passphrase);
};

export const generateWallet = () => {
  const passphrase = generatePassphrase();
  const address = generateAddress(passphrase);
  const publicKey = generatePublicKey(passphrase);

  return {
    passphrase,
    address,
    publicKey
  };
};
