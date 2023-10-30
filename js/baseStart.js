"use strict";


//Selection Box Variables
let selectBox;
let startedSelect = false;
let selectBoxX, selectBoxY;

//Colours
let clearGreen;

//Random Values
let resources = 0;
let miningValue = 5;


//Groups
let itemsGroup;
let resourceGroup;

function setup(){
    new Canvas(800,800);
    itemsGroup = new Group();
    resourceGroup = new Group();

    clearGreen = color(10, 240, 10, 50);

    createItems();
    createResources();
}

function draw(){
    background(200);

    textSize(30);
    textAlign(CENTER, CENTER);
    text("Gold: " + resources, width/2, 30);

    displayResoruceValues();


    selectionBox();
    controlPoints();
}


/*
*   Creates a selection box
*   Controlled by clicking and dragging mouse
*   Items stay selected once mouse is released
*/
function selectionBox(){
    //if the mouse is clicked starts selection box
    if(startedSelect == false && mouse.presses()){
        console.log("working");
        startedSelect = true;

        //initiates selection box
        selectBox = new Sprite();
        selectBox.x = mouseX;
        selectBox.y = mouseY;
        selectBox.color = clearGreen;

        selectBox.overlaps(allSprites);

        //sets inital clicked spot
        selectBoxX = mouseX;
        selectBoxY = mouseY;
    }

    if(startedSelect == true){
        //sets middle of selection box to be between start point and mouse
        selectBox.x = selectBoxX + (mouseX - selectBoxX)/2;
        selectBox.y = selectBoxY + (mouseY - selectBoxY)/2;

        //sets dimensions of box dependent on start point and mouse location
        let w = abs(mouseX - selectBoxX);
        if(w == 0){w=1};    //prevents box having no dimension causing an error
        let h = abs(mouseY - selectBoxY);
        if(h == 0){h=1};
        selectBox.w = w;
        selectBox.h = h;

        //checks if selection box is overlapping any selectible sprites
        selectionCheck();

        //resets if mouse is released
        if(mouse.released()){
            startedSelect = false;
            selectBox.remove();
        }
    }   
}

function selectionCheck(){
    //loops through all selectible items
    for(let i=0; i<itemsGroup.length; i++){
        if(selectBox.overlapping(itemsGroup[i])){
            itemsGroup[i].selected = true;
            itemsGroup[i].color = "red";
        }else{
            itemsGroup[i].selected = false;
            itemsGroup[i].colour = "blue";
        }
    }
}

function controlPoints(){
    //when right mouse is clicked set the selected items location to mouse location
    if(mouse.presses("right")){
        for(let i=0; i<itemsGroup.length; i++){
            itemsGroup[i].mineTarget = null;
            if(itemsGroup[i].selected == true){
                //console.log("move");
                itemsGroup[i].locationX = mouseX;
                itemsGroup[i].locationY = mouseY;

                for(let k=0; k<resourceGroup.length; k++){
                    if(resourceGroup[k].mouse.presses("right")){
                        console.log("resource selected");
                        itemsGroup[i].mineTarget = resourceGroup[k];
                    }
                }
            }
        }
    }

    //continues moving items to designated location
    for(let i=0; i<itemsGroup.length; i++){
        let currentItem = itemsGroup[i];

        if(currentItem.locationX != null){
            //ensures they don't have to get to location to prevent overlapping
            let distance = dist(currentItem.x, currentItem.y, currentItem.locationX, currentItem.locationY);
            if(distance > 40){
                currentItem.moveTowards(currentItem.locationX, currentItem.locationY, 0.05);
            } 

            //checks if there is variable for the mine target
            if(currentItem.mineTarget != null){
                //gets distance from mine target
                distance = dist(currentItem.x, currentItem.y, currentItem.mineTarget.x, currentItem.mineTarget.y);
                //if close enough to mine target allow mining
                if(distance < 40){
                    console.log("arrived at resource");
                    //console.log(itemsGroup[i].mineTarget.value);
                    mineResources(currentItem);
                }
            }
        }
    }
}

//CURRENT ISSUE, CONTINUES MINING EVEN ONCE MOVED AWAY

function mineResources(currentItem){
    //let targetValue = currentItem.mineTarget.value;   //issue occured with this?
    if(currentItem.countDown <= 0){
        if(currentItem.mineTarget.value > miningValue){
            resources+=miningValue;
            currentItem.mineTarget.value-=miningValue;
        }else if(currentItem.mineTarget.value > 0){
            resources+= currentItem.mineTarget.value;
            currentItem.mineTarget.value-=currentItem.mineTarget.value;
        }
        currentItem.countDown = 30;
    }

    if(currentItem.mineTarget.value <= 0){
        currentItem.mineTarget.remove();
    }
    currentItem.countDown--;
}

function displayResoruceValues(){
    textSize(10);

    for(let i=0; i<resourceGroup.length; i++){
        let x = resourceGroup[i].x;
        let y = resourceGroup[i].y - 20;
        text(resourceGroup[i].value, x, y);
    }
}

function createItems(){
    for(let i = 0; i<30; i++){
        let newItem = new Sprite();
        newItem.d = 10;
        newItem.x = random(width);
        newItem.y = random(height);
        newItem.color = "blue";
        newItem.selected = false;
        newItem.locationX = null;
        newItem.locationY = null;

        newItem.drag = 10;

        newItem.mineTarget = null;
        newItem.countDown = 30;

        itemsGroup.push(newItem);
    }
}

function createResources(){
    for(let i = 0; i<6; i++){
        let newResource = new Sprite();
        newResource.d = 30;
        newResource.x = random(width);
        newResource.y = random(height);
        newResource.color = "green";
        newResource.collider = "s";

        newResource.value = 500;

        resourceGroup.push(newResource);
    }
}









/* DUMP
//~~~~~FROM V1
function drawSelectBox(){
    rectMode(CORNERS);
    rect(selectBoxX, selectBoxY, selectBoxXX, selectBoxYY);
}

if(startedSelect == false && mouse.presses()){
    console.log("working");
    selectBoxX = mouseX;
    selectBoxY = mouseY;
    startedSelect = true;
}
if(startedSelect == true){
    selectBoxXX = mouseX;
    selectBoxYY = mouseY;
    if(mouse.released()){
        startedSelect = false;
        selectBoxX = null;
        selectBoxY = null;
        selectBoxXX = null;
        selectBoxYY = null;
    }
}

drawSelectBox();


//~~~~~FROM V2
    for(let k=0; k<resourceGroup.length; k++){
        if(resourceGroup[k].mouse.presses("right")){
            for(let i=0; i<itemsGroup.length; i++){
                if(itemsGroup[i].selected == true){
                    console.log("move");
                    itemsGroup[i].locationX = mouseX;
                    itemsGroup[i].locationY = mouseY;
                }
            }
        }
    }



*/