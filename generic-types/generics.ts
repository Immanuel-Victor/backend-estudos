let names: Array<string> = ['Max', 'Anna'];

type DataStore<T> = {
    [key: string]: T
};

let store: DataStore<string> = {};

store.name = "Imm";


function merge<T,U>(a: T, b: U): [T,U];
function merge<T>(a: T, b: T): T[] {
    return [a,b]
}

const ids = merge(1,2);
const merged = merge("yes", 2)

function mergeObj<T extends object, U extends object>(a: T, b: U) {
    return { ...a, ...b}
}

const mergedObj = mergeObj({ username: "Imm" }, { age: 22 });

console.log(mergedObj)

class User<T> {
    constructor(public id: T) {}
}

const user = new User('I1');
const user2 = new User(2);