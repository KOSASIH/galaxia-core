import { ethers } from 'ethers';

export function getProvider() {
  return new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID');
}

export function getGalaxiaTokenContract() {
  return new ethers.Contract(GALAXIA_TOKEN_ADDRESS, GalaxiaToken.abi, getProvider());
}

export function getGalaxiaFarmContract() {
  return new ethers.Contract(GALAXIA_FARM_ADDRESS, GalaxiaFarm.abi, getProvider());
}
