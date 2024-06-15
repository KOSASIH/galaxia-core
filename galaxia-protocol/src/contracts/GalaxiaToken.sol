pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GalaxiaToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("GalaxiaToken", "GTK") {
        _mint(msg.sender, initialSupply);
    }
}
