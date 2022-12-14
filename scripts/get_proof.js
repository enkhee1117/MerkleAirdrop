// import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
const {StandardMerkleTree} = require("@openzeppelin/merkle-tree");
// import fs from "fs";
const fs = require("fs");

// (1)
const tree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("tree.json")));
console.log(tree.render());

// (2)
for (const [i, v] of tree.entries()) {
    if (v[0] === '0x1111111111111111111111111111111111111111') {
        // (3)
        const proof = tree.getProof(i);
        console.log('Value:', v);
        console.log('Proof:', proof);
        return proof;
    }
}
