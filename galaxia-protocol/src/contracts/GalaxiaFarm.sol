pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract GalaxiaFarm is Ownable {
    using SafeMath for uint256;

    IERC20 public galaxiaToken;
    mapping(address => uint256) public userRewards;
    mapping(address => uint256) public userLastClaimed;
    uint256 public totalRewards;
    uint256 public rewardPerBlock;

    constructor(IERC20 _galaxiaToken, uint256 _rewardPerBlock) {
        galaxiaToken = _galaxiaToken;
        rewardPerBlock = _rewardPerBlock;
    }

    function claimRewards() public {
        uint256 rewards = getRewards();
        require(rewards > 0, "No rewards to claim");
        require(block.timestamp > userLastClaimed[msg.sender], "Already claimed rewards");

        galaxiaToken.transfer(msg.sender, rewards);
        userRewards[msg.sender] = 0;
        userLastClaimed[msg.sender] = block.timestamp;
    }

    function getRewards() public view returns (uint256) {
        uint256 rewards = userRewards[msg.sender];
        uint256 blockNumber = block.number;
        uint256 blocksSinceLastClaimed = blockNumber.sub(userLastClaimed[msg.sender]);

        rewards = rewards.add(blocksSinceLastClaimed.mul(rewardPerBlock));
        return rewards;
    }

    function deposit(uint256 amount) public {
        require(amount > 0, "Invalid deposit amount");
        require(galaxiaToken.balanceOf(msg.sender) >= amount, "Insufficient balance");

        galaxiaToken.transferFrom(msg.sender, address(this), amount);
        userRewards[msg.sender] = userRewards[msg.sender].add(amount);
    }

    function withdraw(uint256 amount) public {
        require(amount > 0, "Invalid withdrawal amount");
        require(userRewards[msg.sender] >= amount, "Insufficient rewards");

        userRewards[msg.sender] = userRewards[msg.sender].sub(amount);
        galaxiaToken.transfer(msg.sender, amount);
    }

    function distributeRewards() public onlyOwner {
        uint256 rewards = getRewards();
        totalRewards = totalRewards.add(rewards);

        for (address user in allUsers) {
            uint256 userReward = getRewardsForUser(user);
            if (userReward > 0) {
                userRewards[user] = userRewards[user].add(userReward);
            }
        }
    }

    function getRewardsForUser(address user) public view returns (uint256) {
        uint256 rewards = userRewards[user];
        uint256 blockNumber = block.number;
        uint256 blocksSinceLastClaimed = blockNumber.sub(userLastClaimed[. 
