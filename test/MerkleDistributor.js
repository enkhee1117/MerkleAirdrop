const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MerkleDistributor", function () {

    async function deployLoadFixture() {
      const rootHash = "0x05dbe3a19c155b929904a09ae9cd00a04e73334b2fdd1c00737e8a27bb5961c3";
      const tokenAddress = "0x070eb1a48725622De867a7E3d1dd4F0108966ED1";
      const MerkleTree = await ethers.getContractFactory("MerkleDistributor.sol");
      // const merkleTree = MerkleTree.deploy(tokenAddress, rootHash);
      // const [owner, otherAccount] = await ethers.getSigners();

      // return {merkleTree, owner, otherAccount, rootHash, tokenAddress};
    }

    describe("Deployment", function(){
      it("Should deploy the contract with given parameters", async function (){
          // const {merkleTree, owner, otherAccount} = await loadFixture(deployLoadFixture);
          return true;
      })
    });
})