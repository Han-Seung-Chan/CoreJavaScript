//프로토타입 체이닝 이상한 점
const Grade = function () {
  const args = Array.prototype.slice.call(arguments);

  for (let i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
};
Grade.prototype = [];
const g = new Grade(100, 80);
console.log(g); // Array{ '0': 100, '1': 80, length: 2 }

g.push(90);
console.log(g); //Array { '0': 100, '1': 80, '2': 90, length: 3 }
delete g.length;
g.push(70);
console.log(g); //Array { '0': 70, '1': 80, '2': 90, length: 1 }
/*3번째줄 코드 = 이 코드가 존재하는 함수의 매개변수로 넘어온 값들을 Array로 변환하겠다 라는 의미이다 왜냐하면 argument는 Object형태로 인자들이 넘어오기 때문이다 그리고 args 배열에 요소로 arguments 받은것을 하나씩 넣어주었다 그리고 10번째 줄에서 Grade.prototype을 빈 배열로 선언 해주면서 args는 원래 유사배열 이지만 배열에 메소드를 사용할 수 있게 되었다*/
/* 처음에 유사배열에 인자들이 들어가고 length가 2와 3으로 나오게 된다 하지만 여기서 유사배열에 length를 지우면 이제 Array.prototype에 있는 배열로 데이터가 들어가게 되고 거기서 length를 불러보면 값이 1이 나오게 된다*/

//클래스 static method & prototype method
function Human(name, age) {
  this._name = name;
  this._age = age;
}
Human.getInformation = function (instance) {
  // static(정적)메서드
  return {
    name: instance._name,
    age: instance._age,
  };
};
Human.prototype.getName = function () {
  // 프로토타입 메서드
  return this._name;
};
Human.prototype.getAge = function () {
  // 프로토타입 메서드
  return this._age;
};

const han = new Human('한승찬', 25);
console.log(han.getName()); // 한승찬
console.log(han.getAge()); // 25
console.log(Human.getInformation(han)); //{ name: '한승찬', age: 25 }
console.log(han.constructor.getInformation(han)); //{ name: '한승찬', age: 25 }
//static methods, static properties 는 일반적은 prototype methods 들과 접근 가능 여부가 다르다
/*instance 에서 prototype methods는 접근이 가능하다(__proto__라는 매개체를 이용하면 된다) 하지만 static으로는 instance가 접근이 불가능 하다 접근하려면 this를 생성자 함수로 가르키거나 instance 에서 생성자 함수를 찾아서 static 메서드를 불러와야 한다. 그 이유는 han에는 해당 메서드가 없고 han.__proto__ 및 han.__proto__.__proto__ 에도 메서드가 없기 때문이다*/

//클래스를 사용하지 않았을때 상속하기
const extendClass = (function () {
  function Bridge() {}
  return function (Parent, Child) {
    Bridge.prototype = Parent.prototype;
    Child.prototype = new Bridge();
    Child.prototype.constructor = Child;
    Child.prototype.superClass = Parent;
  };
})();

function Person(name, age) {
  this.name = name || '이름없음';
  this.age = age || '나이모름';
}
Person.prototype.getName = function () {
  return this.name;
};
Person.prototype.getAge = function () {
  return this.age;
};

function Employee(name, age, position) {
  this.superClass(name, age);
  this.position = position || '직책모름';
}
extendClass(Person, Employee);
Employee.prototype.getPosition = function () {
  return this.position;
};

const khan = new Employee('칸', 20, 'CEO');
console.log(khan); //Employee { name: '칸', age: 20, position: 'CEO' }

const chan = new Person('찬', 30);
console.log(chan); //Person { name: '찬', age: 30 }
/* Bridge 라는 빈 함수를 만들고 Bridge.prototype이 Person.prototype을 참조하게 한 다음 Employee.prototype에 new Bridge()로 할당하면 Bridge가 빈생성자 함수로써 다리 역활을 하고 그러므로 인스턴스를 제외한 프로토타입 체인 경로상에는 구체적인 데이터가 남지 않게 된다 그리고 즉시실행 함수 내부에서 Bridge를 선언해서 클로저를 활용함으로써 Bridge가 여러번 선언되는걸 막아 주었고, superClass는 Person의 데이터를 가지고 있기 때문에 name과 age변수를 사용할 수 있다*/

//클래스 상속하기
class People {
  constructor(name, age) {
    this.name = name || '이름없음';
    this.age = age || '나이모름';
  }
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
}

class Employees extends People {
  constructor(name, age, position) {
    super(name, age);
    this.position = position || '직책모름';
  }
  getPosition() {
    return this.position;
  }
}
const shan = new Person('shan', 50);
console.log(shan); //Person { name: 'shan', age: 50 }

const than = new Employee('than', 40, 'CTO');
console.log(than); //Employee { name: 'than', age: 40, position: 'CTO' }
//super은 1. 자식 클래스 내에서 부모클래스의 생성자 역할 2. 자식 클래스에서 부모 클래스의 메소드 접근 역할 을 한다
//class를 이용할 경우 규칙성을 갖는 객체를 일관성 있게 만드는 게 가능하며, 상속을 통해서 기능 확장이 용이하다는 것 알 수 있었다.
