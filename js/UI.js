class Button {
    constructor(x, y, w, h, label, c1, c2, textSize, minNum) {
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
      this.minionNum = minNum;
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
        //this.isClicked = true;
        spawner.requestSpawn(this.minionNum);
        //spawner.requestSpawn(0);
      } else {
        //this.isClicked = false;
      }
    }
}



