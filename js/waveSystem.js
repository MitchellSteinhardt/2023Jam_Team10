class waveControls {
    constructor(){
        this.wallX;
        this.wallY;
        this.wallWidth;
        this.wallHeight; 
        this.curveX = 0;
        this.curveY;
        this.countdown = 40;
    }

    setup(){
        //frameRate(1.5);

        //settings things here bc im lazy
        this.wallX = width/6;
        this.wallY = height/6;
        this.wallWidth = width/1.5;
        this.wallHeight = height/1.5; 
    }

    draw(){
        this.wavyLines();
    }

        //====================================== CURVEVERTEX FUNCTIONS =====================================//
    //--------------------- wavy lines --------------------//
    wavyLines(){
        push();
        noFill();
        //if(this.countdown <= 0){
            for(let j=-80;j<800;j+=50){ //increase increment for less waves, increase the condition to fill the canvas
                beginShape();
                stroke(random(0,100), random(138,200), random(152,200),30)
                strokeWeight(random(4,7)); //wave thickness
                curveVertex(0, 140+j);
                curveVertex(0, 140+j);
                //---waves effect---//
                for(let i=0;i<30;i++){
                    this.curveX = (random(20,40))+i*60; //don't change this otherwise it will look silly
                    this.curveY = [140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,110+j,110+j,140+j,140+j,110+j,110+j]; //represent how tall or deep the waves
                    curveVertex(this.curveX, this.curveY[i]);
                }
                curveVertex(width,140+j);
                curveVertex(width,140+j);
                endShape();
                // noLoop();
            }
        
            for(let j=-80;j<800;j+=30){ //increase increment for less waves, increase the condition to fill the canvas
                beginShape();
                stroke(random(0,100), random(138,200), random(152,200),30)
                strokeWeight(random(4,7)); //wave thickness
                curveVertex(0, 110+j);
                curveVertex(0, 110+j);
                //---waves effect---//
                for(let i=0;i<30;i++){
                    this.curveX = (random(20,40))+i*60; //don't change this otherwise it will look silly
                    this.curveY = [110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j,110+j,110+j,110+j,110+j,140+j,140+j,110+j,110+j,140+j,140+j]; //represent how tall or deep the waves
                    curveVertex(this.curveX, this.curveY[i]);
                }
                curveVertex(width,140+j);
                curveVertex(width,140+j);
                endShape();
                //noLoop();
            }
            this.countdown = 40;
        //}
        this.countdown--;
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
