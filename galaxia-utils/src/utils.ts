export class Utils {
  public static async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public static async retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    let attempt = 0;
    while (attempt < retries) {
      try {
        return await fn();
      } catch (error) {
        attempt++;
        if (attempt < retries) {
          await this.sleep(delay);
        } else {
          throw error;
        }
      }
    }
  }

  public static async timeout(ms: number, promise: Promise<any>): Promise<any> {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)),
    ]);
  }

  public static async chunkArray<T>(array: T[], size: number): Promise<T[][]> {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  public static async shuffleArray<T>(array: T[]): Promise<T[]> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public static async randomInt(min: number, max: number): Promise<number> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static async randomString(length: number): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  public static async hashString(str: string): Promise<string> {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
  }

  public static async base64Encode(str: string): Promise<string> {
    return Buffer.from(str).toString('base64');
  }

  public static async base64Decode(str: string): Promise<string> {
    return Buffer.from(str, 'base64').toString('utf8');
  }

  public static async jsonParse(str: string): Promise<any> {
    try {
      return JSON.parse(str);
    } catch (error) {
      throw new Error(`Invalid JSON: ${str}`);
    }
  }

  public static async jsonStringify(obj: any): Promise<string> {
    try {
      return JSON.stringify(obj);
    } catch (error) {
      throw new Error(`Invalid JSON: ${obj}`);
    }
  }
        }
