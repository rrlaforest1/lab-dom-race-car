class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    const maxLeft = parseInt(this.gameScreen.style.width) - 100;
    this.left = Math.floor(Math.random() * maxLeft); //TODO; random
    this.top = -150;
    this.width = 100;
    this.height = 150;
    this.element = new Image(this.width, this.height); // creating an image with another method
    this.element.src = "./images/redCar.png";
    this.element.style.position = "absolute";
    this.gameScreen.append(this.element);
  }

  move() {
    this.top += 2.3;
  }

  updatePosition() {
    this.element.style.left = this.left + "px";
    this.element.style.top = this.top + "px";
  }
}
export default Obstacle;
