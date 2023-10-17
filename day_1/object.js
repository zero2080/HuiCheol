// 0. 문법적 차이:
// function 방식
// function AnimalFunction(type) {
//   this.type = type;
// }
//
// class 방식
// class AnimalClass {
//   constructor(type) {
//     this.type = type;
//   }
// }

// 1. 호이스팅 (Hoisting):
// function 방식
a = new AnimalFunction("Dog"); // 동작합니다.
function AnimalFunction(type) {
  this.type = type;
}

// class 방식
// b = new AnimalClass('Cat'); // 오류! Class는 호이스팅되지 않습니다.
class AnimalClass {
  constructor(type) {
    this.type = type;
  }
}

// 2. 생성자 (Constructor):
// function 방식
function AnimalFunctionConstructor(type) {
  if (!(this instanceof AnimalFunctionConstructor)) {
    return new AnimalFunctionConstructor(type);
  }
  this.type = type;
}

AnimalFunctionConstructor("Dog"); // new 키워드 없이 호출해도 문제없습니다.

// class 방식
// AnimalClass('Cat'); // 오류! new 키워드 없이 class를 호출할 수 없습니다.

// 3. 메소드 정의
// function 방식
AnimalFunction.prototype.makeSound = function () {
  console.log(this.type + " is making a sound.");
};

// class 방식
class AnimalClassFunction {
  makeSound() {
    console.log(this.type + " is making a sound.");
  }
}

// 4. 프로토타입 vs 인스턴스 속성:
// function 방식
// function AnimalFunction(type) {
//   this.type = type; // 인스턴스 속성
// }
AnimalFunction.prototype.sharedValue = 10; // 프로토타입 속성

// class 방식
class AnimalClassField {
  constructor(type) {
    this.type = type; // 인스턴스 속성
  }
  sharedValue = 10; // 인스턴스 속성
  static staticValue = 20; // 정적 속성
}

// 5. 상속
// function 방식
function Dog() {
  AnimalFunction.call(this, "Dog");
}
Dog.prototype = Object.create(AnimalFunction.prototype);
Dog.prototype.constructor = Dog;

// class 방식
class Cat extends AnimalClass {
  constructor() {
    super("Cat");
  }
}
