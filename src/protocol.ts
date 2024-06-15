import { ethers } from 'ethers';
import { GalaxiaToken, GalaxiaVault } from './contracts';

export class Protocol {
  private readonly provider: ethers.providers.Provider;
  private readonly galaxiaToken: GalaxiaToken;
  private readonly galaxiaVault: GalaxiaVault;

  constructor(galaxiaTokenAddress: string, galaxiaVaultAddress: string) {
    this.provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    this.galaxiaToken = new GalaxiaToken(galaxiaTokenAddress, this.provider);
    this.galaxiaVault = new GalaxiaVault(galaxiaVaultAddress, this.provider);
  }

  // Get the total supply of Galaxia Tokens
  public async getTotalSupply(): Promise<number> {
    const totalSupply = await this.galaxiaToken.totalSupply();
    return totalSupply.toNumber();
  }

  // Deposit Galaxia Tokens into the Galaxia Vault
  public async deposit(amount: number): Promise<void> {
    const tx = await this.galaxiaToken.approve(this.galaxiaVault.address, amount);
    await tx.wait();

    await this.galaxiaVault.deposit(amount);
  }

  // Withdraw Galaxia Tokens from the Galaxia Vault
  public async withdraw(amount: number): Promise<void> {
    await this.galaxiaVault.withdraw(amount);
  }

  // Get the vested amount of Galaxia Tokens for a user
  public async getVestedAmount(userAddress: string): Promise<number> {
    const vestedAmount = await this.galaxiaToken.getVestedAmount(userAddress);
    return vestedAmount.toNumber();
  }
}
