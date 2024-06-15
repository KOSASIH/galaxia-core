import crypto from 'crypto';
import { promisify } from 'util';

const hash = (str: string): Promise<string> => {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  return new Promise((resolve, reject) => {
    hash.digest((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString('hex'));
      }
    });
  });
};

const encrypt = (str: string, password: string): Promise<string> => {
  const cipher = crypto.createCipher('aes-256-cbc', password);
  let encrypted = cipher.update(str, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return Promise.resolve(encrypted);
};

const decrypt = (str: string, password: string): Promise<string> => {
  const decipher = crypto.createDecipher('aes-256-cbc', password);
  let decrypted = decipher.update(str, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return Promise.resolve(decrypted);
};

export { hash, encrypt, decrypt };
