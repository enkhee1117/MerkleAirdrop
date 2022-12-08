// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

pragma solidity ^0.8.0;

contract Merkledistributor {
    address public immutable token;
    bytes32 public immutable merkleRoot;

    mapping(address => bool) public isClaimed;

    constructor(address token_, bytes32 merkleRoot_) {
        token = token_;
        merkleRoot = merkleRoot_;
    }

    function claim(
        address account,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) external {
        require(!isClaimed[account], 'Already claimed.');
        // Taking double hash instead of one
        bytes32 node = keccak256(bytes.concat(keccak256(abi.encode(account, amount))));
        // If you are taking just one hash of the node: you can use this one instead. 
        // bytes32 node = keccak256(
        //     abi.encodePacked(account, amount)
        // );
        bool isValidProof = MerkleProof.verifyCalldata(
            merkleProof,
            merkleRoot,
            node
        );
        require(isValidProof, 'Invalid proof.');

        isClaimed[account] = true;
        console.log(
            "Claiming from %s acoount, This many: %s tokens",
            account,
            amount
        );
        require(
            IERC20(token).transfer(account, amount),
            'Transfer failed.'
        );
    }
}