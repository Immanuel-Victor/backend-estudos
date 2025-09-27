class Node<T> {
    public nextNode?: Node<T>

    constructor(public value:T) {};
}

class LinkedList<T> {
    private root?: Node<T>;
    private tail?: Node<T>;
    private _length: number = 0;

    get length() {
        return this._length;
    }

    add(value: T) {
        const node = new Node(value);
        if(!this.root || !this.tail) {
            this.root = node;
            this.tail = node;
        } else {
            this.tail.nextNode = node;
            this.tail = node;
        }

        this._length++;
    }

    print() {
        let current = this.root;

        while(current) {
            console.log(current.value);
            current = current.nextNode;
        }
    }
}

const numberList = new LinkedList<number>()

numberList.add(5);
numberList.add(10);
numberList.add(-3);
numberList.add(25);

console.log(numberList.length);
numberList.print();

const nameList = new LinkedList<string>()

nameList.add('Admilson');
nameList.add('Josoaldo');
nameList.add('Alexandre');
nameList.add('Mefistófeles');

console.log(nameList.length);
nameList.print();