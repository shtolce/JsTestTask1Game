var mainCanvasZ1 = document.getElementById("mainCanvasZ1");
mainCanvasZ1.width = window.innerWidth;
mainCanvasZ1.height = window.innerHeight;
var mainContextZ1 = mainCanvasZ1.getContext("2d");

var mainCanvasZ2 = document.getElementById("mainCanvasZ2");
mainCanvasZ2.width = window.innerWidth;
mainCanvasZ2.height = window.innerHeight;
var mainContextZ2 = mainCanvasZ2.getContext("2d");

var mainCanvasZ3 = document.getElementById("mainCanvasZ3");
mainCanvasZ3.width = window.innerWidth;
mainCanvasZ3.height = window.innerHeight;
var mainContextZ3 = mainCanvasZ3.getContext("2d");


function bgImageObject(src){
    this._src = src;
    this._bg;
    this._isLoaded;
    let ctxZ1 =mainContextZ1;
    let ctxZ2 =mainContextZ2;

    this.createImage = function(){
        return new Promise(res=>{
            this._isLoaded = false;
            this._bg = new Image(1920,1080);
            this._bg.src = this._src;
            this._bg.onload = ()=> {
                this.repaintedCanvas.apply(this);
                res(this);
            };
            });

        };
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
            ctxZ2.clearRect(x,y,mainCanvasZ2.width,mainCanvasZ2.height);
            ctxZ2.drawImage(this.states['happy'][0],x,y,this.width,this.height);
        },
        animHappyStateGoblin:function (x,y,ctxZ1,ctxZ2) {
            let i=0;
            var int = setInterval(function(){
                if (i==this.states['happy'].length-1) clearInterval(int);
                ctxZ2.clearRect(x,y,mainCanvasZ2.width,mainCanvasZ2.height);
                ctxZ2.drawImage(this.states['happy'][i],x,y,this.width,this.height);
                i++;
            }.bind(this),100);
        },
        animAngryStateGoblin:function (x,y,ctxZ1,ctxZ2) {
            let i=0;
            var int = setInterval(function(){
                if (i==this.states['angry'].length-1) clearInterval(int);
                ctxZ2.clearRect(x,y,mainCanvasZ2.width,mainCanvasZ2.height);
                ctxZ2.drawImage(this.states['angry'][i],x,y,this.width,this.height);
                i++;
            }.bind(this),100);
        }


    }
    const progressImageSize = {x:412,y:82};
    const scoreImageSize = {x:241,y:91};
    const btnImageSize = {x:150,y:70};
    this._isLoaded;
    this._playerTitle;
    this._taskTitle;
    this._scoreTitle;
    this._progressFilled;
    this._progress =[];
    this._score;
    this.start;
    this._yesBtn;
    this._noBtn;
    this._yesBtnp;
    this._noBtnp;
    this._isTimeOut;

    let x1YesBtn = -btnImageSize.x/2+mainCanvasZ2.width/2-150;
    let y1YesBtn = +mainCanvasZ2.height-100;
    let x2YesBtn = -btnImageSize.x/2+mainCanvasZ2.width/2-150+btnImageSize.x;
    let y2YesBtn = +mainCanvasZ2.height-100+btnImageSize.y;
    let x1NoBtn = +btnImageSize.x/2+mainCanvasZ2.width/2-150;
    let y1NoBtn = +mainCanvasZ2.height-100;
    let x2NoBtn = +btnImageSize.x/2+mainCanvasZ2.width/2-150+btnImageSize.x;
    let y2NoBtn = +mainCanvasZ2.height-100+btnImageSize.y;

    this.createImage = function(){
        return new Promise((res)=>{
            this._playerTitle = "Коля";
            this._taskTitle = "Задание 1";
            this._taskTimer = 60;
            this._taskTimerTitle = this._taskTimer +' сек';
            this._isLoaded = false;
            this._score = new Image(scoreImageSize.x,scoreImageSize.y);
            this._yesBtn = new Image(btnImageSize.x,btnImageSize.y);
            this._noBtn = new Image(btnImageSize.x,btnImageSize.y);
            this._yesBtnp = new Image(btnImageSize.x,btnImageSize.y);
            this._noBtnp = new Image(btnImageSize.x,btnImageSize.y);
            this._btnYesPressed;
            this._btnNoPressed;
            this._progressFilled = 0;
            this._progressFilledTitle = `${this._progressFilled} из 11`;
            this._scoreTitle = 50;
            this._pbArr = ['pb-1.png','pb-2.png','pb-3.png','pb-4.png','pb-5.png','pb-6.png','pb-7.png','pb-8.png','pb-9.png','pb-10.png','pb-11.png'];
            let loaded = function(){
                this._score.src = "./images/elements/score.png";
                this._score.onload = ()=>{
                    this.repaintedCanvas.apply(this);res(this);
                }
            };
            this._yesBtn.src = './images/elements/btnYes.png';
            this._noBtn.src = './images/elements/btnNo.png';
            this._yesBtnp.src = './images/elements/btnYesp.png';
            this._noBtnp.src = './images/elements/btnNop.png';

            this._pbArr.forEach((el)=>{
                let img = new Image(progressImageSize.x,progressImageSize.y);
                img.src = './images/elements/'+el;
                this._progress.push(img);
                if (el=='pb-11.png')
                    img.onload = loaded.apply(this);
            });
            this.start=true;

        });

    }
    this.drawInfo = function (x,y,ctxZ1,ctxZ2) {
        ctxZ1.fillStyle = "darkviolet";
        ctxZ1.font = "bold 30px Comic Sans MS";
        ctxZ1.fillText(this._playerTitle, 30, 50);
        ctxZ1.fillText(this._taskTitle, mainCanvasZ1.width/2-100, 50);
        ctxZ1.drawImage(this._progress[this._progressFilled],x-progressImageSize.x+mainCanvasZ1.width-40,y+10,progressImageSize.x,progressImageSize.y);
        ctxZ1.drawImage(this._score,x+150,y,scoreImageSize.x,scoreImageSize.y);
        ctxZ2.clearRect(0,0,mainCanvasZ2.width,progressImageSize.y+90);
        ctxZ2.fillStyle = "darkviolet";
        ctxZ2.font = "bold 30px Comic Sans MS";
        ctxZ2.fillText(this._taskTimerTitle, mainCanvasZ1.width/2-100, 90);
        ctxZ2.fillStyle = "brown";
        ctxZ2.font = "bold 30px Comic Sans MS";
        ctxZ2.fillText(this._scoreTitle.toString(), scoreImageSize.x/2+150, 55);
        ctxZ2.fillStyle = "brown";
        ctxZ2.font = "bold 30px Comic Sans MS";
        ctxZ2.fillText(this._progressFilledTitle, mainCanvasZ2.width-progressImageSize.x/2-100, 55);


        ctxZ2.drawImage(this._btnYesPressed?this._yesBtnp:this._yesBtn,x1YesBtn,y1YesBtn,btnImageSize.x,btnImageSize.y);
        ctxZ2.drawImage(this._btnNoPressed?this._noBtnp:this._noBtn ,x+btnImageSize.x/2+mainCanvasZ2.width/2-150,y+mainCanvasZ2.height-100,btnImageSize.x,btnImageSize.y);



    }
    this._startTimer = function(){
        this._isTimeOut = false;

        let si = setInterval(()=>{
            this._taskTimer --;
            if (this._taskTimer==0) {
                this._isTimeOut = true;
                clearInterval(si);
            }

        },1000);



    }


    this.drawOnce = function (x,y,ctxZ1,ctxZ2) {
        this._btnYesPressed = false;
        this._btnNoPressed = false;

        this.goblinObject.loadImages().then((s)=>{
            this.goblinObject.drawCalmStateGoblin(x+mainCanvasZ2.width-this.goblinObject.width,y+mainCanvasZ2.height-this.goblinObject.height,ctxZ1,ctxZ2);
            //this.goblinObject.animHappyStateGoblin(x+mainCanvasZ2.width-this.goblinObject.width,y+mainCanvasZ2.height-this.goblinObject.height,ctxZ1,ctxZ2);
//            this.goblinObject.animAngryStateGoblin(x+mainCanvasZ2.width-this.goblinObject.width,y+mainCanvasZ2.height-this.goblinObject.height,ctxZ1,ctxZ2);
        });
        this.start=false;

        mainCanvasZ2.addEventListener('click',(target)=>{
            let x= target.x;
            let y= target.y;
            if (x>=x1YesBtn&&x<x2YesBtn&&y>y1YesBtn&&y<y2YesBtn){
                this._btnYesPressed = true;
                setTimeout(()=>this._btnYesPressed = false,200);

            }
            if (x>=x1NoBtn&&x<x2NoBtn&&y>y1NoBtn&&y<y2NoBtn){
                this._btnNoPressed = true;
                setTimeout(()=>this._btnNoPressed = false,200);
            }
        });
        mainCanvasZ2.addEventListener('mousemove',(target)=>{
            let x= target.x;
            let y= target.y;
            if (x>=x1YesBtn&&x<x2YesBtn&&y>y1YesBtn&&y<y2YesBtn){
                document.body.style.cursor = "pointer";

            } else if (x>=x1NoBtn&&x<x2NoBtn&&y>y1NoBtn&&y<y2NoBtn){
                document.body.style.cursor = "pointer"
            } else document.body.style.cursor = "default"
        });
    }

    this.draw = function(x,y){
        this._progressFilledTitle = `${this._progressFilled} из 11`;
        this._taskTimerTitle = this._taskTimer +' сек';

        let ctxZ1 =mainContextZ1;
        let ctxZ2 =mainContextZ2;
        this.drawInfo(x,y,ctxZ1,ctxZ2);
        if (this.start==true){
            this.drawOnce(x,y,ctxZ1,ctxZ2);
        }

        //this.goblinObject.animAngryStateGoblin(x+mainCanvasZ2.width-this.goblinObject.width,y+mainCanvasZ2.height-this.goblinObject.height,ctxZ1,ctxZ2);

    }
    this.repaintedCanvas = function(){
        this._isLoaded = true;
    }

}


function gameProcessObject(){
    this._artArrayNat = ['image1-1.jpg','image1-2.jpg','image1-3.jpg','image1-4.jpg','image1-5.jpg','image1-6.jpg'];
    this._artArrayNoNat = ['image2-1.jpg','image2-2.jpg','image2-3.jpg','image2-4.jpg','image2-5.jpg'];
    this._artArrayObj = [];
    this._frameImg;
    const sizeX = 640;
    const sizeY = 480;
    const sizeXCanv = 200;
    const sizeYCanv = 200;

    this.gameProcessInit = function() {
        return new Promise(res => {
            this._frameImg = new Image(sizeX,sizeY);
            this._frameImg.src = './images/arts/frame-puzzle.png';

            this._artArrayNat.forEach((el)=>{
                let img =new Image(sizeX,sizeY);
                img.src='./images/arts/'+el;
                let imgObj = {
                    image:img,
                    type:'NoNat'
                };
                this._artArrayObj.push(imgObj);
            });
            this._artArrayNoNat.forEach((el)=>{
                let img =new Image(sizeX,sizeY);
                img.src='./images/arts/'+el;
                let imgObj = {
                    image:img,
                    type:'Nat'
                };
                if (el=='image2-5.jpg')
                    img.onload = ()=>{res();};
                this._artArrayObj.push(imgObj);
            });
        });
    };
    this.getRandImage = function(){
        let idx = Math.floor(Math.random()*(this._artArrayObj.length));
        return this._artArrayObj[idx];
    };
    this.drawArtPicture = function(x,y,img) {
        let ctxZ3 = mainContextZ3;
        ctxZ3.clearRect(x-50,y-50,sizeXCanv+100,sizeYCanv+50);
        ctxZ3.drawImage(img,x,y,sizeXCanv,sizeYCanv);
        ctxZ3.drawImage(this._frameImg,x-15,y-25,sizeXCanv+32,sizeYCanv+50);
    };

}


function main(){
    let bgImageOb = new bgImageObject("./images/bg/bg-5.jpg");
    bgImageOb.createImage().then((e)=>{
        e.draw(0,0);
    });
    gProc = new gameProcessObject();
    gProc.gameProcessInit().then(()=>{
    });

    let gMgrImageOb = new gameManagerObject();
    gMgrImageOb.createImage().then((e)=>{
        gMgrImageOb._startTimer();
        e.draw(0,0);
        gameLoop(gMgrImageOb);

    });
}
main();
let startTurn = true;
let y=0;
let x=0;
let step =1;
let img,type;
let ctxZ1 = mainContextZ1;
let ctxZ2 = mainContextZ2;
function gameLoop(gMgrImageOb) {
    if (startTurn){
        let temp = gProc.getRandImage();
        img = temp.image;
        type = temp.type;
        x = 200+(Math.random()*(mainCanvasZ3.width-500));
        startTurn=false;
        step =1;
    }
    gMgrImageOb.draw(0,0);
    gProc.drawArtPicture(x,y,img);
    y+=step;
    if (y>mainCanvasZ3.height+100){
        y=0;
        startTurn=true;

    }
    if (gMgrImageOb._btnYesPressed){
        if (type == 'Nat'){
            gMgrImageOb.goblinObject.animAngryStateGoblin(mainCanvasZ2.width-gMgrImageOb.goblinObject.width,
                mainCanvasZ2.height-gMgrImageOb.goblinObject.height,ctxZ1,ctxZ2);
            gMgrImageOb._progressFilled++;
            gMgrImageOb._btnYesPressed=false;
        }else
            gMgrImageOb.goblinObject.animHappyStateGoblin(mainCanvasZ2.width-gMgrImageOb.goblinObject.width,
                mainCanvasZ2.height-gMgrImageOb.goblinObject.height,ctxZ1,ctxZ2);
        step=20;
    }

    if (gMgrImageOb._btnNoPressed) {

        if (type == 'NoNat'){
            gMgrImageOb.goblinObject.animAngryStateGoblin(mainCanvasZ2.width-gMgrImageOb.goblinObject.width,
                mainCanvasZ2.height-gMgrImageOb.goblinObject.height,ctxZ1,ctxZ2);
            gMgrImageOb._progressFilled++;
            gMgrImageOb._btnNoPressed=false;
        }else
            gMgrImageOb.goblinObject.animHappyStateGoblin(mainCanvasZ2.width-gMgrImageOb.goblinObject.width,
                mainCanvasZ2.height-gMgrImageOb.goblinObject.height,ctxZ1,ctxZ2);
        step=20;
    }



    if (gMgrImageOb._progressFilled==11) {
        sessionStorage['result'] = 'win';
        gMgrImageOb._progressFilled=0;goToScorePage();
    }
    if (gMgrImageOb._isTimeOut == true) {
        sessionStorage['result'] = 'loose';
        gMgrImageOb._progressFilled=0;goToScorePage()
    }

    requestAnimationFrame(gameLoop.bind(this,gMgrImageOb));

}

function goToScorePage()
{
    document.location.href = './score.html';
}







