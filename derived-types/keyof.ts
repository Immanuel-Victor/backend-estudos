type User = { name: string; age: number; };
type UserKeys = keyof User;

let validKey: UserKeys;

validKey = 'name';
validKey = 'age';

function getProp<T extends object, U extends keyof T>(obj: T, key: U) {
    const val = obj[key];
    if(!val) {
        throw new Error('Acessando valor undefined ou null');
    }

    return val;
}

const user = { name: 'Imm', age: 22 }

const val = getProp(user, 'age');