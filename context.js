var a = 1;
function outer() {
  console.log(a); // 1

  function inner() {
    console.log(a); // undefined
    var a = 3;
  }

  inner();

  console.log(a); // 1
}
outer();
console.log(a); // 1

// 6번째 줄에 undefined가 나오는 이유 : inner 함수 안에는 이미 var a를 선언 했으니 inner 안에는 이미 a 변수의 값을 읽어 오게 된다 그래서 6번째 줄을 실행할 때 undefined가 출렧이 된다 (var는 값이 할당 되지 않았을 때 undefined 이다)
// =====================================

let b = 1;
function outside() {
  console.log(b); // 1

  function inside() {
    console.log(b); // 1
    b = 3;
  }

  inside();

  console.log(b); // 3
}
outside();
console.log(b); // 3

//여기서 let은 한번 변수의 이름을 b라고 선언 하면 같은 다시 b를 선언 할 수 없다 그래서 b = 3 이라고 값을 변경 해주면 앞으로 b는 3이라는 값이 입력되어서 31번째 줄, 34번째 줄에 3이라는 결과를 얻는다
