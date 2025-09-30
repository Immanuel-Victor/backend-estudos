function Logger (logString: string) {
    return function (target: Function) {
        console.log(logString)
        console.log(target);
    }
}

function WithTemplate(template: string, hookId: string) {
    return function<T extends { new(...args: any[]): { name: string } }>(target: T) {
        return class extends target {
            constructor(..._: any[]) {
                super();
                const hookElement = document.getElementById(hookId);
                if (hookElement) {
                    hookElement.innerHTML = template;
                    hookElement.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }

}

@Logger('Class - Logger')
@WithTemplate('<h1>Person Object</h1>', 'app')
class Person {
    name = 'Imm';

    constructor() {
        console.log("Creating new person");
    }
}

const pers = new Person();

console.log(pers)

function Log(target: any, propertyName: string | Symbol) {
    console.log('Prop Decorator');
    console.log(target, propertyName)
}

function Log2(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Acessor Decorator');
    console.log(target)
    console.log(propertyName)
    console.log(descriptor)
}

function Log3(target: any, methodName: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method Decorator');
    console.log(target)
    console.log(methodName)
    console.log(descriptor)
}

function Log4(target: any, methodName: string | Symbol, position: number) {
    console.log('Parameter Decorator');
    console.log(target)
    console.log(methodName)
    console.log(position)
}

class Product {
    @Log
    tittle: string;
    private _price: number

    @Log2
    set price(val: number) {
        if(val > 0) {
            this._price = val;
        }else {
            throw new Error("Invalid Price - value should be positive")
        }
    }

    constructor(t: string, p: number) {
        this.tittle = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        },
    };
    return adjDescriptor
}

class Printer {
    message = "This Works!";

    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer()

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage)

// Decorators with validation

interface ValidatorConfg {
    [prop: string]: {
        [validatable: string]: string[]
    }
}

const registeredValidators: ValidatorConfg = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required'],
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive'],
    };
}

function validate(obj: any) {
    const objValidatorsConfig = registeredValidators[obj.constructor.name];

    if(!objValidatorsConfig) {
        return true;
    }    
    let isValid = true
    for(const prop in objValidatorsConfig) {
        for( const validator of objValidatorsConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid &&  obj[prop] > 0;
                    break;
            }
        }
    }

    return isValid;
}

class Course {
    @Required
    tittle: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.tittle = t;
        this.price = p
    }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById("title") as HTMLInputElement;
    const priceEl = document.getElementById("price") as HTMLInputElement;

    const title = titleEl.value
    const price = +priceEl.value

    const createdCourse = new Course(title, price);
    
    if(!validate(createdCourse)) {
        alert('Invalid input, please try again!')
    }
    console.log(createdCourse);
})