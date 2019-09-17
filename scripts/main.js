var mainCanvasZ1 = document.getElementById("mainCanvasZ1");
mainCanvasZ1.width = window.innerWidth;
mainCanvasZ1.height = window.innerHeight;
var mainContextZ1 = mainCanvasZ1.getContext("2d");

var mainCanvasZ2 = document.getElementById("mainCanvasZ2");
mainCanvasZ2.width = window.innerWidth;
mainCanvasZ2.height = window.innerHeight;
var mainContextZ2 = mainCanvasZ2.getContext("2d");


function bgImageObject(src){
    this._src = src;
    this._bg;
    this._isLoaded;
    let ctxZ1 =mainContextZ1;
    let ctxZ2 =mainContextZ2;

    this.createImage = function(){
        this._isLoaded = false;
        this._bg = new Image(1920,1080);
        this._bg.src = this._src;
        this._bg.onload = this.repaintedCanvas.apply(this);
        return this;
    }
    this.draw = function(x,y){
        ctxZ1.drawImage(this._bg,x,y,mainCanvasZ1.width,mainCanvasZ1.height);
    }
    this.repaintedCanvas = function(){
        this._isLoaded = true;
    }


}
function gameManagerObject(){
    this.goblinObject = {
        mainPath:'./images/elements/goblin/',
        width:150,
        height:150,
        sizeX:2085,
        sizeY:2084,
        angryAnim:['01','02','03','06','07','06','06','07','06','07','06','07','06','07'],
        happyAnim:['04','05','08','09','08','05','08','09','08','05','08','09'],
        states:{angry:[],happy:[]},
        loadImages:function(){
            return new Promise(res=>{

                this.states = {angry:[],happy:[]};
                this.angryAnim.forEach((el)=>{
                    let img =new Image(this.sizeX,this.sizeY);
                    img.src=this.mainPath+el+'.png';
                    this.states['angry'].push(img);
                });
                this.happyAnim.forEach((el)=>{
                    let img =new Image(this.sizeX,this.sizeY);
                    img.src=this.mainPath+el+'.png';
                    this.states['happy'].push(img);
                    if (el=='09') img.onload = ()=>res(this.states);
                });

            });

        },

        drawCalmStateGoblin:function (x,y,ctxZ1,ctxZ2) {
            ctxZ2.clearRect(0,0,mainCanvasZ2.width,mainCanvasZ2.height);
            ctxZ2.drawImage(this.states['happy'][0],x,y,this.width,this.height);
        },
        animHappyStateGoblin:function (x,y,ctxZ1,ctxZ2) {
            let i=0;
            var int = setInterval(function(){
                if (i==this.states['happy'].length-1) clearInterval(int);
                ctxZ2.clearRect(0,0,mainCanvasZ2.width,mainCanvasZ2.height);
                ctxZ2.drawImage(this.states['happy'][i],x,y,this.width,this.height);
                i++;
            }.bind(this),100);
        },
        animAngryStateGoblin:function (x,y,ctxZ1,ctxZ2) {
            let i=0;
            var int = setInterval(function(){
                if (i==this.states['angry'].length-1) clearInterval(int);
                ctxZ2.clearRect(0,0,mainCanvasZ2.width,mainCanvasZ2.height);
                ctxZ2.drawImage(this.states['angry'][i],x,y,this.width,this.height);
                i++;
            }.bind(this),100);
        }





    }




    const progressImageSize = {x:512,y:82};
    const scoreImageSize = {x:241,y:91};

    this._isLoaded;
    this._playerTitle;
    this._taskTitle;
    this._scoreTitle;
    this._progressFilled;

    this._progress;
    this._score;
    this.start;
    this.createImage = function(){
        this._playerTitle = "Коля";
        this._taskTitle = "Задание 1";
        this._isLoaded = false;
        this._progress = new Image(512,82);
        this._score = new Image(241,91);
        this._progressFilled = 0;
        this._progressFilledTitle = "4 из 11";
        this._scoreTitle = 50;
        let loaded = function(){
            this._score.src = "./images/elements/score.png";
            this._score.onload = this.repaintedCanvas.apply(this);
        };

        this._progress.src = "./images/elements/pb-5.png";
        this._progress.onload = loaded.apply(this);
        this.start=true;
        return this;
    }
    this.drawInfo = function (x,y,ctxZ1,ctxZ2) {
        ctxZ2.clearRect(0,0,mainCanvasZ2.width,mainCanvasZ2.height/2);
        ctxZ1.fillStyle = "darkviolet";
        ctxZ1.font = "bold 30px Comic Sans MS";
        ctxZ1.fillText(this._playerTitle, 30, 50);
        ctxZ1.fillText(this._taskTitle, 550, 50);
        ctxZ1.drawImage(this._progress,x-progressImageSize.x+mainCanvasZ1.width-40,y,progressImageSize.x,progressImageSize.y);
        ctxZ1.drawImage(this._score,x+150,y,scoreImageSize.x,scoreImageSize.y);
        ctxZ2.fillStyle = "brown";
        ctxZ2.font = "bold 30px Comic Sans MS";
        ctxZ2.fillText(this._scoreTitle.toString(), 270, 55);
        ctxZ2.fillStyle = "brown";
        ctxZ2.font = "bold 30px Comic Sans MS";
        ctxZ2.fillText(this._progressFilledTitle, mainCanvasZ2.width-370, 55);
    }



    this.draw = function(x,y){
        let ctxZ1 =mainContextZ1;
        let ctxZ2 =mainContextZ2;

        this.drawInfo(x,y,ctxZ1,ctxZ2);

        if (this.start==true){
            this.goblinObject.loadImages().then((s)=>{
                this.goblinObject.drawCalmStateGoblin(x+mainCanvasZ2.width-this.goblinObject.width,y+mainCanvasZ2.height-this.goblinObject.height,ctxZ1,ctxZ2);
                //this.goblinObject.animHappyStateGoblin(x+mainCanvasZ2.width-this.goblinObject.width,y+mainCanvasZ2.height-this.goblinObject.height,ctxZ1,ctxZ2);
                this.goblinObject.animAngryStateGoblin(x+mainCanvasZ2.width-this.goblinObject.width,y+mainCanvasZ2.height-this.goblinObject.height,ctxZ1,ctxZ2);

            });
            this.start=false;
        }

    }
    this.repaintedCanvas = function(){
        this._isLoaded = true;
    }

}
var f=1;

function main(){
    let bgImageOb = new bgImageObject("./images/bg/bg-5.jpg");
    bgImageOb.createImage().draw(0,0);
    let gMgrImageOb = new gameManagerObject();
    gMgrImageOb.createImage().draw(0,0);
    gameLoop(gMgrImageOb);
}
main();

function gameLoop(gMgrImageOb) {
    gMgrImageOb.draw();

    requestAnimationFrame(gameLoop.bind(this,gMgrImageOb));

}









