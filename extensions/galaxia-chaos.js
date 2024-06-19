// Import necessary libraries
import { random } from 'athjs';

// Define the Chaos Theory class
class ChaosTheory {
  constructor(iterations, a, c, x0) {
    this.iterations = iterations;
    this.a = a;
    this.c = c;
    this.x0 = x0;
    this.x = x0;
  }

  // Generate pseudorandom numbers using the logistic map
  logisticMap() {
    for (let i = 0; i < this.iterations; i++) {
      this.x = this.a * this.x * (1 - this.x);
    }
    return this.x;
  }

  // Encrypt data using the logistic map-based encryption
  encrypt(data) {
    const encryptedData = [];
    for (let i = 0; i < data.length; i++) {
      const key = this.logisticMap();
      const encryptedChar = String.fromCharCode(data.charCodeAt(i) ^ Math.floor(key * 256));
      encryptedData.push(encryptedChar);
    }
    return encryptedData.join('');
  }

  // Decrypt data using the logistic map-based encryption
  decrypt(data) {
    const decryptedData = [];
    for (let i = 0; i < data.length; i++) {
      const key = this.logisticMap();
      const decryptedChar = String.fromCharCode(data.charCodeAt(i) ^ Math.floor(key * 256));
      decryptedData.push(decryptedChar);
    }
    return decryptedData.join('');
  }
}

// Example usage
const chaos = new ChaosTheory(1000, 3.9, 0.1, 0.5);
const data = 'Hello, World!';
const encryptedData = chaos.encrypt(data);
const decryptedData = chaos.decrypt(encryptedData);
console.log(`Original data: ${data}`);
console.log(`Encrypted data: ${encryptedData}`);
console.log(`Decrypted data: ${decryptedData}`);
