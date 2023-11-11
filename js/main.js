"use strict";

//Classes
let selectBox = new selectionBox();
let spawner = new spawnManager();
let minionMovement = new minionController();
let enemyManager = new enemyController();
let waveManager = new waveControls();

//Groups
let resourceGroup;
let resourceImage = [];

//UI variables
let menuOpen = false;
let smallMinerBut, bigMinerBut, smallAttackerBut, bigAttackerBut;

let wavesOn = false;

let enemyCountDown = 30;
let enemySpawnDelay = enemyCountDown;


function preload(){
    spawner.preload();
    enemyManager.preload();

    preloadResourceImages();
}

function preloadResourceImages(){
    resourceImage.push("./assets/img/sunken_ship1.png");
    resourceImage.push("./assets/img/sunken_ship2.png");
    resourceImage.push("./assets/img/sunken_ship3.png");
    resourceImage.push("./assets/img/sunken_ship4.png");
    resourceImage.push("./assets/img/sunken_ship5.png");
    resourceImage.push("./assets/img/sunken_ship6.png");
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

    menuInteractions();

    if(kb.presses("p")){
        wavesOn = !wavesOn;
    }

    if (kb.presses("m")){
        menuOpen = !menuOpen;
    }

    if(wavesOn){
        waveManager.draw();
    }
}

function respawnResources(){
    if(resourceGroup.length < 20){
        let newResource = new Sprite();
        newResource.img = random(resourceImage);
        newResource.scale = 0.06;
        newResource.d = 30;
        let gap = newResource.d/2;
        newResource.x = random(gap, width - gap);
        newResource.y = random(60, height - gap);
        //newResource.color = "green";
        newResource.collider = "s";
        //newResource.debug = true;

        //sets gold desposits value
        newResource.value = round(random(100, 1000));

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
    smallMinerBut =     new Button(100, 850, 200, 200, "$50 - Small Miner",       "red", "green", 20, 0);
    bigMinerBut =       new Button(350, 850, 200, 200, "$200 - Big Miner",         "red", "green", 20, 1);
    smallAttackerBut =  new Button(600, 850, 200, 200, "$75 - Small Attacker",    "red", "green", 20, 2);
    bigAttackerBut =    new Button(850, 850, 200, 200, "$200 - Big Attacker",      "red", "green", 20, 3);
}

function menuInteractions(){
    if(menuOpen){
        smallMinerBut.hover();
        smallMinerBut.clicked();
    
        bigMinerBut.hover();
        bigMinerBut.clicked();
    
        smallAttackerBut.hover();
        smallAttackerBut.clicked();
        
        bigAttackerBut.hover();
        bigAttackerBut.clicked();
    }
}

function uiDraw(){
    //toggle info
    push();
    textAlign(LEFT, TOP);
    stroke(0);
    textSize(20);
    text("'M' to toggle menu", 10, 10);
    text("'P' to toggle background", 10, 35);
    pop();
    
    
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
        stroke(0);
        fill("white");
        textAlign(CENTER, CENTER);
        text("GAME OVER", width/2, height/2);
        pop();
    }

    if(enemyManager.canSpawn == false){
        push();
        textSize(50);
        textAlign(CENTER, CENTER);
        text("Enemies will spawn in: " + enemyCountDown, width/2, height/4);

        if(frameCount % 60 == 0){
            enemyCountDown--;
        }
    }
}