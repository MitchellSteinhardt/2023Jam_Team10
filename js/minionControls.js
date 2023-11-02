class minionController{
    constructor(){
        this.minionGroup;
        this.resourceGroup;
        this.resources = 100;
    }

    preload(){

    }

    setup(rGroup){
        this.resourceGroup = rGroup;
        this.minionGroup = new Group();
    }

    draw(){
            //when right mouse is clicked set the selected items location to mouse location
    if(mouse.presses("right")){
        for(let i=0; i<this.minionGroup.length; i++){
            if(this.minionGroup[i].selected == true){
                this.minionGroup[i].mineTarget = null;
                //console.log("move");
                this.minionGroup[i].locationX = mouseX;
                this.minionGroup[i].locationY = mouseY;

                for(let k=0; k<this.resourceGroup.length; k++){
                    if(this.resourceGroup[k].mouse.presses("right")){
                        //console.log("resource selected");
                        this.minionGroup[i].mineTarget = this.resourceGroup[k];
                    }
                }
            }
        }
    }

    //continues moving items to designated location
    for(let i=0; i<this.minionGroup.length; i++){
        let currentItem = this.minionGroup[i];

        if(currentItem.locationX != null){
            //checks if there is variable for the mine target
            if(currentItem.mineTarget != null){
                //gets distance from mine target
                let distance = dist(currentItem.x, currentItem.y, currentItem.mineTarget.x, currentItem.mineTarget.y);
                //if close enough to mine target allow mining
                if(distance > currentItem.mineTarget.d+10){
                    currentItem.moveTowards(currentItem.mineTarget.x, currentItem.mineTarget.y, 0.05);
                }else{
                    //console.log("arrived at resource");
                    this.mineResources(currentItem);
                }
            }else{
                //ensures they don't have to get to location to prevent overlapping
                let distance = dist(currentItem.x, currentItem.y, currentItem.locationX, currentItem.locationY);
                if(distance > 30){
                    currentItem.moveTowards(currentItem.locationX, currentItem.locationY, 0.05);
                }
            }
        }
    }
    }

    mineResources(currentItem){
        //let targetValue = currentItem.mineTarget.value;   //issue occured with this?
        if(currentItem.countDown <= 0){
            if(currentItem.mineTarget.value > currentItem.mineSpeed){
                this.resources+=currentItem.mineSpeed;
                currentItem.mineTarget.value-=currentItem.mineSpeed;
            }else if(currentItem.mineTarget.value > 0){
                this.resources+= currentItem.mineTarget.value;
                currentItem.mineTarget.value-=currentItem.mineTarget.value;
            }
            currentItem.countDown = 30;
        }
    
        if(currentItem.mineTarget.value <= 0){
            currentItem.mineTarget.remove();
        }
        currentItem.countDown--;
    }

    //just putting this here as a holder, should put it in its own UI class
    displayUI(){
        //gold count at top
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Gold: " + this.resources, width/2, 30);
    
        //values over resource piles
        textSize(10);
        for(let i=0; i<this.resourceGroup.length; i++){
            let x = this.resourceGroup[i].x;
            let y = this.resourceGroup[i].y - 20;
            text(this.resourceGroup[i].value, x, y);
        }
    }
}