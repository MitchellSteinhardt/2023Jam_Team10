class spawnManager {
    constructor(){
        this.mothership;
        this.minionsJSON;
        this.minionsArray = [];
    }

    preload(){
        //sets variable for minions.json
        this.minionsJSON = loadJSON("./assets/minions.json");
    }

    setup(){
        //creates mothership sprite, will be changed eventually, just a placeholder for variables
        this.mothership = new Sprite(width/2, height/2, 30);
        this.mothership.drag = 10;
        this.mothership.colour = "purple";
        this.mothership.collider = "s";

        //adds minions from minions.json to an array
        this.minionsArray.push(this.minionsJSON.smallMiner);
        this.minionsArray.push(this.minionsJSON.bigMiner);
        this.minionsArray.push(this.minionsJSON.smallAttacker);
        this.minionsArray.push(this.minionsJSON.bigAttacker);
    }

    draw(){

    }

    requestSpawn(minionNumber){
        //sets variable for requested minion
        let currentRequest = this.minionsArray[minionNumber];
        console.log("Requeted Summon: " + currentRequest.name);

        //checks if theres enough gold for the minions
        if(minionMovement.resources >= currentRequest.cost){
            console.log("Request accepted");
            //checks what type of minion is being requeted
            //as different minion types need different variables
            if(currentRequest.type === "miner"){
                //reduces gold by minion cost
                minionMovement.resources-=currentRequest.cost;
                //spawns minion
                this.spawnMiner(minionNumber);
            }else if(currentRequest.type === "attacker"){
                console.log("wow violent");
            }
        }else{
            console.log("HA POOR");
        }
    }

    spawnMiner(num){
        //sets a random position around mothership to spawn
        let ranX = random(-this.mothership.d/2, this.mothership.d/2);
        let ranY = random(-this.mothership.d/2, this.mothership.d/2);
        //creates new miner sprite
        let newMiner = new Sprite(this.mothership.x+ranX, this.mothership.y+ranY);
        newMiner.drag = 10;
        newMiner.color = "blue";
        
        //sets variables from json file
        newMiner.d = this.minionsArray[num].dim;
        newMiner.countDown = this.minionsArray[num].mineDelay;
        newMiner.mineSpeed = this.minionsArray[num].mineSpeed;

        //these could probably just be left as null and removed from json file
        newMiner.locationX = this.minionsArray[num].locationX;
        newMiner.locationY = this.minionsArray[num].locationY;
        newMiner.mineTarget = this.minionsArray[num].mineTarget;
        
        //adds new minion to the minion group in 'minionControls.js'
        minionMovement.minionGroup.push(newMiner);
    }

    spawnAttacker(){

    }

}