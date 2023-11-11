"use strict";

//Classes
let selectBox = new selectionBox();
let spawner = new spawnManager();
let minionMovement = new minionController();
let waveManager = new waveControls();
//let shops = new Shops;    //This is removed as 'spawnManager' handles purchases

//Groups
 let resourceGroup;
 let newResource;

//UI variables
let menuOpen = false;
let smallMinerBut, bigMinerBut, smallAttackerBut, bigAttackerBut;

let sunkenShip1;
let sunkenShip2;
let sunkenShip3;
let sunkenShip4;
let sunkenShip5;
let sunkenShip6;

function preload(){
    spawner.preload();
    sunkenShip1 = loadImage("assets/img/sunken_ship1.png")
    sunkenShip2 = loadImage("assets/img/sunken_ship2.png")
    sunkenShip3 = loadImage("assets/img/sunken_ship3.png")
    sunkenShip4 = loadImage("assets/img/sunken_ship4.png")
    sunkenShip5 = loadImage("assets/img/sunken_ship5.png")
    sunkenShip6 = loadImage("assets/img/sunken_ship6.png")
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

    uiSetup();
    waveManager.setup();

}

function draw(){
    //background(200);    //default
    background(16,103,114); //water
    
    summonControls();

    //draws green selection box
    selectBox.draw();
    
    //controls minion movement
    minionMovement.draw();
    //displays gold UI
    minionMovement.displayUI();

    //shops.draw();
    
    uiDraw();
    waveManager.draw();
    
    resourceGroup.debug = mouse.pressing();
    for(let i=0; i<resourceGroup.length ;i++){
        resourceGroup[i].vel.x= random(-2,2);
        resourceGroup[i].vel.y= random(-1,1);   
    }
}

function createResources(){
    let sunkenShipArray = [sunkenShip1, sunkenShip2, sunkenShip3,sunkenShip4, sunkenShip5, sunkenShip6]

    for(let i = 0; i<6; i++){
        newResource = new Sprite();
        newResource.w = 800;
        newResource.h = 400;
        let gap = newResource.w/8;
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
}