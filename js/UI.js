class Button {
    constructor(x, y, w, h, label, c1, c2, textSize) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.label = label;
      this.color = c1;
      this.hoverColor = c2;
      this.textColor = 255;
      this.textSize = textSize;
      this.isHovered = false;
      this.isClicked = false;
    }
  
    display() {
      if (this.isHovered) {
        fill(this.hoverColor);
      } else {
        fill(this.color);
      }
      rect(this.x, this.y, this.w, this.h);
  
      fill(this.textColor);
      textSize(this.textSize);
      textAlign(CENTER, CENTER);
      text(this.label, this.x + this.w / 2, this.y + this.h / 2);
    }
  
    hover() {
      if (
        mouseX > this.x &&
        mouseX < this.x + this.w &&
        mouseY > this.y &&
        mouseY < this.y + this.h
      ) {
        this.isHovered = true;
      } else {
        this.isHovered = false;
      }
    }
  
    clicked() {
      if (this.isHovered && mouse.pressed()) {
        this.isClicked = true;
      } else {
        this.isClicked = false;
      }
    }
  }


let menuOpen = true;

function setup(){
    new Canvas(1920,1080);

    // Creating Temp Buttons
    smallBoatButton = new Button(100, 850, 200, 200, "Small Boat", "red", "green", 20);
    mediumBoatButton = new Button(350, 850, 200, 200, "Medium Boat", "red", "green", 20);
    bigBoatButton = new Button(600, 850, 200, 200, "Big Boat", "red", "green", 20);
}


function draw(){
    background("grey");

    smallBoatButton.hover();
    smallBoatButton.clicked();

    mediumBoatButton.hover();
    mediumBoatButton.clicked();

    bigBoatButton.hover();
    bigBoatButton.clicked();
    


    if (kb.presses("m")){
        menuOpen = !menuOpen;
    }
    
    
    if(menuOpen){
        fill("Chocolate");
        rect(0, height - 250, 1920, 250);
        smallBoatButton.display();
        mediumBoatButton.display();
        bigBoatButton.display();
    }

    

}



