import { ethers } from 'ethers';

export class GalaxiaWallet {
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Signer;

  constructor(privateUrl: string, publicUrl: string) {
    this.provider = new ethers.providers.JsonRpcProvider(privateUrl);
    this.signer = new ethers.Wallet(publicUrl, this.provider);
  }

  async init() {
    await this.provider.getBlockNumber();
  }

  async getBalance() {
    return this.signer.getBalance();
  }

  async transfer(amount: number, to: string) {
    return this.signer.sendTransaction({
      to,
      value: ethers.utils.parseEther(amount.toString()),
    });
  }
}
