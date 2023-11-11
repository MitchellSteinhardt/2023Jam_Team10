class minionController{
    constructor(){
        this.minionGroup;
        this.goodBulletGroup;
        this.resourceGroup;
        this.resources = 100;
        this.gameOver = false;
    }

    preload(){

    }

    setup(rGroup){
        this.resourceGroup = rGroup;
        this.minionGroup = new Group();
        this.goodBulletGroup = new Group();
    }

    draw(){
        this.selectCheck();
        this.movement();

        for(let i=0; i<this.minionGroup.length; i++){
            if(frameCount % 60 == 0){
                //checks if minion has been hit and if they should be dead
                this.findStuff(this.minionGroup[i]);
            }

            this.hitCheck(this.minionGroup[i]);
            this.deathCheck(this.minionGroup[i]);
        }

        this.hitCheck(spawner.mothership);
        this.deathCheck(spawner.mothership);
    }

    selectCheck(){
        //loops through all minions
        for(let i=0; i<this.minionGroup.length; i++){
            let minion = this.minionGroup[i];
            //checks if minions are selected and when the right mouse button is clicked
            if(mouse.presses("right") && minion.selected == true){
                //checks what type the minion is based on avalible variables
                if(minion.mineSpeed != null){
                    //console.log("resource move");
                    minion.mineTarget = null;
                    minion.lookingForResources = true;

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
                    //console.log("attack move");
                    minion.attackTarget = null;
                    minion.lookingForEnemy = true;

                    //loops through all enemies to see if any were clicked on
                    for(let k=0; k<enemyManager.enemyGroup.length; k++){
                        if(enemyManager.enemyGroup[k].mouse.presses("right")){
                            //console.log("enemy selected");
                            minion.attackTarget = enemyManager.enemyGroup[k];
                            minion.lookingForEnemy = false;
                        }
                    }

                    minion.locationX = mouseX;
                    minion.locationY = mouseY;
                }
            }

            if(minion.selected == true){
                //shows selection
                push();
                noFill();
                circle(minion.x, minion.y, minion.d*2);
                pop();
            }
        }
    }

    movement(){
        //continues moving items to designated location
        for(let i=0; i<this.minionGroup.length; i++){
            let currentItem = this.minionGroup[i];

            currentItem.rotation = currentItem.direction+90;

            if(currentItem.mineTarget != null){         //checks if there is a target to mine
                //gets distance from mine target
                let distance = dist(currentItem.x, currentItem.y, currentItem.mineTarget.x, currentItem.mineTarget.y);
                //if close enough to mine target allow mining
                if(distance > currentItem.mineTarget.d+10){
                    currentItem.moveTo(currentItem.mineTarget.x, currentItem.mineTarget.y, currentItem.speedTwoElectricBoogalo);
                }else{
                    //console.log("arrived at resource");
                    this.mineResources(currentItem);
                }

            }else if(currentItem.attackTarget != null){ //checks if there is a target to attack
                //gets distance from attack target
                let distance = dist(currentItem.x, currentItem.y, currentItem.attackTarget.x, currentItem.attackTarget.y);
                //if close enough to attack target allow mining
                if(distance > currentItem.attackTarget.d+50){
                    currentItem.moveTo(currentItem.attackTarget.x, currentItem.attackTarget.y, currentItem.speedTwoElectricBoogalo);
                }else{
                    //console.log("attack");
                    this.attackEnemy(currentItem, this.goodBulletGroup);
                }

            }else if(currentItem.locationX != null){    //checks if there is a location set to move to
                //ensures they don't have to get to location to prevent overlapping
                let distance = dist(currentItem.x, currentItem.y, currentItem.locationX, currentItem.locationY);
                if(distance > 30){
                    currentItem.moveTo(currentItem.locationX, currentItem.locationY, currentItem.speedTwoElectricBoogalo);
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
            currentItem.lookingForResources = true;
            currentItem.mineTarget.remove();
        }
        currentItem.countDown--;
    }

    attackEnemy(currentItem, goToGroup, overrideTarget){
        if(currentItem.countDown <= 0){
            //attack code
            //console.log("BANG BANG");

            let newBullet = new Sprite(currentItem.x, currentItem.y);
            newBullet.d = 7;
            newBullet.color = "pink";
            newBullet.layer = 1;
            newBullet.damage = currentItem.attackDamage;
            newBullet.life = 300;

            let fireHere;
            if(overrideTarget != null){
                fireHere = overrideTarget;
            }else{
                fireHere = currentItem.attackTarget;
            }
            newBullet.direction = newBullet.angleTo(fireHere);
            newBullet.speed = 2;


            //selection box breaks when setting overlaps allSprites
            newBullet.overlaps(this.minionGroup);
            newBullet.overlaps(this.goodBulletGroup);
            newBullet.overlaps(this.resourceGroup);
            newBullet.overlaps(enemyManager.enemyGroup);
            newBullet.overlaps(enemyManager.badBulletGroup);
            newBullet.overlaps(spawner.mothership);

            goToGroup.push(newBullet);

            currentItem.countDown = currentItem.attackDelay;
        }else{
            currentItem.countDown--;
        }
    }

    findStuff(minion){
        if(minion.lookingForEnemy === true){
            for(let i=0; i<enemyManager.enemyGroup.length; i++){
                let enemy = enemyManager.enemyGroup[i];
                let distToMinion = dist(minion.x, minion.y, enemy.x, enemy.y);

                if(distToMinion < 80){
                    //console.log("attacking attacker");
                    minion.attackTarget = enemy;
                    minion.lookingForEnemy = false;
                }
            }
        }
        if(minion.lookingForResources === true){
            for(let i=0; i<this.resourceGroup.length; i++){
                let resource = this.resourceGroup[i];
                let distToResource = dist(minion.x, minion.y, resource.x, resource.y);

                if(distToResource < 80){
                    //console.log("attacking attacker");
                    minion.mineTarget = resource;
                    minion.lookingForResources = false;
                }
            }
        }
    }

    
    /*
    *   Hit and death
    */

    //checks if any of the enemy bullets hit any minion
    hitCheck(minion){
        for(let i = 0; i<enemyManager.badBulletGroup.length; i++){
            if(enemyManager.badBulletGroup[i].overlaps(minion)){
                minion.health -= enemyManager.badBulletGroup[i].damage;
                enemyManager.badBulletGroup[i].remove();
            }
        }
    }

    //checks if enemy still has health, if not kills them and resets all attackers with them as a target
    deathCheck(minion){
        if(minion.health <= 0){
            for(let k=0; k<enemyManager.enemyGroup.length; k++){
                if(enemyManager.enemyGroup[k].attackTarget === minion){
                    enemyManager.enemyGroup[k].attackTarget = null;
                    enemyManager.enemyGroup[k].lookingForMinion = true;
                }
            }
            this.explosion(minion);
            minion.remove();

            if(minion === spawner.mothership){
                this.gameOver = true;
            }
        }
    }

    //creates a cosmetic explosion
    explosion(location){
        let explosion = new Sprite(location.x, location.y, 30);
        explosion.color = "red";
        explosion.life = 60;
        explosion.collider = "n";
    }


    
    //just putting this here as a holder, should put it in its own UI class
    displayUI(){
        //gold count at top
        fill("black");
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Gold: " + this.resources, width/2, 30);
    
        //this.displayResourceValues(); //debugging
    }

    displayResourceValues(){
        //values over resource piles
        textSize(15);
        for(let i=0; i<this.resourceGroup.length; i++){
            let x = this.resourceGroup[i].x;
            let y = this.resourceGroup[i].y - 25;
            text(this.resourceGroup[i].value, x, y);
        }
    }
}