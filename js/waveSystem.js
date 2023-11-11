class waveControls {
    constructor(){
        this.wallX;
        this.wallY;
        this.wallWidth;
        this.wallHeight; 
        this.curveX = 0;
        this.curveY;
        this.countDown = 0;
        this.topWave;
        this.bottomWave;
    }

    setup(){
        //frameRate(1.5);

        //settings things here bc im lazy
        this.wallX = width/6;
        this.wallY = height/6;
        this.wallWidth = width/1.5;
        this.wallHeight = height/1.5;

        this.topWave = new waveVariables(50);
        this.bottomWave = new waveVariables(30);
    }

    draw(){
        this.wavyLines();
    }

        //====================================== CURVEVERTEX FUNCTIONS =====================================//
    //--------------------- wavy lines --------------------//
    wavyLines(){
        push();
        noFill();

        if(this.countDown <= 0){
            this.topWave.goCrazy();
            this.bottomWave.goCrazy();
            this.countDown = 60;
        }

        this.countDown--;

        //draws waves
        for(let j=-80; j<height; j+=50){ //increase increment for less waves, increase the condition to fill the canvas
            beginShape();
            stroke(this.topWave.col[this.topWave.currentNum]);
            strokeWeight(this.topWave.lineWeight[this.topWave.currentNum]); //wave thickness
            curveVertex(0, 140+j);
            curveVertex(0, 140+j);
            //---waves effect---//
            for(let i=0;i<30;i++){
                this.curveX = (this.topWave.xPos[this.topWave.currentNum])+i*60; //don't change this otherwise it will look silly
                this.curveY = [140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,110+j,110+j,140+j,140+j,110+j,110+j]; //represent how tall or deep the waves
                curveVertex(this.curveX, this.curveY[i]);
            }
            curveVertex(width,140+j);
            curveVertex(width,140+j);
            endShape();

            this.topWave.currentNum++;
        }
        this.topWave.currentNum = 0;
    
        for(let j=-80; j<height; j+=30){ //increase increment for less waves, increase the condition to fill the canvas
            beginShape();
            stroke(this.bottomWave.col[this.bottomWave.currentNum]);
            strokeWeight(this.bottomWave.lineWeight[this.bottomWave.currentNum]); //wave thickness
            curveVertex(0, 110+j);
            curveVertex(0, 110+j);
            //---waves effect---//
            for(let i=0;i<30;i++){
                this.curveX = (this.bottomWave.xPos[this.bottomWave.currentNum])+i*60; //don't change this otherwise it will look silly
                this.curveY = [110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j]; //represent how tall or deep the waves
                curveVertex(this.curveX, this.curveY[i]);
            }
            curveVertex(width,140+j);
            curveVertex(width,140+j);
            endShape();
            this.bottomWave.currentNum++;
        }
        this.bottomWave.currentNum = 0;
        pop();
    }

    //-------------------- wall frame ---------------------//
    wallFrame(){
        push();
        strokeWeight(60);
        stroke(0);
        rect(wallX-10, wallY, this.wallWidth+20, this.wallHeight);
        pop();
    }
}

class waveVariables {
    constructor(num){
        this.interval = num;
        this.col = [];
        this.lineWeight = [];
        this.xPos = [];
        this.currentNum = 0;
    }

    goCrazy(){
        this.col = [];
        this.lineWeight = [];
        this.xPos = [];

        for(let j=-80; j<height; j+=this.interval){
            let randomCol = color(round(random(0,100)), round(random(138,200)), round(random(152,200)),30)
            this.col.push(randomCol);

            let randomLineWeight = round(random(4,7),2); //wave thickness
            this.lineWeight.push(randomLineWeight);

            this.xPos.push(round(random(20,40)));
        }
    }
}
