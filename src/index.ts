import { Protocol } from './protocol';

async function main() {
  // Initialize the Protocol with the Galaxia Token and Galaxia Vault contracts
  const protocol = new Protocol(
    "0x5409ed021d9299bf6814279a6a1411a7e866a631", // Galaxia Token address
    "0x6c649e2f03e0438800e24f6c8f5cd2e264a591cd" // Galaxia Vault address
  );

  // Example usage: get the total supply of Galaxia Tokens
  const totalSupply = await protocol.getTotalSupply();
  console.log(`Total supply of Galaxia Tokens: ${totalSupply}`);

  // Example usage: deposit Galaxia Tokens into the Galaxia Vault
  const depositAmount = 1000;
  await protocol.deposit(depositAmount);
  console.log(`Deposited ${depositAmount} Galaxia Tokens into the Galaxia Vault`);

  // Example usage: withdraw Galaxia Tokens from the Galaxia Vault
  const withdrawalAmount = 500;
  await protocol.withdraw(withdrawalAmount);
  console.log(`Withdrew ${withdrawalAmount} Galaxia Tokens from the Galaxia Vault`);

  // Example usage: get the vested amount of Galaxia Tokens for a user
  const userAddress = "0x1234567890123456789012345678901234567890";
  const vestedAmount = await protocol.getVestedAmount(userAddress);
  console.log(`Vested amount of Galaxia Tokens for ${userAddress}: ${vestedAmount}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
