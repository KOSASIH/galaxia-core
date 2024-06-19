pragma solidity ^0.8.0;

contract GalaxyDataStorage {
    struct GalaxyData {
        string data;
        address owner;
    }

    mapping (address => GalaxyData) public galaxyData;

    function storeData(string memory _data) public {
        galaxyData[msg.sender] = GalaxyData(_data, msg.sender);
    }

    function getData(address _owner) public view returns (string memory) {
        return galaxyData[_owner].data;
    }
}
