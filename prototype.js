/*생성자 함수가 있을때 new 연산자를 통해서 인스턴스를 만들면, 그 인스턴스에는 constructor의 프로토타입 이라고 하는 프로퍼티 내용이 [[Prototype]] 이라고 하는 프로퍼티로 참조를 전달하게 된다 (===constructor.prototype 이랑 instance.[[Prototype]]이 같은 객체를 바라보고 있다) 하지만 [[Prototype]]은 접근가능 한 것이 아니라 정보를 보여주기만 할 뿐이여서 실제 동작상으로는 instance와 동일시 여겨지며 생략하는 경우가 많다 */

//prototype & constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const khan = new Person('칸', 17);
console.log(khan); //Person { name: '칸', age: 17 }

const khanClone1 = new khan.__proto__.constructor('칸 분신 1', 18); // instance.__proto__.constructor
console.log(khanClone1); //Person { name: '칸 분신 1', age: 18 }

const khanClone2 = new khan.constructor('칸 분신 2', 19); // instance.constructor
console.log(khanClone2); //Person { name: '칸 분신 2', age: 19 }

const khanClone3 = new Person.prototype.constructor('칸 분신 4', 21); // Constructor.prototype.constructor
console.log(khanClone3); //Person { name: '칸 분신 4', age: 21 }

//prototype method
function People(name, age) {
  this.name = name;
  this.age = age;
}
People.prototype.setOlder = function () {
  this.age += 1;
};
People.prototype.getAge = function () {
  return this.age;
};
const a = new People('A', 1);
const b = new People('B', 2);
const c = new People('C', 3);

console.log(a); //People { name: 'A', age: 1 }
a.setOlder();
console.log(a.getAge()); //2

console.log(b); //People { name: 'B', age: 2 }
b.setOlder();
console.log(b.getAge()); //3

console.log(c); //People { name: 'C', age: 3 }
c.setOlder();
console.log(c.getAge()); //4

/*여기서 setOlder 과 getAge메소드는 한번만 만들고 이 메서드들을 사용 할 때마다 참조만 할 뿐이다 그러므로 중복된 코드가 없어진다. 인스턴스들은 저마다의 고유한 정보들만 가지고 있으면 되고, 인스턴스들이 모두 똑같이 가지는 정보들은 prototype method로 보내면 된다. 이렇게 되면 각 인스턴스들은 자신의 메서드인 것처럼 다양한 명령을 사용 할 수있으며 메모리 적인 부분에서도 아낄수 있다 */

//prototype chaining
/*Constructor를 생성하면 Constructor가 생성되고 이 프로토타입의 프로퍼티는 '객체'이다 그러므로 프로토타입의 프로퍼티는 Object 생성자 함수의 new 연산으로 생성된 인스턴스가 된다 그러므로 Object.prototype과 연결되어 있다. 그래서 new 연산자로 생성된 instance는 Constructor.prototype 도 사용할 수 있고 Object.prototype도 사용할 수 있다. 이것을 프로토타입 체인 이라고 한다.*/

/*프로토타입은 모두 객체이므로 모두 동일한 구조를 가지고 있다 (숫자형, 문자형, 배열, 함수) 그리고 Object.prototype에는 공통된 메서드들이 정의되어 었다 이 메서드 들은 프로토타입 체이닝을 통해서 접근 할 수 있다 하지만 객체의 프로토 타입에는 '객체' 전용 메서드를 정의할 수 없다 민약 객체의 프로토타입에 정의 하게 된다면 모든 데이터 타입에서 사용할 수 있기 때문이다 그래서 '객체' 전용 메서드를 객체 생성자 함수에 정의하였다. 그래서 Object.key(obj), Object.values(obj) 이런식으로 Object.명령어 형태로 호출한다*/

const arr = [1, 2, 3];
let str = arr.toString();
console.log(str); //1,2,3

delete Array.prototype.toString;
str = arr.toString();
console.log(str); //[object Array]

delete Object.prototype.toString;
str = arr.toString();
console.log(str); //TypeError: arr.toString is not a function

/*처음에 메서드를 호출하면 인스턴스 자기 자신에게 메서드가 있는지 없는지 찾고 없으면 Array.prototype에서 toString 메서드가 있는지 찾는다(57번째 줄) 그리고 메서드를 삭제하고 다시 호출을 하면 자기 자신에게도 toString 메서드가 없고 Array.prototype에게도 toString메서드가 없으니 프로토타입 체이닝을 통해서 Object.prototype에 있는 toString 메서드를 호출한다(61번째 줄) 만약 Object.prototype도 없으면 에러를 던진다*/
/*원래는 인스턴스가 있는곳에서 가장 먼저 발견된 메서드를 사용한다 위의 예제에서는 Array.prototype에 있는 toString 메서드를 사용한다*/
