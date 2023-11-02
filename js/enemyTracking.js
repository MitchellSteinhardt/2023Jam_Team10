class ShipFactory {
  constructor() {
    this.mainShip = null;
    this.enemyShips = [];
    this.frameCounter = 0;
  }

  setup() {
    createCanvas(800, 600);
    this.mainShip = new Ship(30, color(0, 0, 255));
  }

  draw() {
    background(220);

    this.mainShip.x = mouseX;
    this.mainShip.y = mouseY;

    fill(this.mainShip.col);
    ellipse(this.mainShip.x, this.mainShip.y, this.mainShip.size, this.mainShip.size);

    for (let i = this.enemyShips.length - 1; i >= 0; i--) {
      this.enemyShips[i].update();

      fill(this.enemyShips[i].col);
      ellipse(this.enemyShips[i].x, this.enemyShips[i].y, this.enemyShips[i].size, this.enemyShips[i].size);

      if (this.mainShip.collides(this.enemyShips[i])) {
        console.log("Ship Removed"); //confirm ships collided and remove from array
        this.enemyShips.splice(i, 1);
      }
    }

    this.frameCounter++;

    //frequency of spawning ships
    if (this.frameCounter % 60 === 0) {
      let enemySize = random(20, 40);
      let enemySpeed = random(0.5, 1.5);
      let enemyHealth = int(random(1, 5));
      let spawnX = random([-enemySize, width]);
      let spawnY = random([-enemySize, height + enemySize]);
      let enemy = new EnemyShip(spawnX, spawnY, enemySize, color(255, 0, 0), enemySpeed, enemyHealth);
      this.enemyShips.push(enemy);
    }
  }
}

class Ship {
  constructor(size, col) {
    this.size = size;
    this.col = col;
    this.x = width / 2;
    this.y = height / 2;
  }

  collides(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < (this.size / 2 + other.size / 2);
  }
}

class EnemyShip extends Ship {
  constructor(x, y, size, col, speed) {
    super(size, col);
    this.speed = speed;
    this.x = x;
    this.y = y;
  }

  //nicer ship tracking (but doesnt work for some reason)
  // update() {
  //   this.moveTowards(shipFactory.mainShip.x, shipFactory.mainShip.y, this.speed);
  // }

  //yuck tracking version
  update() {
    let targetX = shipFactory.mainShip.x;
    let targetY = shipFactory.mainShip.y;
    let dirX = targetX - this.x;
    let dirY = targetY - this.y;
    let dist = sqrt(dirX * dirX + dirY * dirY);
    let trackingX = dirX / dist;
    let trackingY = dirY / dist;
    this.x += trackingX * this.speed;
    this.y += trackingY * this.speed;
  }
}

let shipFactory;

function setup() {
  shipFactory = new ShipFactory();
  shipFactory.setup();
}

function draw() {
  shipFactory.draw();
}
