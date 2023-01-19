var trex ,trex_running,trex_collided;
var ground, groundImage;
var invisibleGround;
var cloud,cloudImage;
var obstacle1,obstacle1Image 
var score=0
var Play=1
var End=0
var gameState=Play
var obstacleGroup
var cloudGroup
var gameOver, gameOverImage
var restart,  restartImage

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided= loadImage("trex_collided.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obstacle1Image=loadImage("obstacle1.png");
  obstacle2Image=loadImage("obstacle2.png");
  obstacle3Image=loadImage("obstacle3.png");
  obstacle4Image=loadImage("obstacle4.png");
  obstacle5Image=loadImage("obstacle5.png");
  obstacle6Image=loadImage("obstacle6.png");
  
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  jumpSound=loadSound("jump.mp3")
  checkSound=loadSound("checkpoint.mp3")
  dieSound=loadSound("die.mp3")
}

function setup(){
  createCanvas(600,200)

  //create a trex sprite
  trex= createSprite (50,120,90,50);
  trex.scale=0.6;
  //trex.debug=true;
  trex.setCollider("circle",0,0,50);
  //trex.setCollider("rectangle",0,0,200,50);
 // trex.setCollider("rectangle",offSetX,offSetY,width,hight)
  trex.addAnimation ("running",trex_running);
  trex.addAnimation ("collided",trex_collided);

  ground = createSprite (300,175,600,10);
  ground.addImage ("ground",groundImage);

  invisibleGround=createSprite (300,180,600,10);
  invisibleGround.visible=false;
  
  obstacleGroup=new Group()

  cloudGroup=new Group()
  
  gameOver=createSprite (300,100,20,20);
    gameOver.addImage ("gameOver",gameOverImage);

    restart=createSprite (300,150,20,20);
    restart.addImage ("restart",restartImage);

    gameOver.visible=false
    restart.visible=false
}

function draw(){
  background(180)
  /*
  if (trex.isTouching(obstacleGroup)){
    trex.velocityY=-10;
  }*/
  if (gameState===Play){
    ground.velocityX=-(5+score/300);
    if (keyDown("Space")&&trex.collide(ground)){
      trex.velocityY=-10;
      jumpSound.play()
    }
    if (score%500===0 && score>0){
    checkSound.play()
    }
    if (trex.isTouching(obstacleGroup)){
     gameState=End
     dieSound.play()
    }
    
    spawnClouds();
    spawnObstacles();
    score=score+Math.round(getFrameRate()/60)
    if (ground.x<0){
      ground.x=ground.width/2;
    }
    trex.velocityY=trex.velocityY+0.5;
  }

  else if (gameState===End){
    ground.velocityX=0
    trex.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);

    trex.changeAnimation ("collided",trex_collided); 
    gameOver.visible=true
    restart.visible=true


  }
if (mousePressedOver(restart)){
  reset()
}
  text('score '+score,450,30)
  
  trex.collide(invisibleGround);
  drawSprites();
}
function reset(){
 gameState=Play;
 obstacleGroup.destroyEach()
 cloudGroup.destroyEach()

gameOver.visible=false
restart.visible=false

trex.changeAnimation ("running",trex_running); 
score=0
}
function spawnClouds(){
  if (frameCount%60===0){
    var cloud=createSprite(600,random(1,100),10,50);
    cloud.velocityX=-(5+score/300);
    cloud.addImage("cloud",cloudImage);
    //console.log(trex.depth);
    cloud.lifetime=320;
    // console.log(cloud.depth);
    trex.depth=cloud.depth
    cloud.scale=0.6;

    cloudGroup.add(cloud);
  } 
}

function spawnObstacles(){
  if (frameCount%100===0){
    var obstacle=createSprite(600,155,20,40);
    obstacle.velocityX=-(5+score/300)
    //obstacle.addImage("obstacle2",obstacle2Image);
    var rand=Math.round(random(1,6));

    switch(rand){
      case 1:obstacle.addImage(obstacle1Image);
      break;
      case 2:obstacle.addImage(obstacle2Image);
      break;
      case 3:obstacle.addImage(obstacle3Image);
      break;
      case 4:obstacle.addImage(obstacle4Image);
      break;
      case 5:obstacle.addImage(obstacle5Image);
      break;
      case 6:obstacle.addImage(obstacle6Image);
      break;
    }

    obstacle.scale=0.5;
    obstacle.lifetime=320;

    obstacleGroup.add(obstacle)
  }
}