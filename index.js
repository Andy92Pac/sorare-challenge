var merkle = require('./merkle');

var m = merkle.createMerkleTree(['L1', 'L2', 'L3', 'L4', 'L5']);
console.log(m);