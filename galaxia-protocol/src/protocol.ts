import Web3 from 'web3';
import { GalaxiaToken, GalaxiaVault } from './contracts';

export class GalaxiaProtocol {
  private web3: Web3;
  private galaxiaTokenAddress: string;
  private galaxiaVaultAddress: string;

  constructor(web3: Web3, galaxiaTokenAddress: string, galaxiaVaultAddress: string) {
    this.web3 = web3;
    this.galaxiaTokenAddress = galaxiaTokenAddress;
    this.galaxiaVaultAddress = galaxiaVaultAddress;
  }

  public async getGalaxiaToken(address: string): Promise<string> {
    const galaxiaToken = new GalaxiaToken(this.web3, this.galaxiaTokenAddress);
    const balance = await galaxiaToken.methods.balanceOf(address).call();
    return balance;
  }

  public async transferGalaxiaToken(fromAddress: string, toAddress: string, amount: string): Promise<void> {
    const galaxiaToken = new GalaxiaToken(this.web3, this.galaxiaTokenAddress);
    await galaxiaToken.methods.transfer(toAddress, amount).send({ from: fromAddress });
  }

  public async getGalaxiaVault(address: string): Promise<string> {
    const galaxiaVault = new GalaxiaVault(this.web3, this.galaxiaVaultAddress);
    const balance = await galaxiaVault.methods.balanceOf(address).call();
    return balance;
  }

  public async depositGalaxiaToken(fromAddress: string, toAddress: string, amount: string): Promise<void> {
    const galaxiaVault = new GalaxiaVault(this.web3, this.galaxiaVaultAddress);
    await galaxiaVault.methods.deposit(amount).send({ from: fromAddress, to: toAddress });
  }

  public async withdrawGalaxiaToken(fromAddress: string, toAddress: string, amount: string): Promise<void> {
    const galaxiaVault = new GalaxiaVault(this.web3, this.galaxiaVaultAddress);
    await galaxiaVault.methods.withdraw(amount).send({ from: fromAddress, to: toAddress });
  }
}
