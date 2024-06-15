pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Roles.sol";

contract GalaxiaToken is ERC20, Ownable, Roles {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Token metadata
    string public constant name = "Galaxia Token";
    string public constant symbol = "GALAXIA";
    uint8 public constant decimals = 18;

    // Token supply
    uint256 public totalSupply = 100000000000 * (10 ** decimals);

    // Mapping of balances
    mapping (address => uint256) public balances;

    // Mapping of allowances
    mapping (address => mapping (address => uint256)) public allowances;

    // Mapping of token vesting schedules
    mapping (address => VestingSchedule) public vestingSchedules;

    // Event emitted when tokens are transferred
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Event emitted when an approval is made
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // Event emitted when tokens are burned
    event Burn(address indexed burner, uint256 value);

    // Event emitted when a vesting schedule is created
    event VestingScheduleCreated(address indexed beneficiary, uint256 amount, uint256 vestingPeriod);

    // Event emitted when a vesting schedule is updated
    event VestingScheduleUpdated(address indexed beneficiary, uint256 amount, uint256 vestingPeriod);

    // Event emitted when a vesting schedule is revoked
    event VestingScheduleRevoked(address indexed beneficiary);

    // Struct to represent a vesting schedule
    struct VestingSchedule {
        uint256 amount;
        uint256 vestingPeriod;
        uint256 cliffPeriod;
        uint256 startTime;
        bool revoked;
    }

    // Constructor
    constructor() public {
        // Initialize the token supply
        balances[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    // Transfer tokens
    function transfer(address to, uint256 value) public returns (bool) {
        require(to!= address(0), "Cannot transfer to the zero address");
        require(value <= balances[msg.sender], "Insufficient balance");

        balances[msg.sender] = balances[msg.sender].sub(value);
        balances[to] = balances[to].add(value);

        emit Transfer(msg.sender, to, value);
        return true;
    }

    // Approve tokens for spending
    function approve(address spender, uint256 value) public returns (bool) {
        require(spender!= address(0), "Cannot approve the zero address");

        allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    // Transfer tokens from one address to another
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(from!= address(0), "Cannot transfer from the zero address");
        require(to!= address(0), "Cannot transfer to the zero address");
        require(value <= balances[from], "Insufficient balance");
        require(value <= allowances[from][msg.sender], "Insufficient allowance");

        balances[from] = balances[from].sub(value);
        balances[to] = balances[to].add(value);
        allowances[from][msg.sender] = allowances[from][msg.sender].sub(value);

        emit Transfer(from, to, value);
        return true;
    }

    // Burn tokens
    function burn(uint256 value) public {
        require(value <= balances[msg.sender], "Insufficient balance");

        balances[msg.sender] = balances[msg.sender].sub(value);
        totalSupply = totalSupply.sub(value);

        emit Burn(msg.sender, value);
    }

    // Create a vesting schedule for a beneficiary
    function createVestingSchedule(address beneficiary, uint256 amount, uint256 vestingPeriod, uint256 cliffPeriod) public onlyOwner {
        require(beneficiary!= address(0), "Cannot create vesting schedule for the zero address");
        require(amount > 0, "Cannot create vesting schedule for zero tokens");
        require(vestingPeriod > 0, "Cannot create vesting schedule with zero vesting period");
        require(cliffPeriod <= vestingPeriod, "Cliff period cannot be greater than vesting period");

        VestingSchedule storage vestingSchedule = vestingSchedules[beneficiary];
        vestingSchedule.amount = amount;
       vestingSchedule.vestingPeriod = vestingPeriod;
        vestingSchedule.cliffPeriod = cliffPeriod;
        vestingSchedule.startTime = block.timestamp;
        vestingSchedule.revoked = false;

        emit VestingScheduleCreated(beneficiary, amount, vestingPeriod);
    }

    // Update a vesting schedule for a beneficiary
    function updateVestingSchedule(address beneficiary, uint256 amount, uint256 vestingPeriod, uint256 cliffPeriod) public onlyOwner {
        require(beneficiary!= address(0), "Cannot update vesting schedule for the zero address");
        require(amount > 0, "Cannot update vesting schedule for zero tokens");
        require(vestingPeriod > 0, "Cannot update vesting schedule with zero vesting period");
        require(cliffPeriod <= vestingPeriod, "Cliff period cannot be greater than vesting period");

        VestingSchedule storage vestingSchedule = vestingSchedules[beneficiary];
        vestingSchedule.amount = amount;
        vestingSchedule.vestingPeriod = vestingPeriod;
        vestingSchedule.cliffPeriod = cliffPeriod;

        emit VestingScheduleUpdated(beneficiary, amount, vestingPeriod);
    }

    // Revoke a vesting schedule for a beneficiary
    function revokeVestingSchedule(address beneficiary) public onlyOwner {
        require(beneficiary!= address(0), "Cannot revoke vesting schedule for the zero address");

        VestingSchedule storage vestingSchedule = vestingSchedules[beneficiary];
        vestingSchedule.revoked = true;

        emit VestingScheduleRevoked(beneficiary);
    }

    // Get the vested amount for a beneficiary
    function getVestedAmount(address beneficiary) public view returns (uint256) {
        VestingSchedule storage vestingSchedule = vestingSchedules[beneficiary];
        if (vestingSchedule.revoked) {
            return 0;
        }

        uint256 timeElapsed = block.timestamp - vestingSchedule.startTime;
        if (timeElapsed < vestingSchedule.cliffPeriod) {
            return 0;
        } else if (timeElapsed >= vestingSchedule.vestingPeriod) {
            return vestingSchedule.amount;
        } else {
            return vestingSchedule.amount * timeElapsed / vestingSchedule.vestingPeriod;
        }
    }
}
