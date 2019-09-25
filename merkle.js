var crypto = require('crypto');

function MerkleTree (strArray) {
	this[0] = strArray;
	var leavesHash = strArray.map(s => getHash(s));

	computeLevel(this, leavesHash, 1);
}

MerkleTree.prototype.root = function() {
	return this.rootHash;
}

MerkleTree.prototype.height = function() {
	return this.treeHeight;
}

MerkleTree.prototype.level = function(level) {
	return this[level];
}

createMerkleTree = function (strArray) {
	return new MerkleTree(strArray);
}

computeLevel = function (merkleObj, hashArray, level) {
	merkleObj[level] = [];

	var parentsHashArray = [];

	for(var i=0; i<hashArray.length; i++) {
		merkleObj[level].push(hashArray[i]);

		if (i%2 == 0) {
			var hash;

			if (i+1 < hashArray.length) {
				hash = getHash(hashArray[i] + hashArray[i+1])
			}
			else {
				hash = hashArray[i];
			}

			parentsHashArray.push(hash);
		}
	}

	if(parentsHashArray.length > 1) {
		computeLevel(merkleObj, parentsHashArray, level+1);
	}
	else {
		merkleObj[level+1] = [parentsHashArray[0]];
		merkleObj['rootHash'] = parentsHashArray[0];
		merkleObj['treeHeight'] = level+2
		return;
	}
}


getHash = function (str) {
	var hash = crypto.createHash('sha256')
	.update(str)
	.digest('hex');

	return hash;
}

module.exports = {
    createMerkleTree: createMerkleTree,
    getHash: getHash
}