/*기본적으로는 함수의 this와 같다 (전역객체를 가르킨다)
제어권을 가진 함수가 콜백의 this를 지정해둔 경우도 있다 (지정해둔 this를 가르킨다)
this를 바인딩해서 콜백함수에 넘기면 this는 전역객체를 가르키지 않는다*/
const callback = function () {
  console.log(this); // global
};

const obj = {
  a: 1,
  b: function (callback) {
    callback();
  },
};
obj.b(callback);
// 함수로써 callback 함수를 호출 했으므로 this = global

const callback1 = function () {
  console.log(this); // { a1: 1, b1: [Function: b1] }
};

const obj1 = {
  a1: 1,
  b1: function (callback1) {
    const c1 = callback1.bind(this);
    c1(); // { a1: 1, b1: [Function: b1] }
  },
};
obj1.b1(callback1);
//callback() 내부에서의 this는 콜백함수 자체가 뭘 어떻게 할 수있는 게 아니고 매개변수로 넘겨받는 이 callback()를 어떤식으로 처리 하냐에 따라서 달라진다.

const callback2 = function () {
  console.log(this);
};
const obj2 = {
  a2: 1,
};
setTimeout(callback2.bind(obj2), 1000); //{ a2: 1 }
//bind()를 사용하지 않으면 this는 global을 가르키게 된다. setTimeout이 콜백을 처리하는 방식을 임의로 바꿀 수 없으니 원하는 값으로 만들고 싶으면 bind()를 사용한다
