class Stack {
    constructor() {
        this.stack = {};
        this.top = -1;
    }

    push(item) {
        this.stack[++top] = item;
    }

    pop() {
        if (top == -1) return null;
        item = this.stack[top--];
        return item;
    }

    peek() {
        if (top === -1) return null;
        return this.stack[top];
    }

    isEmpty() {
        return top === -1;
    }

    getVal(idx) {
        if (idx > top || top === -1) return null;
        return this.stack[idx];
    }

    size() {
        return top + 1;
    }

    getStack() {
        arr = [];
        for (let i=0;i<=this.top;i++) {
            arr[i] = this.stack[i];
        }

        return arr;
    }

    printStack() {
        return this.stack;
    }
}