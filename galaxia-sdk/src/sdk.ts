import Web3 from 'web3';
import { GalaxiaProtocol } from '@galaxia-protocol/galaxia-protocol';
import { GalaxiaWallet } from './wallet';

export class GalaxiaSDK {
  private web3: Web3;
  private galaxiaProtocol: GalaxiaProtocol;
  private galaxiaWallet: GalaxiaWallet;

  constructor(web3: Web3, galaxiaProtocol: GalaxiaProtocol, galaxiaWallet: GalaxiaWallet) {
    this.web3 = web3;
    this.galaxiaProtocol = galaxiaProtocol;
    this.galaxiaWallet = galaxiaWallet;
  }

  public async connect(): Promise<void> {
    await this.galaxiaWallet.connect();
    await this.galaxiaProtocol.connect();
  }

  public async disconnect(): Promise<void> {
    await this.galaxiaWallet.disconnect();
    await this.galaxiaProtocol.disconnect();
  }

  public async getAccount(): Promise<string> {
    return this.galaxiaWallet.getAccount();
  }

  public async getBalance(account: string): Promise<string> {
    return this.galaxiaProtocol.getBalance(account);
  }

  public async sendTransaction(from: string, to: string, amount: string): Promise<string> {
    return this.galaxiaProtocol.sendTransaction(from, to, amount);
  }

  public async deployContract(contractCode: string): Promise<string> {
    return this.galaxiaProtocol.deployContract(contractCode);
  }

  public async callContract(contractAddress: string, method: string, args: any[]): Promise<any> {
    return this.galaxiaProtocol.callContract(contractAddress, method, args);
  }

  public async getTransactionCount(account: string): Promise<number> {
    return this.web3.eth.getTransactionCount(account);
  }

  public async getTransaction(transactionHash: string): Promise<any> {
    return this.web3.eth.getTransaction(transactionHash);
  }

  public async getBlock(blockHashOrBlockNumber: string | number): Promise<any> {
    return this.web3.eth.getBlock(blockHashOrBlockNumber);
  }

  public async getContractABI(contractAddress: string): Promise<any> {
    const contract = new this.web3.eth.Contract(await this.galaxiaProtocol.getContractABI(contractAddress), contractAddress);
    return contract.methods.abi;
  }

  public async getContractBytecode(contractAddress: string): Promise<string> {
    const contract = new this.web3.eth.Contract(await this.galaxiaProtocol.getContractABI(contractAddress), contractAddress);
    return contract.options.data;
  }

  public async getGasPrice(): Promise<string> {
    return this.web3.eth.getGasPrice();
  }

  public async getEstimateGas(from: string, to: string, value: string, data: string): Promise<number> {
    return this.web3.eth.estimateGas({ from, to, value, data });
  }

  public async getBlockNumber(): Promise<number> {
    return this.web3.eth.getBlockNumber();
  }

  public async getPeerCount(): Promise<number> {
    return this.web3.eth.net.getPeerCount();
  }

  public async isListening(): Promise<boolean> {
    return this.web3.eth.isListening();
  }

  public async getCoinbase(): Promise<string> {
    return this.web3.eth.getCoinbase();
  }

  public async getGasLimit(): Promise<number> {
    return this.web3.eth.getGasLimit();
  }

  public async getAccounts(): Promise<string[]> {
    return this.web3.eth.getAccounts();
  }

  public async getChainId(): Promise<number> {
    return this.web3.eth.getChainId();
  }
}
