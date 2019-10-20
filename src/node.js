class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left) {
			if (this.right) {
				return;
			}
			this.right = node;
			node.parent = this;
			return this;
		}

		this.left = node;
		node.parent = this;
		return this;
	}

	removeChild(node) {
		if (!this.right && !this.left) {
			throw new Error ("Node is not a child!");
		}

		else if (this.left == node) {
			this.left = null;
		}

		else if (this.right == node) {
		} 

		node.parent = null;
		return this;	
	}

	remove() {
		if (!this.parent) {
			return;
		} else {
		this.parent.removeChild(this);
		}
	}

	swapWithParent() {
	
		if (this.parent) {

			let grandparent = this.parent.parent;
			let parentRight = this.parent.right;
			let parentLeft = this.parent.left;
			let parent = this.parent;
			let left = this.left;
			let right = this.right;
			
			if (this.parent.parent != null){
				if (this.parent.parent.left != null && this.parent.parent.left == parent) {
					this.parent.parent.left = this;
				}
				if (this.parent.parent.right != null && this.parent.parent.right == parent) {
					this.parent.parent.right = this;
				}
			}

			if (this.left != null) {
				this.left.parent = parent;
			}

			if (this.right != null) {
				this.right.parent = parent;
			}
			
			if (parentLeft != null && parentLeft == this){
				if (parentRight != null){
					parentRight.parent = this;
					this.right = parentRight;
					this.left = parent;
				} else {
					this.right = null;
				}
			}

			if (parentRight != null && parentRight == this){
				if (parentLeft != null){
					parentLeft.parent=this;
					this.left = parentLeft;
					this.right = parent;
				} else {
					this.left = null;
				}
			}
			
			this.parent.parent = this;
			this.parent.right = right;
			this.parent.left = left;
			this.parent = grandparent;
		}	
	}
}


module.exports = Node;
