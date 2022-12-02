const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Merkledistributor", function () {

    async function deployLoadFixture() {
      const rootHash = "0x05dbe3a19c155b929904a09ae9cd00a04e73334b2fdd1c00737e8a27bb5961c3";
      const tokenAddress = ethers.utils.getAddress("0x070eb1a48725622De867a7E3d1dd4F0108966ED1");
      const [owner, otherAccount] = await ethers.getSigners();
      const CryptoPuujin = await ethers.getContractFactory("Cryptopuujin");
      const cryptoPuujin = await CryptoPuujin.deploy();
      const Merkledistributor = await ethers.getContractFactory("Merkledistributor");
      const merkledistributor = await Merkledistributor.deploy(tokenAddress, rootHash);

      return {cryptoPuujin, owner, otherAccount, rootHash, tokenAddress, merkledistributor};
    }

    describe("Deployment", function(){
      it("Should deploy the contract with given parameters", async function (){
          await loadFixture(deployLoadFixture);
      })
    });
})