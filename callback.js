/*callback function = 회신되는 함수 
함수를 처리해 달라고 할 때 제어권은 함수를 실행 시키는 쪽으로 넘어간다 (위임한다)
제어권 = 실행시점, 매개변수, this
*/

//실행시점 넘기기
const callback = () => {
  console.log('1초마다 실행');
};
setInterval(callback, 5000);
//setInterval에게 함수를 넘겨주 나면 이 함수가 자동으로 두번째 매개변수에 있는 밀리초마다 한번씩 함수를 호출해 주는것이다. 콜백함수를 넘겨주면 사용자가 실행 하는것이 아니라 setInterval이 알아서 실행하는 것이다 (제어권을 setInterval에게 넘겨준 것이다)

//매개변수 넘기기
const arr = [1, 2, 3, 4, 5];
const tmpArr = [];
arr.forEach(
  function (value, index) {
    tmpArr.push([value, index, this[index]]);
  },
  [10, 20, 30, 40, 50]
);
console.log(tmpArr);
/*[
  [ 1, 0, 10 ],
  [ 2, 1, 20 ],
  [ 3, 2, 30 ],
  [ 4, 3, 40 ],
  [ 5, 4, 50 ]
]
*/
//forEach는 첫번째 인자에 callback()을 받고 두번째 인자에는 thisArgument를 받는다 라는 규칙이 정해져 있다. 그러므로 this는 2번째 인자를 가르킨다. 여기서 두번째 인자는 생략 가능하다 forEach 안에 callback()가 들어올때 매개변수의 내용 순서는 전적으로 forEach가 정의된 방식에 따를 수밖에 없다

//this 넘기기
document.body.innerHTML = '<div id = "a"> abc </div>';
function callback2(x) {
  console.log(this, x); //<div id="a"> abc </div>, PointerEvent
}
document.getElementById('a').addEventListener('click', callback2);

/*콜백함수의 특징
1. 다른 함수(A)의 인자로 콜백함수 (B)를 전달하면, A가B의 제어권을 가진다
2. 특별한 요청 (Bind)이 없는 한 (A)에 미리 정해놓은 방식에 따라 B를 호출한다
3. 미리 정해놓은 방식이란 어떤시점에 콜백을 호출 할 지, 인자에는 어떤 값들을 지정할 지, this에 무섯을 바인딩할지 등이다
*/
