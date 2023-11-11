
/* 
*   NO NEED TO KEEP
*   buttons will be handled by a UI class
*   spawning and purchase check is handled by 'spawner.js'
*/



class Shops {
  constructor() {
    this.missileOneButton;
    this.missileTwoButton;
    this.missileOneButton_X;
    this.missileOneButton_Y;
    this.missileTwoButton_X;
    this.missileTwoButton_Y;
    this.drawMissilesOne = 0; //---> this value(resources) can later be used for shooting missiles etc
    this.drawMissilesTwo = 0; //---> this value(resources) can later be used for shooting missiles etc
  }

  setup() {
    //Missile Buttons
    this.missileOneButton_X = width / 75;
    this.missileOneButton_Y = height / 75;
    this.missileTwoButton_X = this.missileOneButton_X;
    this.missileTwoButton_Y = height / 10;

    //Button One
    this.missileOneButton = createButton("Missile One");
    this.missileOneButton.position(this.missileOneButton_X, this.missileOneButton_Y);
    this.missileOneButton.mouseClicked(() => {
      if (minionMovement.resources >= 100) { //--->this is the cost of this resource
        minionMovement.resources -= 100; //--->this is the cost of this resource
        this.drawMissilesOne += 1;
      }
    });

    //Button Two
    this.missileTwoButton = createButton("Missile Two");
    this.missileTwoButton.position(this.missileTwoButton_X, this.missileTwoButton_Y);
    this.missileTwoButton.mouseClicked(() => {
      if (minionMovement.resources >= 500) { //--->this is the cost of this resource
        minionMovement.resources -= 500; //--->this is the cost of this resource
        this.drawMissilesTwo += 1;
      }
    });
  }

  draw() {
    //draw missiles one bars
    if (this.drawMissilesOne > 0) {
      for (let i = 0; i < this.drawMissilesOne; i++) {
        push();
        fill("yellow");
        rect(this.missileOneButton_X + 10 * i, this.missileOneButton_Y * 3, width / 80, height / 40);
        pop();
      }
    }
    //draw missiles two bars
    if (this.drawMissilesTwo > 0) {
      for (let i = 0; i < this.drawMissilesTwo; i++) {
        push();
        fill("red");
        rect(this.missileTwoButton_X + 10 * i, this.missileTwoButton_Y * 1.3, width / 80, height / 40);
        pop();
      }
    }
  }
}
