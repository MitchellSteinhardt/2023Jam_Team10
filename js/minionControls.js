class minionController{
    constructor(){
        this.minionGroup;
        this.resourceGroup;
        this.resources = 1000;

        this.enemyGroup;
    }

    preload(){

    }

    setup(rGroup){
        this.resourceGroup = rGroup;
        this.minionGroup = new Group();
        this.enemyGroup = new Group();


        this.createEnemy();
    }

    draw(){
        this.selectCheck();
        this.movement();


        //debugging
        textSize(15);
        for(let i=0; i<this.enemyGroup.length; i++){
            let x = this.enemyGroup[i].x;
            let y = this.enemyGroup[i].y - 25;
            text(i, x, y);
        }

        if(kb.presses("g")){
            this.enemyGroup[0].remove();
        }
    }

    selectCheck(){
        //loops through all minions
        for(let i=0; i<this.minionGroup.length; i++){
            let minion = this.minionGroup[i];
            //checks if minions are selected and when the right mouse button is clicked
            if(mouse.presses("right") && minion.selected == true){
                //checks what type the minion is based on avalible variables
                if(minion.mineSpeed != null){ //doesnt work bc there is no type attached to them
                    console.log("resource move");
                    minion.mineTarget = null;

                    //loops through all resources to see if any were clicked on
                    for(let k=0; k<this.resourceGroup.length; k++){
                        if(this.resourceGroup[k].mouse.presses("right")){
                            //console.log("resource selected");
                            minion.mineTarget = this.resourceGroup[k];
                        }
                    }

                    minion.locationX = mouseX;
                    minion.locationY = mouseY;
                }else if(minion.attackDamage != null){
                    console.log("attack move");
                    minion.attackTarget = null;

                    //loops through all enemies to see if any were clicked on
                    for(let k=0; k<this.enemyGroup.length; k++){
                        if(this.enemyGroup[k].mouse.presses("right")){
                            //console.log("enemy selected");
                            minion.attackTarget = this.enemyGroup[k];
                            minion.lookingForEnemy = false;
                        }
                    }

                    minion.locationX = mouseX;
                    minion.locationY = mouseY;
                }
            }
        }
    }

    movement(){
        //continues moving items to designated location
        for(let i=0; i<this.minionGroup.length; i++){
            let currentItem = this.minionGroup[i];

            if(currentItem.mineTarget != null){         //checks if there is a target to mine
                //gets distance from mine target
                let distance = dist(currentItem.x, currentItem.y, currentItem.mineTarget.x, currentItem.mineTarget.y);
                //if close enough to mine target allow mining
                if(distance > currentItem.mineTarget.d+10){
                    currentItem.moveTowards(currentItem.mineTarget.x, currentItem.mineTarget.y, 0.05);
                }else{
                    //console.log("arrived at resource");
                    this.mineResources(currentItem);
                }

            }else if(currentItem.attackTarget != null){ //checks if there is a target to attack
                //gets distance from attack target
                let distance = dist(currentItem.x, currentItem.y, currentItem.attackTarget.x, currentItem.attackTarget.y);
                //if close enough to attack target allow mining
                if(distance > currentItem.attackTarget.d+50){
                    currentItem.moveTowards(currentItem.attackTarget.x, currentItem.attackTarget.y, 0.05);
                }else{
                    //console.log("attack");
                    this.attackEnemy(currentItem);
                }

            }else if(currentItem.locationX != null){    //checks if there is a location set to move to
                //ensures they don't have to get to location to prevent overlapping
                let distance = dist(currentItem.x, currentItem.y, currentItem.locationX, currentItem.locationY);
                if(distance > 30){
                    currentItem.moveTowards(currentItem.locationX, currentItem.locationY, 0.05);
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
            currentItem.countDown = currentItem.mineDelay;
        }
    
        if(currentItem.mineTarget.value <= 0){
            currentItem.mineTarget.remove();
        }
        currentItem.countDown--;
    }

    attackEnemy(){
        console.log("HA TAKE THAT");
    }

    attackTarget(currentItem){
        console.log("Attacking: ");
    }



    
    //just putting this here as a holder, should put it in its own UI class
    displayUI(){
        //gold count at top
        fill("black");
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Gold: " + this.resources, width/2, 30);
    
        //values over resource piles
        textSize(15);
        for(let i=0; i<this.resourceGroup.length; i++){
            let x = this.resourceGroup[i].x;
            let y = this.resourceGroup[i].y - 25;
            text(this.resourceGroup[i].value, x, y);
        }
    }

    createEnemy(){
        for(let i=0; i<5; i++){
            let newEnemy = new Sprite();
            newEnemy.x = random(0, width);
            newEnemy.y = random(0, height);
            newEnemy.d = 20;
            newEnemy.collider = "s";
            newEnemy.color = "black";
            newEnemy.health = 100;
            
            this.enemyGroup.push(newEnemy);
        }
    }

}


/* DUMP

//checks if there is any location set to move to
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




*/