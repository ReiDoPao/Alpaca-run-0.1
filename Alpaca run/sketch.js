var PLAY = 0;
var END = 1;
var gameState = 0;

var alpaca,alpacaImg;
var ground,groundInv,groundImg,groundInvImg;
var obstaculoGrupo,pedra,espinho1;
var nuvenGrupo,nuven1,nuven2,nuven3,nuven4,nuven5,ave;
var fundo;
var restart;

var score = 0;


function preload(){
    alpacaImg = loadImage("Imagens/Alpaca.run1.png")
    groundImg = loadImage("Imagens/ground.png")
    groundInvImg = loadImage("Imagens/groundArrumar.png")


    nuven1 = loadImage("Imagens/Nuven1.png")
    nuven2 = loadImage("Imagens/Nuven2.png")
    nuven3  = loadImage("Imagens/Nuven3.png")
    nuven4  = loadImage("Imagens/Nuven4.png")
    nuven5  = loadImage("Imagens/Nuven5.png")
    ave = loadAnimation("Imagens/Ave doida1.png","Imagens/Ave doida2.png","Imagens/Ave doida3.png")

    pedra = loadImage("Imagens/Preda.png")
    espinho1 = loadImage("Imagens/Espinho muito doido.png")

    restartImg = loadAnimation("Imagens/Restart1.png", "Imagens/Restart2.png", "Imagens/Restart3.png", "Imagens/Restart4.png", "Imagens/Restart5.png","Imagens/Restart6.png","Imagens/Restart7.png")

}

function setup() {
 createCanvas(800,400);
 
 //fundo = createSprite(400,310,800,150);

 restart = createSprite(400,250,30,30);
 restart.addAnimation("restar", restartImg);
 
  ground = createSprite(200,380,800,30);
 ground.addImage(groundImg);

 //alpaca
 
 alpaca = createSprite(40,370,30,30);
 alpaca.addImage(alpacaImg);

//chão

 groundInv = createSprite(200,400,800,10);
 groundInv.addImage(groundInvImg);
 groundInv.scale = 2.4;

//chão invisivel(colisão)

 groundInvisivel = createSprite(200,400,800,10);
 groundInvisivel.visible = false;

 obstaculoGrupo = new Group();
 nuvenGrupo = new Group();
}

function draw() {
 background("lightblue");
 text("Score:" + score, 700,50);
 
//se tiver jogando
 if (gameState===PLAY){
   score = score + (Math.round(getFrameRate()/2))
   restart.visible = false;
   spawnNuvens();
   spawnObstacles();

   //Alpaca
   alpaca.velocityY = alpaca.velocityY + 0.5;
   alpaca.collide(groundInvisivel); 
 
   if (keyDown("space") && alpaca.isTouching(ground )){
    alpaca.velocityY = - 10;
    console.log("meu amigo ta funcionando");
   }

   //chão
    ground.velocityX = -10;
    if (ground.x < 0){
    ground.x = ground.width/2
    }

   //fim do jogo
   if (alpaca.isTouching(obstaculoGrupo)){
   gameState = END; 
   }
}

//modo 'fim'
   else if (gameState === END){
      restart.visible = true;
      ground.velocityX = 0;
      alpaca.velocityY = 0;

      obstaculoGrupo.setVelocityXEach(0);
      nuvenGrupo.setVelocityXEach(0);

      obstaculoGrupo.setLifetimeEach(-1);
      nuvenGrupo.setLifetimeEach(-1);

      if (mousePressedOver(restart)){
         reset();
      }
      
      
   }
  
 
 drawSprites();
}

//criar obstaculos

function spawnObstacles(){
   if (frameCount % 80 === 0){
      var obstaculo = createSprite (800,370,10,40);
      //obstaculo.debug = true;
      obstaculo.velocityX = - 10;
      obstaculo.lifetime = 300;
      obstaculoGrupo.add(obstaculo);

      var rand = Math.round(random(1,2));
      switch(rand){
         case 1: obstaculo.addImage(espinho1);
         break
         case 2: obstaculo.addImage(pedra);
         break
      }
      obstaculo.scale = 0.8;
   }
}

//criar nuvens

function spawnNuvens(){
   if (frameCount % 100 === 0){
      var nuven = createSprite(800,120,20,20)
      nuven.y = Math.round(random(20,160));

      var rand = Math.round(random(1,6));
      switch(rand){
         case 1: nuven.addImage(nuven1);
         break
         case 2: nuven.addImage(nuven2);
         break
         case 3: nuven.addImage(nuven3);
         break
         case 4: nuven.addImage(nuven4);
         break
         case 5: nuven.addImage(nuven5);
         break
         case 6: nuven.addAnimation("ave voando", ave);
         break
      }
      nuven.velocityX = - 5;
      nuven.lifetime = 400;
      nuvenGrupo.add(nuven);
   
}
}

function reset(){
   gameState = PLAY;

   obstaculoGrupo.destroyEach();
   nuvenGrupo.destroyEach();

   score = 0;
   alpaca.y = 365;
}
