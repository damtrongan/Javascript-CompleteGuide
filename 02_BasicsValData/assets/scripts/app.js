const defaultResult = 0;
let currentResult = defaultResult;

function add() {
  currentResult = currentResult + userInput.value;
  outputResult(currentResult, '');
}

addBtn.addEventListener('click', add);

var a = 2;
a = NaN;  

addBtn
console.log(a);
console.log(typeof(NaN))