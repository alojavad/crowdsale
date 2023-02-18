pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RexCoin is ERC20, Ownable {
    constructor() ERC20('RexCoin', 'RXC') {}

    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
        
    }
}