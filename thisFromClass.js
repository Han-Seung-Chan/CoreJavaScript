function PeoPle(name, age) {
  this.name = name;
  this.age = age;
}

const a = PeoPle('SB', 19);
console.log(global.name, global.age); //SB 19
//일반적으로 new 연산자 없이 그냥 people 함수를 호출할 경우에는 a에는 아무것도 담기지 않게 되고 함수로써 호출한 것이기 때문에 global.name을 해주면 값을 얻을 수 있다

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const b = new Person('RM', 18);
const c = new Person('V', 17);

console.log(b); // Person { name: 'RM', age: 18 }
console.log(c); //Person { name: 'V', age: 17 }
//생성자 함수로써 호출 한 것이니 b와c에 즉 새로 생설될 person의 인스턴스 객체 자신이 곧 this가 된다. 그리고 객체가 새로 생성 되면서 name프로퍼티, age프로퍼티가 각각 생성된다
