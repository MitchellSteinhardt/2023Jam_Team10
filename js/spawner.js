class spawnManager {
    constructor(){
        this.mothership;
    }

    preload(){

    }

    setup(){
        this.mothership = new Sprite(width/2, height/2, 30);
        this.mothership.drag = 10;
        this.mothership.colour = "purple";
        this.mothership.collider = "s";

    }

    draw(){

    }

    spawnMiner(){
        let ranX = random(-this.mothership.d/2, this.mothership.d/2);
        let ranY = random(-this.mothership.d/2, this.mothership.d/2);
        let newMiner = new Sprite(this.mothership.x+ranX, this.mothership.y+ranY);
        newMiner.d = 10;
        newMiner.color = "blue";
        newMiner.drag = 10;
        
        newMiner.locationX = null;
        newMiner.locationY = null;
        newMiner.mineTarget = null;
        newMiner.countDown = 30;
        newMiner.mineSpeed = 5;
        
        return newMiner;
    }

    spawnAttacker(){

    }

}