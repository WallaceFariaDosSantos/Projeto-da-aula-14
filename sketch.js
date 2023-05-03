var bow, arrow,  background, redB, pinkB, greenB, blueB, arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage, blue_balloonImage, backgroundImage;
var score = 0;
var gameState = PLAY;
var OVER = 0;
var PLAY = 1;
var WIN = 2;
var trofeu, trofeu_Image;

function preload(){  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("bullet.jpg");
  bowImage = loadImage("gun.png");
  red_balloonImage = loadImage("Alien4.png");
  green_balloonImage = loadImage("Alien1.png");
  pink_balloonImage = loadImage("Alien3.png");
  blue_balloonImage = loadImage("Alien2.png");
  trofeu_Image = loadImage("golden-trophy-symbol-png.webp");
}

function setup() {
  createCanvas(400, 400);
  
//criar o fundo
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
//criando arco para atirar a flecha
  bow = createSprite(360,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 0.1;
  
  score = 0  
  redB = new Group();
  greenB = new Group();
  blueB = new Group();
  pinkB = new Group();
  arrowGroup= new Group();  
}

function draw() {
  background("black");
//movendo o fundo
  scene.velocityX = -3 

  if(scene.x < 0){
    scene.x = scene.width/2;
  }

//gameState
  if(gameState === PLAY){
  }

  if(score <= -10){
    gameState = OVER;
    text("GAME OVER... ", 160, 200);
    scene.remove();
    redB.remove();
    blueB.remove();
    greenB.remove();
    pinkB.remove();
    bow.remove();
  }

  if(score >= 150){
    gameState = WIN;
    text("CONGRATULATIONS!!!", 150, 200);
    scene.remove();
    redB.remove();
    blueB.remove();
    greenB.remove();
    pinkB.remove();
    bow.remove();
    trofeu = createSprite(200, 250, 20, 50);
    trofeu.addImage(trofeu_Image);
    trofeu.scale = 0.2;
  }

//movendo o arco
  bow.y = World.mouseY
  
//soltar a flecha quando a tecla de espaço for pressionada
  if(keyDown("e")){
    createArrow();
    score = score-2;
  }

  if(keyDown("q")){
    createArrow2();
    score = score-5;
  }
  
  //criando inimigos contínuos
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }

  if(arrowGroup.isTouching(redB)){
    redB.destroyEach();
    arrowGroup.destroyEach();
    score = score+10;
  }

  if(arrowGroup.isTouching(greenB)){
    greenB.destroyEach();
    arrowGroup.destroyEach();
    score = score+10;
  }

  if(arrowGroup.isTouching(blueB)){
    blueB.destroyEach();
    arrowGroup.destroyEach();
    score = score+10;
  }

  if(arrowGroup.isTouching(pinkB)){
    pinkB.destroyEach();
    arrowGroup.destroyEach();
    score = score+10;
  }

  drawSprites();
  text("Pontuação: "+ score, 300,50);
}

function redBalloon() {
  var red = createSprite(0, Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.15;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0, Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.15;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0, Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.15;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0, Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 0.15
  pinkB.add(pink);
}

//Criando flechas para o arco
function createArrow() {
  var arrow = createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 320;
  arrow.y = bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
}

function createArrow2() {
  var arrow = createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 260;
  arrow.y = bow.y;
  arrow.velocityX = -2;
  arrow.lifetime = 200;
  arrow.scale = 1;
  arrowGroup.add(arrow);
}
