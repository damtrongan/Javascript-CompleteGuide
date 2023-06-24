const startGameBtn = document.getElementById("start-game-btn");

const KEO = "KEO";
const BUA = "BUA";
const LA = "LA";
const DEFAULT_USER_CHOICE = BUA;
const RESULT_DRAW = "Hòa";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(`${KEO}, ${BUA}, ${LA}?`, "").toUpperCase();

  if (selection !== KEO && selection !== BUA && selection !== LA) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

const getComputerChoice = () => {
  var value = Math.random();
  var computerChoice = "";
  value < 0.36
    ? (computerChoice = BUA)
    : value < 0.67
    ? (computerChoice = KEO)
    : (computerChoice = LA);
  return computerChoice;
};

const getWinner = (cChoice, pChoice) => {
  return cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === BUA && pChoice === KEO) ||
      (cChoice === KEO && pChoice === LA) ||
      (cChoice === LA && pChoice === BUA)
    ? RESULT_COMPUTER_WINS
    : RESULT_PLAYER_WINS;
};

startGameBtn.addEventListener("click", () => {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log("Game starting now");

  var pSelection = getPlayerChoice();
  var cSelection = getComputerChoice();

  console.log(`User choose : ${pSelection} and Computer choose: ${cSelection}`);

  var result = getWinner(cSelection, pSelection);

  console.log(result);
  gameIsRunning = false;
});


const sumUp = (a, b, ...numbers) => {
  let sum = 0;
  const validateNumber = (number) => {
    return isNaN(number) ? 0 : number;
  }

  for (const number of numbers) {
    sum += validateNumber(number)
  }
  return sum;
}

console.log(sumUp(1,3,4,'ads', 3,4));