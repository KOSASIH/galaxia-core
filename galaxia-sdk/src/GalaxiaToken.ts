import { ethers } from 'ethers';
import { GalaxiaWallet } from './GalaxiaWallet';

export class GalaxiaToken {
  private contract: ethers.Contract;
  private wallet: GalaxiaWallet;

  constructor(wallet: GalaxiaWallet) {
    this.wallet = wallet;
    this.contract = new ethers.Contract(
      '0x...', // Galaxia Token contract address
      [
        'function balanceOf(address owner) public view returns (uint256)',
        'function transfer(address to, uint256 value) public returns (bool)',
      ],
      this.wallet.signer
    );
  }

  async init() {
    await this.contract.deployed();
  }

  async getBalance() {
    return this.contract.balanceOf(this.wallet.signer.getAddress());
  }

  async transfer(amount: number, to: string) {
    return this.contract.transfer(to, ethers.utils.parseEther(amount.toString()));
  }
}
