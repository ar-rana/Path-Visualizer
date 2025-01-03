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
        else if (this.root.PRN >= node.PRN) {
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
        // in our implimentation in PriorityQueue the lower the number the higher is its priority (min PriorityQueue)
        if (this.root === null) return null;
        else {
            let item = this.root.val;
            this.root = this.root.next;
            this.len--;
            return item;
        }
    }

    qPop() {
        if (this.root === null) return null;
        else {
            let keep = [];
            keep.push(this.root.val[0]);
            keep.push(this.root.val[1]);
            keep.push(this.root.PRN);
            this.root = this.root.next;
            this.len--;
            return keep;
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

    getPQueue() {
        if (this.root === null) return null;
        let items = []
        let temp = this.root;
        while(temp != null) {
            let keep = [];
            keep.push(temp.val[0]);
            keep.push(temp.val[1]);
            keep.push(temp.PRN);
            items.push(keep);
            temp = temp.next;
        }
        return items;
    }
}

export default PriorityQueue;