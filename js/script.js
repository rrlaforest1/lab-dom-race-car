import Game from "./game.js";
const startButton = document.getElementById("start-button");
const liveTag = document.querySelector("#lives");
const restartButton = document.getElementById("restart-button");
const mainScreen = document.querySelector("#game-intro");
const gameScreen = document.querySelector("#game-screen");
const endScreen = document.querySelector("#game-end");
let game = null;

startButton.addEventListener("click", function () {
  startGame();
});

function startGame() {
  gameScreen.classList.remove("hidden");
  mainScreen.classList.add("hidden");

  game = new Game();
  // game.start();
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      game.pressedKeys.up = true;
      break;

    case "ArrowDown":
      game.pressedKeys.down = true;
      break;

    case "ArrowLeft":
      game.pressedKeys.left = true;
      break;

    case "ArrowRight":
      game.pressedKeys.right = true;
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      game.pressedKeys.up = false;
      break;

    case "ArrowDown":
      game.pressedKeys.down = false;
      break;

    case "ArrowLeft":
      game.pressedKeys.left = false;
      break;

    case "ArrowRight":
      game.pressedKeys.right = false;
      break;
  }
});
