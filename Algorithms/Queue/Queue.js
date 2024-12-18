class Queue {
    constructor() {
        this.queue = {};
        this.front = 0;
        this.rear = -1;
    }

    enqueue(item) {
        this.queue[++this.rear] = item;
    }

    dequeue() {
        return this.queue[this.front++];;
    }

    peek() {
        if (this.front > this.rear)
            return null;
        return this.queue[this.front];
    }

    isEmpty() {
        return this.front>this.rear;
    }
 
    getVal(idx) {
        if (idx>this.rear || this.rear==-1) return null;
        else return this.queue[idx];
    }

    size() {
        return this.rear - this.front + 1;
    }

    getQueue() {
        if (this.front > this.rear) return null;
        let items = []
        let j = 0;
        for (let i=this.front;i<=this.rear;i++) {
            items[j++] = this.queue[i];
        }
        return items;
    }

    printArray() {
        return this.queue;
    }
}


export default Queue;