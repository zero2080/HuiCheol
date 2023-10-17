console.log("Hello World!");

// 변수 선언
// var, let ,const
// var 전역변수
//  -
/*

function test(){
    {
        console.log(i);
        console.log(ii);

        var i = 'a';
        let ii = 'b';
        const iii = 'c';
        console.log(iii);
    }
    console.log(i);
    console.log(ii);
}

console.log(i);



 */

// es6 클래스문법
function Cls(name) {
  this.name = name;
  this.print = () => {
    console.log(this.name);
  };
}

class Clss {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  print() {
    console.log(`My name is ${this.name}`);
  }
}

let cls = new Cls("test");
let clss = new Clss("test2");

cls.print();
clss.print();
// 함수 정의

// 함수 호출

for (let i = 1; i < 10; i++) {
  let str = "";
  for (let j = 2; j < 10; j++) {
    str += `${j} x ${i}= ${j * i}\t`;
  }
  console.log(str);
}

for (let i = 1; i < 10; i++) {
  let str = ``;
  for (let j = 2; j < 10; j++) {
    if (j % 2 === 0) {
      str += `${j} x ${i} = ${j * i}\t`;
    }
  }
  console.log(str);
}

let arr = [];
for (let i = 1; i < 10; i++) {
  let gugu = [];
  for (let j = 2; j < 10; j++) {
    gugu.push(`${j} x ${i} = ${i * j}`);
  }
  arr.push(gugu);
}

console.table(arr);
