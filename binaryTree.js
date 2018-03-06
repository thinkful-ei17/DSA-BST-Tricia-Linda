'use strict';

let countRight = 0;
let countLeft = 0;
let count = 0;

class BinarySearchTree {
	constructor(key=null, value=null, parent=null) {
		this.key = key;
		this.value = value;
		this.parent = parent;
		this.left = null;
		this.right = null;
	}
	insert(key, value) {

		if (this.key === null) {
			this.key = key;
			this.value = value;
			console.log('root parent is key:value', this.key, this.value);
		}

		else if (key < this.key) {
			if (this.left === null) {
				this.left = new BinarySearchTree(key, value, this);
				console.log('left child is key:value', this.left.key, this.left.value);
			}
			else {
				this.left.insert(key, value);
			}
		}

		else {
			if (this.right === null) {
				this.right = new BinarySearchTree(key, value, this);
				console.log('right child is key:value', this.right.key, this.right.value);
			}
			else {
				this.right.insert(key, value);
			}
		}
	}

	find(key) {
		if (this.key === key) {
			console.log('what is key and value', this.key, this.value);
			return this.value;
		}

		else if (key < this.key && this.left) {
			return this.left.find(key);
		}

		else if (key > this.key && this.right) {
			return this.right.find(key);
		}

		else {
			throw new Error ('Key Error');
		}
	}

	remove(key) {
		if (this.key === key) {
			if (this.left && this.right) {
				const successor = this.right._findMin();
				this.key = successor.key;
				this.value = successor.value;
				successor.remove(successor.key);
			}

			else if (this.left) {
				this._replaceWith(this.left);
			}

			else if (this.right) {
				this._replaceWith(this.right);
			}

			else {
				this._replaceWith(null);
			}
		}
		else if (key < this.key && this.left) {
			this.left.remove(key);
		}
		else if (key > this.key && this.right) {
			this.right.remove(key);
		}
		else {
			throw new Error('Key Error');
		}
	}

	_replaceWith(node) {
		if (this.parent) {
			if (this == this.parent.left) {
				this.parent.left = node;
			}
			else if (this == this.parent.right) {
				this.parent.right = node;
			}

			if (node) {
				node.parent = this.parent;
			}
		}
		else {
			if (node) {
				this.key = node.key;
				this.value = node.value;
				this.left = node.left;
				this.right = node.right;
			}
			else {
				this.key = null;
				this.value = null;
				this.left = null;
				this.right = null;
			}
		}
	}

	_findMin(position=0){
		if (!this.left || position === 0) {

			return this;
    }
		return this.left._findMin((position--));
	}

	_findMax(position=0) { 
		if (!this.right || position === 0) {
			return this;
    }
		return this.right._findMax((position--));
	}	
}


const findHeightOfTree = (tree) => {
	/*
  traverse left; traverse right
  count each level
  remember level starts at 0
  whereas height starts with 1
  key === null (base case) - if this left equal null; if right equal null = we are at bottom of recursive; return up
  each time we return; we count
  Our example - exepcted results: height of 5; level of 4
  */

	//base case
	if (!tree) {
		return 0;
	}

	const rightHeight = 1 + findHeightOfTree(tree.right);
	console.log('on right', rightHeight);
	const leftHeight = 1 + findHeightOfTree(tree.left);
	console.log('on left', leftHeight);

	return rightHeight > leftHeight ? rightHeight : leftHeight;
	//if right side height is greater than left; return right height else return left height
};

function isBST(tree){
//does tree contain nodes with no more than 2 children
//left side key are less than right side keys
	let isBST = false;

	if (tree.key === null){
		throw new Error('isBST: Tree is empty');
	}
	if (!tree.left || !tree.right){  
		throw new Error('isBST:  Not a binary tree');
	}
	if ((tree._findMin()).key < tree.key){
 		isBST = true;
	}
	if ((tree._findMax()).key > tree.key){
		isBST = true;
	}
	console.log('minimum key = ', tree._findMin().key);
	console.log('maximum key', tree._findMax().key);
	return isBST;
}

function findKeyAtPosition(tree, position) {
  console.log('start',position);
  if(tree.key === null) {
    throw new Error('findKeyAtPosition: Tree is empty');
  }	
  console.log('end', position);
  return (tree._findMax(position)).key;
}

const main = () => {
	const tree = new BinarySearchTree();
	tree.insert(3, 'a');
	tree.insert(1, 'b');
	tree.insert(4, 'c');
	tree.insert(6, 'd');
	tree.insert(9, 'e');
	tree.insert(2, 'f');
	tree.insert(5, 'g');
	tree.insert(7, 'h');
	console.log(tree);
	//console.log(tree.find(3));
	//console.log(tree.find(1));
	//console.log(tree.find(4));
	//tree.remove(3);
	//console.log(tree);
	// console.log(findHeightOfTree(tree));
	console.log('----------------------------');
  //console.log(isBST(tree));
  console.log(findKeyAtPosition(tree, 3));
};

main();

