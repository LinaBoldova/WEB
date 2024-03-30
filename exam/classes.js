// класс - разновидность функции
class Rectangle {
    static displayName = "Прямоугольник";

    constructor(height, width) {
      this.height = height;
      this.width = width;
        }

    get area() {
        return this.calcArea();
        }
    
    calcArea() {
    return this.height * this.width;
        }

    // get height() {
    //     return this._height;
    // }

    // set height(value) {
    //     this._height = value;
    // }
  }

function Animal() {}

Animal.prototype.speak = function () {
  return this;
};

Animal.eat = function () {
  return this;
};

var Rectangle1 = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

const r1 = new Rectangle(1, 2);
const r2 = new Rectangle1();

console.log(Rectangle.name)
console.log(Rectangle1.name)
console.log(Rectangle.displayName)