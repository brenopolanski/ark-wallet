import { entropyToMnemonic } from 'bip39';
import { Generator } from 'more-entropy';
import { randomBytes } from 'crypto';
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

export const generateWallet = (callback, networkVersion = 23) => {
  new Generator().generate(2048, values => {
    const entropy = values.concat(Array.from(randomBytes(256)));
    const passphrase = entropyToMnemonic(shuffle(entropy).slice(0, 16));
    const address = getAddress(passphrase, networkVersion);
    const publicKey = getPublicKey(passphrase);
    const wallet = {
      passphrase,
      address,
      publicKey
    };

    callback(wallet);
  });
};
