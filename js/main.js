"use strict";

//Classes
let selectBox = new selectionBox();
let spawner = new spawnManager();
let minionMovement = new minionController();
//let shops = new Shops;    //This is removed as 'spawnManager' handles purchases

//Groups
let resourceGroup;

function preload(){
    spawner.preload();
}

function setup(){
    new Canvas(1920, 1080);   //Actual Size
    //new Canvas(800, 800);   //Testing

    //declaring groups
    resourceGroup = new Group();
    
    //classes setup
    spawner.setup();
    minionMovement.setup(resourceGroup);
    //shops.setup();
    
    //creates gold desposits
    createResources();
}

function draw(){
    background(200);

    summonControls();

    //draws green selection box
    selectBox.draw();
    
    //controls minion movement
    minionMovement.draw();
    //displays gold UI
    minionMovement.displayUI();

    //shops.draw();
}

function createResources(){
    for(let i = 0; i<6; i++){
        let newResource = new Sprite();
        newResource.d = 30;
        let gap = newResource.d/2;
        newResource.x = random(gap, width - gap);
        newResource.y = random(60, height - gap);
        newResource.color = "green";
        newResource.collider = "s";

        //sets gold desposits value
        newResource.value = 500;

        resourceGroup.push(newResource);
    }
}

function summonControls(){
    if(kb.presses("1")){
        spawner.requestSpawn(0);
    }else if(kb.presses("2")){
        spawner.requestSpawn(1);
    }else if(kb.presses("3")){
        spawner.requestSpawn(2);
    }else if(kb.presses("4")){
        spawner.requestSpawn(3);
    }
}