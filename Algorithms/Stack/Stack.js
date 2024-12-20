class Stack {
    constructor() {
        this.stack = {};
        this.top = -1;
    }

    push(item) {
        this.stack[++this.top] = item;
    }

    pop() {
        if (this.top == -1) return null;
        let item = this.stack[this.top--];
        return item;
    }

    peek() {
        if (this.top === -1) return null;
        return this.stack[this.top];
    }

    isEmpty() {
        return this.top === -1;
    }

    getVal(idx) {
        if (idx > this.top || this.top === -1) return null;
        return this.stack[idx];
    }

    size() {
        return this.top + 1;
    }

    getStack() {
        let arr = [];
        for (let i=0;i<=this.top;i++) {
            arr[i] = this.stack[i];
        }

        return arr;
    }

    printArray() {
        return this.stack;
    }
}

export default Stack;