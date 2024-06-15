import { ethers } from 'ethers';
import { GalaxiaWallet } from './GalaxiaWallet';

export class GalaxiaFarm {
  private contract: ethers.Contract;
  private wallet: GalaxiaWallet;

  constructor(wallet: GalaxiaWallet) {
    this.wallet = wallet;
    this.contract = new ethers.Contract(
      '0x...', // Galaxia Farm contract address
      [
        'function deposit(uint256 amount) public',
        'function withdraw(uint256 amount) public',
        'function claimRewards() public',
      ],
      this.wallet.signer
    );
  }

  async init() {
    await this.contract.deployed();
  }

  async deposit(amount: number) {
    return this.contract.deposit(ethers.utils.parseEther(amount.toString()));
  }

  async withdraw(amount: number) {
    return this.contract.withdraw(ethers.utils.parseEther(amount.toString()));
  }

  async claimRewards() {
    return this.contract.claimRewards();
  }
}
