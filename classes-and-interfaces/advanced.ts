class UserTwo {
    constructor(private _firstName: string = '', private _lastName: string = '') {}

    set firstName(value: string) {
        if(value.trim() === "") {
            throw new Error("Invalid name");
        }
        this._firstName = value;
    }
    set lastName(value: string) {
        if(value.trim() === "") {
            throw new Error("Invalid name");
        }
        this._lastName = value;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }

    static eid = Math.floor(Math.random()) * 10;

    static greet() {
        console.log("Hello!");
    }
}

class Employee extends UserTwo {
    constructor(public jobTitle: string,) {
        super();
    }

    work() {
        console.log("working");
    }
}

abstract class UIElement {
    constructor(public identifier: string) {}

    clone(targetLocation:string) {}
}

class SideDrawerElement extends UIElement {
    constructor(public identifier: string, public position: 'left' | 'right') {
        super(identifier);
    }
}

const vic = new UserTwo('Immanuel', 'Victor')
console.log(vic.fullName);
console.log(UserTwo.eid);
UserTwo.greet;