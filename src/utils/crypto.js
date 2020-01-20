import { entropyToMnemonic } from 'bip39';
import * as crypto from '@arkecosystem/crypto';

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

export const getAddress = (passphrase, networkVersion) => {
  return crypto.Identities.Address.fromPassphrase(passphrase, networkVersion);
};

export const getPublicKey = passphrase => {
  return crypto.Identities.PublicKey.fromPassphrase(passphrase);
};

export const generateWallet = (entropy, networkVersion = 23) => {
  const passphrase = entropyToMnemonic(shuffle(entropy).slice(0, 16));
  const address = getAddress(passphrase, networkVersion);
  const publicKey = getPublicKey(passphrase);

  return {
    passphrase,
    address,
    publicKey
  };
};
