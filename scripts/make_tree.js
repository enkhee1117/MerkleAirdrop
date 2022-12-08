// import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
const {StandardMerkleTree} = require("@openzeppelin/merkle-tree");
// import fs from "fs";
const fs = require("fs");

// (1)
const values = [
    ["0x1111111111111111111111111111111111111111", "1000000000000000000"],
    ["0x2222222222222222222222222222222222222222", "2500000000000000000"],
    ["0x3333333333333333333333333333333333333333", "3500000000000000000"],
];

// (2)
const tree = StandardMerkleTree.of(values, ["address", "uint256"]);

// (3)
console.log('Merkle Root:', tree.root);
console.log(tree.render());

// (4)
fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));

