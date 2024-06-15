import { ethers } from 'ethers';
import GalaxiaTokenAbi from './contracts/GalaxiaToken.json';
import GalaxiaVaultAbi from './contracts/GalaxiaVault.json';

export class GalaxiaToken {
  private readonly contract: ethers.Contract;

  constructor(address: string, provider: ethers.providers.Provider) {
    this.contract = new ethers.Contract(address, GalaxiaTokenAbi, provider);
  }

  // Get the total supply of Galaxia Tokens
  public async totalSupply(): Promise<ethers.BigNumber> {
    return await this.contract.totalSupply();
  }

  // Approve a spender to withdraw Galaxia Tokens
  public async approve(spender: string, amount: number): Promise<ethers.ContractTransaction> {
    return await this.contract.approve(spender, ethers.utils.parseEther(amount.toString()));
  }

  // Get the vested amount of Galaxia Tokens for a user
  public async getVestedAmount(userAddress: string): Promise<ethers.BigNumber> {
    return await this.contract.getVestedAmount(userAddress);
  }
}

export class GalaxiaVault {
  private readonly contract: ethers.Contract;

  constructor(address: string, provider: ethers.providers.Provider) {
    this.contract = new ethers.Contract(address, GalaxiaVaultAbi, provider);
  }

  // Deposit Galaxia Tokens into the Galaxia Vault
  public async deposit(amount: number): Promise<void> {
    await this.contract.deposit(ethers.utils.parseEther(amount.toString()));
  }

  // Withdraw Galaxia Tokens from the Galaxia Vault
  public async withdraw(amount: number): Promise<void> {
    await this.contract.withdraw(ethers.utils.parseEther(amount.toString()));
  }
}
