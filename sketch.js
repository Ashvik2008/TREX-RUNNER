
var b,bb;
var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage,restartImage,gameOverImage;

var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var cloudsGroup, cloudImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6,gameover,restart;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");



  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");


}

function setup() {
createCanvas(1366,623);
  
  //CREATING THE TREX
  trex = createSprite(50,400,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //CREATING THE GROUND
  ground = createSprite(1400,390,60000,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
 
//CREATING THEINVISIBLE GROUND
  invisibleGround = createSprite(200,405,400,10);
  invisibleGround.visible = false;
  
  //CREATING THE 2 GROUPS  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();

 
  
score = 0;
 
gameover = createSprite(650,200);

restart = createSprite(650,240);

gameover.addImage(gameOverImage);

gameover.scale = 0.5;

restart.addImage(restartImage);

restart.scale = 0.5;

gameover.visible = false;

restart.visible = false;  
}

function draw() 
{
  //setting the background image.
  
  background(0);

                        

  //displaying the scores.
  textSize(20);
  strokeWeight(4);
  stroke(255)
  fill("lime")
  text("SCORE : "+ score, 10,20);
 
 //this should happen if gameState is = play
  if(gamestate === PLAY)
     {
           
     score = score + Math.round(getFrameRate()/60);
  
  
    if(keyDown("space") && trex.y > 370)
 {
     trex.velocityY = -13;
    
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  
  //making the infinite game World.
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }

  
  //calling the functions.
  spawnClouds();
  spawnObstacles();
    
 // this should happen if obstacle touches the trex.
   if(obstaclesGroup.isTouching(trex))
   {
    gamestate = END; 
    
   } 
}


  //if the gamesate = end
  
  else if(gamestate === END) 
  {
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;

    score = 0;

    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation.
    trex.visible = false;
    
    //set lifetime of the game objects so that they are never destroyed.
    obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
    
   //this hapens when we press the restart button. 
   if(mousePressedOver(restart))
    {
     reset(); 
    }
  }
  
  //making the trex collide with the invisible ground.
  trex.collide(invisibleGround);
  

  //drawing the sprites
  drawSprites();
}

//function to reset everything.
function reset()
{
  gamestate = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.visible = true;
  trex.changeAnimation("trex",trex_running);
  
  ground.velocityX = -4;

  count = 0;
  
}

//function to spawn the clouds.
function spawnClouds()
 {
 
  if (frameCount % 60 === 0)
   {
    var cloud = createSprite(1400,320,40,10);

    cloud.y = Math.round(random(200,320));

    cloud.addImage(cloudImage);

    cloud.scale = 0.5;

    cloud.velocityX = -3;

    
     //assign lifetime to the variable.
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group.
    cloudsGroup.add(cloud);
  }
  
}

//function to spawn the cactus plants or the obstacles.
function spawnObstacles() 
{
  if(frameCount % 60 === 0)
   {
    var obstacle = createSprite(1400,375,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles.
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle  .         
    obstacle.scale = 0.5;
    obstacle.lifetime = 350;
    //add each obstacle to the group.
    obstaclesGroup.add(obstacle);
  }
}

function mouseReleaed()
{
  trex.velocityY = -13;
}