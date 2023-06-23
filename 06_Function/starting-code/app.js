const startGameBtn = document.getElementById("start-game-btn");

const bandAn = "AN";
const bandTrang = "TRANG";
const bandAn2 = "AN2";
const DEAFAULT_USER_CHOICE = bandAn;
let gameIsRunning = true;

function selectUser() {
  const selection = prompt(
    `Choose any band ${bandAn}, ${bandTrang}, ${bandAn2}`, ''
  ).toUpperCase();
  if (
    selection !== bandAn &&
    selection !== bandTrang &&
    selection !== bandAn2
  ) {
   alert(`Invalid choice! We chose ${DEAFAULT_USER_CHOICE} for you`);
   return DEAFAULT_USER_CHOICE;
  }

  return selection;
}

startGameBtn.addEventListener("click", () => {
   if(gameIsRunning) {
      return;
   }
   gameIsRunning = true;
   console.log("Game starting now");
   var selection = selectUser();
   console.log(selection);
}
);
