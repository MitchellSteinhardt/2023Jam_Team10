class selectionBox {
    constructor(itemGroup){
        this.items = itemGroup;
        this.selectBox;
        this.startedSelect = false;
        this.selectBoxX;
        this.selectBoxY;
    }

    preload(){

    }

    setup(){

    }

    /*
    *   Creates a selection box
    *   Controlled by clicking and dragging mouse
    *   Items stay selected once mouse is released
    */
    draw(it){
        this.items = it;
        //if the mouse is clicked starts selection box
        if(this.startedSelect == false && mouse.presses()){
            console.log("working");
            this.startedSelect = true;

            //initiates selection box
            this.selectBox = new Sprite();
            this.selectBox.x = mouseX;
            this.selectBox.y = mouseY;
            this.selectBox.color =  color(10, 240, 10, 50);

            this.selectBox.collider = "k";

            this.selectBox.overlaps(this.items);

            //sets inital clicked spot
            this.selectBoxX = mouseX;
            this.selectBoxY = mouseY;
        }

        if(this.startedSelect == true){
            //sets middle of selection box to be between start point and mouse
            this.selectBox.x = this.selectBoxX + (mouseX - this.selectBoxX)/2;
            this.selectBox.y = this.selectBoxY + (mouseY - this.selectBoxY)/2;

            //sets dimensions of box dependent on start point and mouse location
            let w = abs(mouseX - this.selectBoxX);
            if(w == 0){w=1};    //prevents box having no dimension causing an error
            let h = abs(mouseY - this.selectBoxY);
            if(h == 0){h=1};
            this.selectBox.w = w;
            this.selectBox.h = h;

            //checks if selection box is overlapping any selectible sprites
            this.selectionCheck();

            //resets if mouse is released
            if(mouse.released()){
                this.startedSelect = false;
                this.selectBox.remove();
            }
        }
    }

    selectionCheck(){
            //loops through all selectible items
        for(let i=0; i<this.items.length; i++){
            if(this.selectBox.overlapping(this.items[i])){
                this.items[i].selected = true;
                this.items[i].color = "red";
            }else{
                this.items[i].selected = false;
                this.items[i].colour = "blue";
            }
        }
    }
}