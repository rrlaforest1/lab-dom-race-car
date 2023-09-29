class Car {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.gameScreenBounding = this.gameScreen.getBoundingClientRect();
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.direction = {
      x: 0,
      y: 0,
    };
    this.speed = 4;
    this.init(imgSrc);
  }

  init(src) {
    this.element = document.createElement("img");
    this.element.src = src;
    this.element.style.position = "absolute";
    this.gameScreen.append(this.element);

    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
  }

  move(direction) {
    const carBounding = this.element.getBoundingClientRect();

    switch (direction) {
      case "up":
        this.top -= this.speed;
        this.top = this.top < 20 ? 20 : this.top;
        break;
      case "down":
        this.top += this.speed;
        const carBottom = this.top + this.height;
        this.top =
          carBottom > this.gameScreenBounding.height - 20
            ? this.gameScreenBounding.height - this.height - 20
            : this.top;
        break;
      case "left":
        this.left -= this.speed;
        this.left = this.left < 70 ? 70 : this.left;
        break;
      case "right":
        this.left += this.speed;
        const carRight = this.left + this.width;
        this.left =
          carRight > this.gameScreenBounding.width - 70
            ? this.gameScreenBounding.width - this.width - 70
            : this.left;
        break;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = this.top + "px";
    this.element.style.left = this.left + "px";
  }

  didCollide(obstacle) {
    const carBounding = this.element.getBoundingClientRect();
    const obsBounding = obstacle.element.getBoundingClientRect();

    const isInX =
      obsBounding.right > carBounding.left &&
      obsBounding.left < carBounding.right;
    const isInY =
      obsBounding.bottom > carBounding.top &&
      obsBounding.top < carBounding.bottom;

    return isInX && isInY;
  }
}
export default Car;
