class enemyController {
    constructor(){
        this.canSpawn = false;
        this.maxEnemies = 5;
        this.enemyGroup;
        this.enemyJSON;
        this.enemyArray = [];
        this.enemyImage = [];
        this.badBulletGroup;
    }

    preload(){
        this.enemyJSON = loadJSON("./assets/enemies.json");
    }

    setup(){
        this.enemyGroup = new Group();
        this.badBulletGroup = new Group();

        //adds minions from minions.json to an array
        this.enemyArray.push(this.enemyJSON.rowboat);
        this.enemyArray.push(this.enemyJSON.sloop);
        this.enemyArray.push(this.enemyJSON.brigantine);
        this.enemyArray.push(this.enemyJSON.galleon);


        this.enemyImage.push(loadImage("./assets/img/redsmallminer.png"));
        this.enemyImage.push(loadImage("./assets/img/redbigminer.png"));
        this.enemyImage.push(loadImage("./assets/img/redsmallattacker.png"));
        this.enemyImage.push(loadImage("./assets/img/redbigattacker.png"));
    }

    draw(){
        if(minionMovement.gameOver === false){
            //this.enemyNumberUI(); //debugging
            this.keyCheck();    //replace eventually with spawning mechanics
    
            //runs spawn logic and spawn controller
            this.spawnLogic();
    
            
            for(let i=0; i<this.enemyGroup.length; i++){
                //movement and attack logic
                this.findMinion(this.enemyGroup[i]);
                this.movementAndAttack(this.enemyGroup[i]);
    
                //checks if enemy has been hit and if they should be dead
                this.hitCheck(this.enemyGroup[i]);
                this.deathCheck(this.enemyGroup[i]);
            }
        }
    }

    /*
    *   Spawn and death logic and controls
    */

    spawnLogic(){
        //prevents spawning for first 30 seconds of the game
        if(frameCount % (60*enemySpawnDelay) == 0 && !this.canSpawn){
            console.log("enemies ready");
            this.canSpawn = true;
        }

        //increases the max amount of enemies on the screen every 10 seconds
        if(frameCount % (60*20) == 0 && this.canSpawn){
            this.maxEnemies += 5;
            console.log(this.maxEnemies);
        }

        //runs spawn function
        if(this.canSpawn){
            this.spawnController();
        }
    }

    spawnController(){
        if(frameCount % (60*30) == 0){
            console.log("enemies spawning");
            while(this.enemyGroup.length < this.maxEnemies){
                //decides what ship to spawn via % chance
                let spawnThis;
                let spawnChoice = random(100);
                if(spawnChoice < 5){    //5%
                    console.log("galleon");
                    spawnThis = 3;
                }else if(spawnChoice < 25){ //20%
                    console.log("brig");
                    spawnThis = 2;
                }else if(spawnChoice < 50){ //25%
                    console.log("sloop");
                    spawnThis = 1
                }else if(spawnChoice < 100){    //50%
                    console.log("rowboat");
                    spawnThis = 0;
                }
                this.createEnemy(spawnThis);
            }
        }
    }

    //creates enemy with the stats of given array value
    createEnemy(num){
        let newEnemy = new Sprite();
        let side = random(["top", "bottom", "left", "right"]);
        newEnemy.x = this.randomX(side);
        newEnemy.y = this.randomY(side);
        newEnemy.color = "black";
        newEnemy.health = 100;
        newEnemy.layer = 2;
        newEnemy.drag = 10;

        //sets image
        newEnemy.img = this.enemyImage[num];
        newEnemy.scale = 2*(this.enemyArray[num].dim/100);

        newEnemy.d = this.enemyArray[num].dim*2;
        newEnemy.name = this.enemyArray[num].name;
        newEnemy.speedTwoElectricBoogalo = abs(this.enemyArray[num].speed);
        newEnemy.health = this.enemyArray[num].health;
        newEnemy.attackDamage = this.enemyArray[num].attackDamage;
        newEnemy.attackDelay = this.enemyArray[num].attackDelay;
        newEnemy.attackTarget = null;
        newEnemy.lookingForMinion = true;
        //newEnemy.debug = true;

        newEnemy.countDown = newEnemy.attackDelay;
        
        this.enemyGroup.push(newEnemy);
    }

    //randomX and randomY will be improved to spawn on the border
    randomX(side){
        if(side === "top" || side === "bottom"){
            return random(-20, width+20);
        }else if(side === "left"){
            return -20;
        }else if(side === "right"){
            return width+20;
        }
    }

    randomY(side){
        if(side === "left" || side === "right"){
            return random(-20, height+20);
        }else if(side === "top"){
            return -20;
        }else if(side === "bottom"){
            return height+20;
        }
    }

    //checks if any of the players bullets hit any enemy
    hitCheck(enemy){
        for(let i = 0; i<minionMovement.goodBulletGroup.length; i++){
            if(minionMovement.goodBulletGroup[i].overlaps(enemy)){
                enemy.health -= minionMovement.goodBulletGroup[i].damage;
                minionMovement.goodBulletGroup[i].remove();
            }
        }
    }

    //checks if enemy still has health, if not kills them and resets all attackers with them as a target
    deathCheck(enemy){
        if(enemy.health <= 0){
            for(let k=0; k<minionMovement.minionGroup.length; k++){
                if(minionMovement.minionGroup[k].attackTarget === enemy){
                    minionMovement.minionGroup[k].attackTarget = null;
                    minionMovement.minionGroup[k].lookingForEnemy = true;
                }
            }
            this.explosion(enemy);
            enemy.remove();
        }
    }

    //creates a cosmetic explosion
    explosion(location){
        let explosion = new Sprite(location.x, location.y, 30);
        explosion.color = "red";
        explosion.life = 60;
        explosion.collider = "n";
    }

    /*
    *   Movement and attacking logic and controls
    */
    findMinion(enemy){
        if(enemy.lookingForMinion == true){
            for(let i=0; i<minionMovement.minionGroup.length; i++){
                let minion = minionMovement.minionGroup[i];
                let distToMinion = dist(enemy.x, enemy.y, minion.x, minion.y);

                if(distToMinion < 80){
                    if(minion.mineSpeed != null){
                        //console.log("attacking miner");
                        enemy.attackTarget = minion;
                    }else if(minion.attackDamage != null){
                        //console.log("attacking attacker");
                        enemy.attackTarget = minion;
                        enemy.lookingForMinion = false;
                    }
                }
            }

            if(enemy.attackTarget != null){
                enemy.lookingForMinion = false;
            }
        }

        if(enemy.attackTarget != null){
            let distToTarget = dist(enemy.x, enemy.y, enemy.attackTarget.x, enemy.attackTarget.y);
            if(distToTarget > 150){
                enemy.attackTarget = null;
                enemy.lookingForMinion = true;
            }
        }
    }

    movementAndAttack(enemy){
        enemy.rotation = enemy.direction + 90;
        
        if(enemy.attackTarget != null){
            //console.log("IMMA ATTACK");
            minionMovement.attackEnemy(enemy, this.badBulletGroup);
        }else{
            let distFromMotherShip = dist(enemy.x, enemy.y, spawner.mothership.x, spawner.mothership.y);
            if(distFromMotherShip > 80){
                enemy.moveTo(spawner.mothership.x, spawner.mothership.y, enemy.speedTwoElectricBoogalo);
            }else{
                minionMovement.attackEnemy(enemy, this.badBulletGroup, spawner.mothership);
            }
        }
    }


    //debugging purposes - used to display information of enemy above them
    enemyNumberUI(){
        //debugging
        textSize(15);
        for(let i=0; i<this.enemyGroup.length; i++){
            let x = this.enemyGroup[i].x;
            let y = this.enemyGroup[i].y - 25;
            text(this.enemyGroup[i].health, x, y);
        }

        if(kb.presses("g")){
            this.enemyGroup[0].remove();
        }
    }

    //debugging purposes - used to manually spawn enemies
    keyCheck(){
        if(kb.presses("7")){
            this.createEnemy(0);
        }else if(kb.presses("8")){
            this.createEnemy(1);
        }else if(kb.presses("9")){
            this.createEnemy(2);
        }else if(kb.presses("0")){
            this.createEnemy(3);
        }
    }
}