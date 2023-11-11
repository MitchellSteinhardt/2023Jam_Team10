"use strict";

//Classes
let selectBox = new selectionBox();
let spawner = new spawnManager();
let minionMovement = new minionController();
let enemyManager = new enemyController();
let waveManager = new waveControls();

//Groups
 let resourceGroup;
 let newResource;

//UI variables
let menuOpen = false;
let smallMinerBut, bigMinerBut, smallAttackerBut, bigAttackerBut;

let wavesOn = false;


function preload(){
    spawner.preload();
    enemyManager.preload();
}

function setup(){
    new Canvas(1920, 1080);   //Actual Size
    //new Canvas(800, 800);   //Testing

    //declaring groups
    resourceGroup = new Group();
    
    //classes setup
    spawner.setup();
    minionMovement.setup(resourceGroup);
    enemyManager.setup();
    
    uiSetup();
    waveManager.setup();

}

function draw(){
    //background(200);    //default
    background(16,103,114); //water

    //creates gold desposits
    respawnResources();

    summonControls();

    //draws green selection box
    selectBox.draw();
    
    //controls minion movement
    minionMovement.draw();
    //displays gold UI
    minionMovement.displayUI();

    //manages enemies
    enemyManager.draw();

    uiDraw();

    if(kb.presses("p")){
        wavesOn = !wavesOn;
    }

    if(wavesOn){
        waveManager.draw();
    }
}

function respawnResources(){
    if(resourceGroup.length < 20){
        let newResource = new Sprite();
        newResource.d = 30;
        let gap = newResource.d/2;
        newResource.x = random(gap, width - gap);
        newResource.y = random(60, height - gap);
        //newResource.color = "green";
        newResource.img = sunkenShipArray[i];
        newResource.scale = 0.1;
        newResource.collider = "k";
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


//Should put this is its own class, inside 'UI.js'
function uiSetup(){
    // Creating Temp Buttons
    //(x, y, w, h, label, c1, c2, textSize, minNum)
    smallMinerBut =     new Button(100, 850, 200, 200, "Small Miner",       "red", "green", 20, 0);
    bigMinerBut =       new Button(350, 850, 200, 200, "Big Miner",         "red", "green", 20, 1);
    smallAttackerBut =  new Button(600, 850, 200, 200, "Small Attacker",    "red", "green", 20, 2);
    bigAttackerBut =    new Button(850, 850, 200, 200, "Big Attacker",      "red", "green", 20, 3);
}

function uiDraw(){  
    smallMinerBut.hover();
    smallMinerBut.clicked();

    bigMinerBut.hover();
    bigMinerBut.clicked();

    smallAttackerBut.hover();
    smallAttackerBut.clicked();
    
    bigAttackerBut.hover();
    bigAttackerBut.clicked();


    if (kb.presses("m")){
        menuOpen = !menuOpen;
    }
    
    
    if(menuOpen){
        push();
        fill("Chocolate");
        rect(0, height - 250, 1920, 250);
        smallMinerBut.display();
        bigMinerBut.display();
        smallAttackerBut.display();
        bigAttackerBut.display();
        pop();
    }

    if(minionMovement.gameOver){
        push();
        textSize(150);
        fill("white");
        textAlign(CENTER, CENTER);
        text("GAME OVER", width/2, height/2);
        pop();
    }
}