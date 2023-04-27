// pragma solidity ^0.8.18;

// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contract/token/ERC1155/extensions/ERC1155Burnable.sol";
// import "@openzeppelin/contract/security/Pausable.sol";


// contract MyToken is ERC1155, Ownable,ERC1155Burnable, Pausable {
//     uint256 public constant GOLD = 0;
//     uint256 public constant SILVER = 1;
//     uint256 public constant BRONZE = 2;

//     constructor() ERC1155("https://example.com/token/{id}.json") {
//         _mint(msg.sender, GOLD, 10**18, "");
//         _mint(msg.sender, SILVER, 10**27, "");
//         _mint(msg.sender, BRONZE, 10**36, "");
//     }

//     function pause() public onlyOwner {
//         _pause();
//     }

//     function unpause() public onlyOwner {
//         _unpause();
//     }

//     function mint(address account, uint256 id, uint256 amount, bytes memory data)
//         public onlyOwner
//     {
//         _mint(account, id, amount, data);
//     }

//     function transfer(address from, address to, uint256 id, uint256 amount)
//         public
//     {
//         require(from == msg.sender || isApprovedForAll(from, msg.sender), "ERC1155: caller is not owner nor approved");
//         safeTransferFrom(from, to, id, amount, "");
//     }

//     function batchTransfer(address from, address to, uint256[] memory ids, uint256[] memory amounts)
//         public
//     {
//         require(from == msg.sender || isApprovedForAll(from, msg.sender), "ERC1155: caller is not owner nor approved");
//         safeBatchTransferFrom(from, to, ids, amounts, "");
//     }
// }




pragma solidity ^0.8.9;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract MyToken is MintableToken {
  string public constant name = "My Token";
  string public constant symbol = "MYT";
  uint8 public constant decimals = 18;
}