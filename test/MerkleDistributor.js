const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Merkledistributor", function () {

    async function deployLoadFixture() {
      const rootHash = "0xae302a9ed97fccf32a76e36fd463f56fd9c34eba17b0604dd843f74d2f4da987";
      const [owner, otherAccount] = await ethers.getSigners();

      const CryptoPuujin = await ethers.getContractFactory("Cryptopuujin");
      const cryptoPuujin = await CryptoPuujin.deploy();
      console.log("CryptoPuujin deployed address: ", cryptoPuujin.address); // Delete
      
      const tokenAddress = cryptoPuujin.address;
      // Deploy MerkleDistributor contract with the given token. 
      const Merkledistributor = await ethers.getContractFactory("Merkledistributor");
      const merkledistributor = await Merkledistributor.deploy(tokenAddress, rootHash);
      const merkleContractAddress = merkledistributor.address;
      console.log("Merkledist deployed address: ", merkledistributor.address); //Delete

      // Add fund (1_000_000 tokens)to MerkleContract: 
      const amountToSend = ethers.BigNumber.from("1000000000000000000000");
      await cryptoPuujin.mint(merkleContractAddress, amountToSend);

      return {cryptoPuujin, merkleContractAddress, owner};
    }

    describe("Deployment", function(){

      it("Should deploy the contract with given parameters", async function (){
          await loadFixture(deployLoadFixture);
      })

      it("Should have the balance of 1_000_000 in merkle contract", async function (){
        let balanceExpected = ethers.BigNumber.from("1000000000000000000000");
        const {cryptoPuujin, merkleContractAddress, owner} = await loadFixture(deployLoadFixture);
        expect(await cryptoPuujin.balanceOf(merkleContractAddress)).to.equal(balanceExpected);
      })

      it("Should be able to claim from address 0x1111111111111111111111111111111111111111 amount 1000000000000000000", async function() {
        
      })

    }); //END OF DESCRIBE
})

