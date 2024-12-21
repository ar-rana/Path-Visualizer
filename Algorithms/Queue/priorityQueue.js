class Node {
    constructor(val, PRN, next = null) {
        this.val = val;
        this.PRN = PRN;
        this.next = next;
    }
}

class PriorityQueue {
    constructor() {
        this.root = null;
        this.len = 0;
    }

    enqueue(item, PRN) {
        let node = new Node(item, PRN);
        if (this.root === null) this.root = node;
        else if (this.root.PRN > node.PRN) {
            node.next = this.root;
            this.root = node;
        }
        else {
            let temp = this.root;
            while(temp.next != null && temp.next.PRN <= PRN) {
                temp = temp.next;
            }
            node.next = temp.next;
            temp.next = node;
        }
        this.len++;
    }

    dequeue() {
        // in our implimentation in greedyBFS the lower the number the higher is its priority
        if (this.root === null) return null;
        else {
            let item = this.root.val;
            this.root = this.root.next;
            this.len--;
            return item;
        }
    }

    peek() {
        if (this.root === null) return null;
        else return this.root.val;
    }

    isEmpty() {
        return this.root===null;
    }

    size() {
        return this.len;
    }

    getQueue() {
        if (this.root === null) return null;
        let items = []
        let temp = this.root;
        while(temp != null) {
            items.push(temp.val);
            temp = temp.next;
        }
        return items;
    }
}

export default PriorityQueue;