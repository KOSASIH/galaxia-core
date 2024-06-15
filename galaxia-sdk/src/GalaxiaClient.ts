import { ethers } from 'ethers';
import { GalaxiaWallet } from './GalaxiaWallet';
import { GalaxiaToken } from './GalaxiaToken';
import { GalaxiaFarm } from './GalaxiaFarm';

export class GalaxiaClient {
  private wallet: GalaxiaWallet;
  private token: GalaxiaToken;
  private farm: GalaxiaFarm;

  constructor(privateUrl: string, publicUrl: string) {
    this.wallet = new GalaxiaWallet(privateUrl, publicUrl);
    this.token = new GalaxiaToken(this.wallet);
    this.farm = new GalaxiaFarm(this.wallet);
  }

  async init() {
    await this.wallet.init();
    await this.token.init();
    await this.farm.init();
  }

  async getBalance() {
    return this.wallet.getBalance();
  }

  async transfer(amount: number, to: string) {
    return this.wallet.transfer(amount, to);
  }

  async deposit(amount: number) {
    return this.farm.deposit(amount);
  }

  async withdraw(amount: number) {
    return this.farm.withdraw(amount);
  }

  async claimRewards() {
    return this.farm.claimRewards();
  }
}
