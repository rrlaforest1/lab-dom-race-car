import Car from "./car.js";
import Obstacle from "./obstacles.js";

class Game {
  // code to be added
  constructor() {
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");
    this.liveTag = document.querySelector("#lives");
    this.height = 600;
    this.width = 500;
    this.gameScreen.style.width = this.width + "px";
    this.gameScreen.style.height = this.height + "px";
    this.player = new Car(
      this.gameScreen,
      70,
      20,
      100,
      150,
      "./images/car.png"
    );
    this.animationId = null;
    this.obstacles = [];
    // this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.pressedKeys = {
      up: false,
      right: false,
      left: false,
      down: false,
    };
    this.counter = 0;
    this.start();
    this.canBeHit = true;
    this.timeStamp = Date.now();
  }

  start() {
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.animationId = requestAnimationFrame(() => this.gameLoop());
    this.update();
  }

  update() {
    /**
     * Game Engine
     */
    if (this.counter % 300 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
      this.counter = 0;
    }
    this.counter++;

    for (const obstacle of this.obstacles) {
      obstacle.move();
      obstacle.updatePosition();
      if (this.player.didCollide(obstacle) && this.canBeHit) {
        this.lives--;

        this.liveTag.textContent = this.lives;
        this.canBeHit = false;
        setTimeout(() => {
          this.canBeHit = true;
        }, 3000);
      }
    }

    const obstaclesToRemove = this.obstacles.filter(
      (obstacle) => obstacle.top > this.height
    );
    obstaclesToRemove.forEach((obstacle) => obstacle.element.remove());
    this.obstacles = this.obstacles.filter(
      (obstacle) => obstacle.top <= this.height
    );

    if (this.lives <= 0) {
      this.gameIsOver = true;
      cancelAnimationFrame(this.animationId);
      const animations = this.gameScreen.getAnimations();
      animations[0].pause();
    }

    for (const key in this.pressedKeys) {
      if (this.pressedKeys[key]) {
        this.player.move(key);
      }
    }
    this.player.updatePosition();
  }
}

export default Game;
