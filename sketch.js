const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var bg ="sprites/bg.png"
var gameState = "onSling";
var score =0;
var bird2, bird3, bird4;
var birds = []

function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
    getTime();
    birdfly=loadSound("bird_flying.mp3")
    birdselect=loadSound("bird_select.mp3")
    pigsnort=loadSound("pig_snort.mp3")
}

function setup(){
    var canvas = createCanvas(1200,400);
    canvas.position(15,70);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150,170);
    bird3 = new Bird(100,170);
    bird4 = new Bird(50,170);
    birds.push(bird4);
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if (backgroundImg)
    background(backgroundImg);
    Engine.update(engine);
    //strokeWeight(4);
    textSize(35)
    text("score:" + score,width-300, 50)
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(birds[birds.length-1].body, birds[birds.length-1].body.position,{x:5,y:-5})
        birdselect.play();
    }
}


function mouseReleased(){
    slingshot.fly();
    birds.pop();
    gameState = "launched";
    birdfly.play();
}

function keyPressed(){
    if(keyCode === 32){
        Matter.Body.setPosition(birds[birds.length-1].body, {x:200, y:50})
        slingshot.attach(birds[birds.length-1].body);
        bird.trajectory=[]
        gameState="onSling"
        birdselect.play();
    }
}
async function getTime(){
    var response=await fetch ("http://worldtimeapi.org/api/timezone/asia/kolkata")
    var res=await response.json();
    var day=res.datetime;
    var hr=day.slice(11,13);
    if (hr>=07 && hr<=13) {
        bg="sprites/bg.png"
    }
    else {
        bg="sprites/bg2.jpg"
    }
    backgroundImg=loadImage(bg)
}