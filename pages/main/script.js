function Builder(value) {
        this.isInteger = Number.isInteger(value);
        this.curentValue = (this.isInteger) ? value : String(value);
};

Builder.prototype.get = function() {
    return this.curentValue;
};

Builder.prototype.plus = function(...args) {
    for (let item of args) {
        this.curentValue += item;
    }
    return this;
}

Builder.prototype.minus = function(...args) {
    if (this.isInteger) {
        for (let item of args) {
            this.curentValue -= item;
        }
    } else {
        this.curentValue = this.curentValue.slice(0, -(args[0]));
    }
    return this;
}

Builder.prototype.multiply = function(multiplicator) {
    if (this.isInteger) {
        this.curentValue *= multiplicator;
    } else {
        this.curentValue = this.curentValue.repeat(multiplicator);
    }
    return this;
}

Builder.prototype.divide = function(divider) {
    if (this.isInteger) {
        this.curentValue = Math.trunc(this.curentValue / divider);
    } else {
        const k = Math.floor(this.curentValue.length / divider)
        this.curentValue = this.curentValue.slice(0, k);
    }
    return this;
}

//ES6 class IntBuilder:

class IntBuilder extends Builder {
    constructor(int=0) {
        super(int);
    }

    static random(from, to){
        return Math.floor(Math.random() * (to - from + 1)) + from; //inclusive
    }


    mod(divider) {
        this.curentValue %= divider;
        return this;
    }
}

//ES5 class StringBuilder:

function StringBuilder(str='') {
    Builder.call(this, str);
}

StringBuilder.prototype = Object.create(Builder.prototype);

StringBuilder.prototype.remove = function(str){
    if (this.curentValue.includes(str)) {
        this.curentValue = this.curentValue.split(str).join('');
    }
    return this;
}

StringBuilder.prototype.sub = function(from, n){
    this.curentValue = this.curentValue.substr(from, n);
    return this;
}


/* Example

const myInt = new IntBuilder(23);
const myString = new StringBuilder('Hello');

myInt
    .plus(5, 67, -10, -200, 1000)
    .minus(100, 700)
    .multiply(10)
    .divide(11)
    .mod(60);

console.log(myInt.get());
console.log(IntBuilder.random(3, 134));


myString
    .plus(' ', 'new', ' ', 'amaizing', ' ', 'World', '!!!')
    .minus(3)
    .multiply(4)
    .divide(2)
    .sub(0,20)
    .remove('izi');

console.log(myString.get());

*/