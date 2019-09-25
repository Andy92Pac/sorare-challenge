var merkle = require('./../merkle');
var assert = require('assert');

describe('merkle test', () => {

	it('should give the same hash', () => {
		var merkleTree = merkle.createMerkleTree(['L1', 'L2', 'L3', 'L4']);

		var rootHash = merkle.getHash(
			merkle.getHash(
				merkle.getHash('L1')+
				merkle.getHash('L2')
				)
			+
			merkle.getHash(
				merkle.getHash('L3')+
				merkle.getHash('L4')
				)
			)
		assert.equal(rootHash, merkleTree.root());
	});

	it('should have the correct height', () => {
		var merkleTree = merkle.createMerkleTree(['L1', 'L2', 'L3', 'L4', 'L5']);

		assert.equal(4, merkleTree.height());
	});

	it('should give the correct level of hash', () => {
		var merkleTree = merkle.createMerkleTree(['L1', 'L2', 'L3', 'L4', 'L5']);

		var hashArray = [
		merkle.getHash(
			merkle.getHash('L1')+
			merkle.getHash('L2')
			)
		,
		merkle.getHash(
			merkle.getHash('L3')+
			merkle.getHash('L4')
			)
		,
		merkle.getHash('L5')
		]

		assert.deepEqual(hashArray, merkleTree.level(2));
	})
})
