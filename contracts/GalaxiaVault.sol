pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./GalaxiaToken.sol";

contract GalaxiaVault is Ownable {
    using SafeMath for uint256;

    // Mapping of user balances
    mapping (address => uint256) public userBalances;

    // Mapping of user allowances
    mapping (address => mapping (address => uint256)) public userAllowances;

    // Galaxia Token contract
    GalaxiaToken public galaxiaToken;

    // Event emitted when a user deposits tokens
    event Deposit(address indexed user, uint256 amount);

    // Event emitted when a user withdraws tokens
    event Withdrawal(address indexed user, uint256 amount);

    // Event emitted when a user approves a spender
    event Approval(address indexed user, address indexed spender, uint256 amount);

    // Constructor
    constructor(GalaxiaToken _galaxiaToken) public {
        galaxiaToken = _galaxiaToken;
    }

    // Deposit tokens into the vault
    function deposit(uint256 amount) public {
        require(amount > 0, "Cannot deposit zero tokens");

        userBalances[msg.sender] = userBalances[msg.sender].add(amount);
        galaxiaToken.transferFrom(msg.sender, address(this), amount);

        emit Deposit(msg.sender, amount);
    }

    // Withdraw tokens from the vault
    function withdraw(uint256 amount) public {
        require(amount > 0, "Cannot withdraw zero tokens");
        require(userBalances[msg.sender] >= amount, "Insufficient balance");

        userBalances[msg.sender] = userBalances[msg.sender].sub(amount);
        galaxiaToken.transfer(msg.sender, amount);

        emit Withdrawal(msg.sender, amount);
    }

    // Approve a spender to withdraw tokens
    function approve(address spender, uint256 amount) public {
        require(spender!= address(0), "Cannot approve the zero address");

        userAllowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
    }

    // Withdraw tokens from the vault on behalf of a user
    function withdrawOnBehalf(address user, uint256 amount) public {
        require(user!= address(0), "Cannot withdraw on behalf of the zero address");
        require(userAllowances[user][msg.sender] >= amount, "Insufficient allowance");

        userBalances[user] = userBalances[user].sub(amount);
        galaxiaToken.transfer(msg.sender, amount);

        emit Withdrawal(user, amount);
    }

    // Get the vested amount for a user
    function getVestedAmount(address user) public view returns (uint256) {
        return galaxiaToken.getVestedAmount(user);
    }
}
