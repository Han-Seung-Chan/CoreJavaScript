/* 컨텍스트 A에서 선언한 변수를 내부함수 B에서 참조할 경우에 발생하는 특별한 현상*/

var outer = function () {
  var a = 1;
  var inner = function () {
    console.log('1 : ' + ++a);
  };
  inner();
};
outer(); // 1 : 2
outer(); // 1 : 2
/*전역컨텍스트가 열리고 그 위에 outer컨텍스트가 쌓인다 그리고 outer는 lexicalEnvironment 안에 environmentRecord 안에 a = 1 이 들어가 있고 inner()도 들어가 있다 그리고 outerEnvironmentReference에는 outer()가 들어가 있다
inner()호출시 inner()가 outer()위에 쌓인다 inner컨텍스트 안에는 environmentRecord가 비어있고 outerEnvironmentReference에는 outer컨텍스트에 lexicalEnvironment를 참조한다 하지만 outer()를 다시 호출해도 값은 변경 되지 않는다 왜냐하면 inner()가 실행이 종료되고 다시  outer()를 호출해도 a의 값은 그대로 1이다 종료와 동시에 a값을 초기화 다시 초기화 하기 때문아다*/

var outside = () => {
  var b = 1;
  var inside = () => {
    return ++b;
  };
  return inside;
};
var outside2 = outside();
console.log('2 : ' + outside2()); // 2 : 2
console.log('2 : ' + outside2()); // 2 : 3
console.log('2 : ' + outside2()); // 2 : 4
/* 전역컨텍스트 안에는 environmentRecord에서 outside2 라는 변수를 수집 했는데 초기 값은 undefined라고 설정되었고 그리고 outside()도 수집했다 그리고 outside()를 실행한다 
outside()가 실행 컨텍스트 위에 쌓이고, environmentRecord 안에 b = 1이 들어가고 inside()도 들어가 있다 그리고 outerEnvironmentReference에는 outside()가 들어가 있다 그리고 함수 실행이 끝나면 반환된 값 즉 inner값이 비어있는 outside2에 값이 들어간다. 그리고 outside()는 실행이 종료 되었으니 지워준다. 하지만 여기서 주의할점은 실행은 종료 되었으나 b의 값이 0이 아니라 1로 참조 카운트가 1이기 때문에 GC대상에서 제외 된다. 그래서 다음에 outside2()를 실행하면 b의 값은 1이기 때문에 1에서 +1이되면서 2가된다.이게 클로저 현상이다
*/

function user(_name) {
  var _logged = true;
  return {
    get name() {
      return _name;
    },
    set name(v) {
      _name = v;
    },
    login() {
      _logged = true;
    },
    logout() {
      _logged = false;
    },
    get status() {
      return _logged ? 'Login' : 'Logout';
    },
  };
}
var person = user('승찬');
console.log(person.name); // 승찬

person.status = false; // 값을 변경 하려고 시도 한다
console.log(person.status); // 값이 변경되지 않는다

console.log(person.status); // Login
person.logout();
console.log(person.status); // Logout
person.login();
console.log(person.status); // Login

/* _name 과 _logged 변수는 함수가 종료 후에도 사라지지 않고 값을 유지하고 있다. 그리고 외부로 부터 내부 변수를 보호할 수 있다(캡슐화) 외부에 노출된 status 프로퍼티(메소드)는 getter로서만 역할을 하고 _logged의 값과는 별개의 문자열을 반환 해준다. 직접적으로 _logged에 변화를 줄 수 있는건 login() 와 logout()에 의해서만 가능하다*/

function hello(name) {
  let _name = name;
  return function () {
    console.log('Hello, ' + _name);
  };
}

let hello1 = hello('승찬');
let hello2 = hello('승범');
let hello3 = hello('산해');

hello1(); // 'Hello, 승찬'
hello2(); // 'Hello, 승범'
hello3(); // 'Hello, 산해'
/*특별히 인터페이스를 제공하는 것이 아니라면 여기서는 외부에서 _name에 접근할 방법이 전혀 없다. 이렇게 은닉화도 생각보다 쉽게 해결할 수 있다. */
