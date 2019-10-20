const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this._size++;
		this.insertNode(node);
		this.shiftNodeUp(node);	
	}


	pop() {
		if (this.parentNodes.length == 0) {
			return;
		} else {
				
			let result = this.detachRoot();
			this.restoreRootFromLastInsertedNode(result);
			this.shiftNodeDown(this.root);
			return result.data;
		}
	}

	detachRoot() {
		let Root = this.root;
		this.root = null;
		this._size--;
		return Root;	
	}

	restoreRootFromLastInsertedNode(detached) {

		
	}

	size() {
		return this._size;
	}

	isEmpty() {
		return this.root == null && this.parentNodes.length == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;	
	}

	insertNode(node) {

		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes.push(node);
			this.parentNodes[0].appendChild(node);
		}
		if (this.parentNodes[0].left && this.parentNodes[0].right) this.parentNodes.shift();
	}



	shiftNodeUp(node) {	
		let parent = node.parent;

				
		if (!parent) {
			this.root = node;
		}

		else if (parent.right == node) {
						
			if ((node.priority < parent.priority) && (node.priority < parent.left.priority)) {
				return;
			}

			else if (node.priority > parent.priority) {
				node.swapWithParent();
				this.shiftNodeUp(parent);
			}
		}

		else if (parent.left == node) {
			if (node.priority > parent.priority) {
				node.swapWithParent();
				this.shiftNodeUp(parent);
			}
		}

	}

	shiftNodeDown(node) {
		let i = this.parentNodes.indexOf(node);
		let left = 2 * i + 1;
		let right = 2 * i + 2;
		let largest = i;

		if (left < this._size && this.parentNodes[left] > this.parentNodes[i]) {
			largest = left;
		}

		else if (right < this._size && this.parentNodes[right] > this.parentNodes[largest]) {
			largest = right;
		}

		else if (largest != i) {
			node.swapWithParent();
			return shiftNodeDown(largest);
		}	
	}
}

module.exports = MaxHeap;
