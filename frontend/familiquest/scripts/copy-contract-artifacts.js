const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../artifacts/contracts/ApprovalContract.sol/ApprovalContract.json');
const dest = path.resolve(__dirname, '../src/contracts/ApprovalContract.json');

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log(`Copied ApprovalContract.json to src/contracts/ApprovalContract.json`);