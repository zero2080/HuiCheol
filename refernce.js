// 구조 분해
const arr = [1, 2, 3, "이름"];
const obj = { name2: "이름", age: 31, weight: 77.1, height: 177 };

//변수의 구조 분해
//배열 구조분해
const [one, two, three, name, four] = arr; // 변수명은 상관없이 배열의 인덱스와 매치되어 변수에 할당됨
console.log(one, two, three, name, four);

//객체의 구조 분해
// const { age, name2, height, weight = 99, blood = "AB" } = obj; // 키값과 같은 이름으로 생성해야 하며, 순서는 상관이 없음.
// console.log(age, name2, weight, height, blood);

function print({ age: a = 0, t }) {
  // 전달된 객체에 age라는 키를 a로 변경하여 사용. undefined 혹은 null일때 0을 초기값으로 설정함
  console.log("age : " + a);
}

// 데이터
// 1: 1   2: { }  3: '제목'  4: {  }  9 : [  ] ㅋㅋㅋㅋ: '테스트'

// 변수
// 5: i  6: j   7: ref  8: ref2  10 : ref.chapters  11: ref2.chapters   12: ref.title   13: ref2.title

// 원시 타입 : String, Number, Boolean, Null, undefined
let i = 1;
let j = 1;

// 참조 타입 : Object( class ), Array, function
let ref = { title: "제목", chapters: [1, 2, 3, 4, 5] };
let ref2 = { ...ref };

// 얕은 복사( 참조 )
console.log("얕은 복사", ref.title, ref2.title);
ref.title = "테스트";
console.log("얕은 복사", ref.title, ref2.title);

ref2.chapters = [];
console.log("얕은 복사", ref.title, ref2.title);

ref.chapters.push(6);
console.log("얕은 복사", ref.chapters, ref2.chapters);

// 깊은 복사
// js에서는 기본적으로 깊은복사를 지원해주는 기능이 없으므로 원한다면 직접 구현해야 함
let ref3 = deepCopy(ref);

console.log(ref3);
console.log(ref === ref3);

ref.chapters.push(1234);
console.log(ref3);

// const _ = require("lodash");

const ref4 = _.deepCopy(ref);
function deepCopy(obj) {
  let result = {};
  for (i in obj) {
    if (typeof obj[i] === "object") {
      result[i] = copyarr(obj[i]);
    } else {
      result[i] = obj[i];
    }
  }
  return result;
}

function copyarr(arr) {
  return [...arr];
}

const random = require("./random");

let a = random();

console.log(a);
