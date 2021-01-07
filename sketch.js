var player;
var background;

var enemy;
var ninja;
var bg;

var robotGroup;
var robotSound;

var gameOver;
var gameOver1;

var gameState = 1;
var score = 0;

var restart;
var restartIMG

function preload() {
  
  ninja = loadImage("ninja.png")
  enemyImg = loadImage("evil_Robot.png")
  bg = loadImage("backgroundIMG.jpg")
  gameOver = loadImage("game-over.png")
  robotGroup = createGroup();
  restartIMG = loadImage("restart - Copy.png")
  robotSound = loadSound("RobotSound.mp3")
}


function setup() {
  createCanvas(displayWidth,displayHeight/2);
  bgSprite = createSprite(displayWidth/2,displayHeight/2,width,height);
  bgSprite.addImage(bg);
  bgSprite.scale = 2;
  

  player = createSprite(100, 400)
  player.addImage(ninja)
  player.scale = 0.3;
  player.setCollider("rectangle",0,0,50,50);
  player.debug = true;


  restart = createSprite(700, 500, 50, 50)
  restart.addImage(restartIMG)
  restart.scale = 0.5;
  restart.visible = false;

  gameOver1 = createSprite(720, 300)
  gameOver1.addImage(gameOver);
  gameOver1.visible = false;
}

function draw() {
  background(0);




  console.log(score);

  if(gameState == 1){

    bgSprite.velocityX = -1
    
    if(bgSprite.x < 0 ){
      bgSprite.x = bgSprite.width/2
    }


    if(player.y > 650 || player.y < 0){
      player.y = 400;
      player.x = 100;
    }
    
    move();
    SpawnEnemy();

    restart.visible = false
    gameOver1.visible = false

    if(player.isTouching(robotGroup)){
      gameState = 0;
   }
   if(frameCount%60==0){
    score++;
  }
   
  }

  else if(gameState == 0){

      bgSprite.velocityX = 0;
      robotGroup.setVelocityXEach(0)
      robotGroup.setLifetimeEach(0);

      gameOver1.visible = true;
      restart.visible = true;

      player.velocityY = 0;

      score = 0;

      if(mousePressedOver(restart)){
        console.log("test")
        reset();
      }
      
  }
  
  drawSprites();
  textSize(50);
  fill("black")
  text("Score : " + score,50, 50)
  
}

function reset(){
  console.log("reset is working")
  gameState = 1;
}

function move(){

  if(keyIsDown(UP_ARROW)){
    player.velocityY = -10
  }

  if(keyIsDown(DOWN_ARROW)){
    player.velocityY = 10
  }
}

function SpawnEnemy(){

  if(frameCount%60 === 0){
      enemy = createSprite(1250,50,100,100);
      enemy.velocityX = -10;
      enemy.y = Math.round(random(50,600));
      enemy.addImage(enemyImg)

      enemy.scale = 0.25;
      robotGroup.add(enemy)
      robotSound.play();


      
  }

}

