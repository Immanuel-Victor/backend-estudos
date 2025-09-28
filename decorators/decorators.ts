//ECMAScript Decorators

function logger<T extends new (...args: any[]) => any>(target: T, ctx: ClassDecoratorContext) {
    console.log('logger decorator')
    console.log(target);
    console.log(ctx);

    return class extends target {
        constructor(...args: any[]) {
            super(...args)
            console.log('class Constructor');
            console.log(this)
        }
    }
}

function autobind(target: Function, ctx: ClassMethodDecoratorContext) {
    ctx.addInitializer(function(this: any) {
        this[ctx.name] = this[ctx.name].bind(this);
    });

    return function(this: any) {
        console.log("EXECUTING ORIGINAL FUNCTION")
        target.apply(this);
    }
}

function fieldLogger(target: undefined, ctx: ClassFieldDecoratorContext) {
    console.log(target);
    console.log(ctx);

    return (initialValue: any) => {
        console.log('CHANGING FIELD')

        return initialValue += ' teste'
    }
}

function replacer<T>(newValue: T) {
    return function replacerDecorator(target: undefined, ctx: ClassFieldDecoratorContext) {
    console.log(target);
    console.log(ctx);

    return (initialValue: T) => {
        console.log(initialValue)

        return newValue;
    }
}
}

@logger
class Person {
    @replacer('Bacana')
    name = 'Imm';

    @autobind
    greet() {
        console.log(`Hi, i am ${this.name}`)
    }
}

const imm = new Person();
const test = new Person();

const greet = imm.greet;
const greet2 = test.greet;

greet();
greet2();