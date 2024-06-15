import { Network } from './network.interface';

const networks: Network[] = [
  {
    id: 'galaxia-mainnet',
    name: 'Galaxia Mainnet',
    rpcUrl: 'https://galaxia-rpc.com',
    wsUrl: 'wss://galaxia-ws.com',
    explorerUrl: 'https://galaxia-explorer.com',
  },
  {
    id: 'galaxia-testnet',
    name: 'Galaxia Testnet',
    rpcUrl: 'https://galaxia-testnet-rpc.com',
    wsUrl: 'wss://galaxia-testnet-ws.com',
    explorerUrl: 'https://galaxia-testnet-explorer.com',
  },
  {
    id: 'galaxia-devnet',
    name: 'Galaxia Devnet',
    rpcUrl: 'https://galaxia-devnet-rpc.com',
    wsUrl: 'wss://galaxia-devnet-ws.com',
    explorerUrl: 'https://galaxia-devnet-explorer.com',
  },
];

export default networks;
