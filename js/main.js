"use strict";

//Classes
let selectBox;
let spawner;
let minionMovement;

//Groups
let resourceGroup;

function setup(){
    new Canvas(800,800);
    //declaring groups
    resourceGroup = new Group();
    
    //settings classes
    minionMovement = new minionController(resourceGroup);
    spawner = new spawnManager();
    selectBox = new selectionBox(minionMovement.itemsGroup);

    //classes setup
    minionMovement.setup();
    spawner.setup();

    //creates gold desposits
    createResources();
}

function draw(){
    background(200);

    //used to spawn new miners, will be replaced with button controls
    if(kb.presses("d")){
        minionMovement.itemsGroup.push(spawner.spawnMiner());
    }

    //draws green selection box
    selectBox.draw(minionMovement.itemsGroup);
    
    //controls minion movement
    minionMovement.draw();
    //displays gold UI
    minionMovement.displayUI();
}

function createResources(){
    for(let i = 0; i<6; i++){
        let newResource = new Sprite();
        newResource.d = 30;
        newResource.x = random(width);
        newResource.y = random(height);
        newResource.color = "green";
        newResource.collider = "s";

        //sets gold desposits value
        newResource.value = 500;

        resourceGroup.push(newResource);
    }
}