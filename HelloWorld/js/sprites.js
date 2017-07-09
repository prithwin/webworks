init();
var c;
var gameRunning = false;
var walkingImage;
var bwalkingImage;
var duckKingImage;
var standingImage;
var ryuji;
var duckKing;
var fps = 12;
var mapTileSet;
var mapDesc;
var mapDescObj;
var mapAtlas;
var assetsLoaded = 0;
var drawDistanceX = 1350;
var drawDistanceY = 800;
var map;

window.onkeydown = function (event) {
  if (event.key == 'd') {
    console.log('dpressed');
    if(!ryuji.walking) {
      ryuji.currentFrame = 0;
    }
    ryuji.dx = 10;
    ryuji.walking = true;
    ryuji.standing = false;
    ryuji.backwards = false;

  } else if (event.key == 'a') {
    if(!ryuji.walking)
    {
      ryuji.currentFrame = 0;
    }
    ryuji.dx = -10;
    ryuji.walking = true;
    ryuji.standing = false;
    ryuji.backwards = true;

  }
}

window.onkeyup = function (event) {
  if(!ryuji.standing){ryuji.currentFrame = 0;}
  ryuji.dx = 0;
  ryuji.walking = false;
  ryuji.standing = true;
}

function Map() {
  this.draw = function() {
    while(assetsLoaded < 2) {}
    for(i = 0 ; i < mapDescObj.height ; i++){
      for(j = 0 ; j < mapDescObj.width ; j++) {
        let rowIndex = i * mapDescObj.height;
        let trueIndex = rowIndex + j;
        if(mapDescObj.layers[0].data[trueIndex] != 0) {
          //only do something if it is not 0 mapTileSet.responseJSON
          let yDisp = mapTileSet.responseJSON.tileheight *
              Math.floor(mapDescObj.layers[0].data[trueIndex] / (mapTileSet.responseJSON.columns));

          let xDisp = mapDescObj.layers[0].data[trueIndex] %  (mapTileSet.responseJSON.columns);
          xDisp = (xDisp-1) * mapTileSet.responseJSON.tilewidth;
          if(inViewRange( mapTileSet.responseJSON.tilewidth* j ,mapTileSet.responseJSON.tileheight * i)){
            c.drawImage(mapAtlas, xDisp, yDisp, mapTileSet.responseJSON.tilewidth,
                        mapTileSet.responseJSON.tileheight, mapTileSet.responseJSON.tilewidth* j
                        , mapTileSet.responseJSON.tileheight * i, mapTileSet.responseJSON.tilewidth,
                        mapTileSet.responseJSON.tileheight);
          }
        }
      }
    }
  }

  function inViewRange(x,y) {
    if(Math.abs(x-ryuji.x) > drawDistanceX) return false;
    if(Math.abs(y-ryuji.y) > drawDistanceX) return false;
    return true;
  }

  this.update = function() {
    //no updates required in the map.
  }
}

function DuckKing(x,y) {   // 85 x 133
  this.currentFrame = 0;
    this.x = 800;
    //   this.y = 0;
    this.y = 3200 - 25- 127;

  this.draw = function() {
    c.drawImage(duckKingImage,0, (this.currentFrame * 133), 85 , 133 , this.x , this.y , 85, 133);
  }


  this.update = function() {
    this.currentFrame += 1;
    this.currentFrame %= 11;
  }
}

function Ryuji(standing) {
  this.currentFrame = 0;
  this.standing = standing;
  this.walking = !standing;
  this.x = 20;
  //   this.y = 0;
  this.y = 3200 - 25- 127;
  this.dx = 0;
  this.backwards = false;

  this.draw = function () {

    if (this.walking) {
      if(!this.backwards) {
        c.drawImage(walkingImage, 0, (this.currentFrame * 126), 74, 126, this.x, this.y, 74, 126);
      } else {
        c.drawImage(bwalkingImage, 0, (this.currentFrame * 126), 74, 126, this.x, this.y, 74, 126);
      }
    } else {
      let rIndex = Math.floor(this.currentFrame / 3);
      let cIndex = this.currentFrame % 3;
      c.drawImage(standingImage, (cIndex * 74), (rIndex * 127), 74, 127, this.x, this.y, 74, 127);
    }
  }

  this.update = function () {
    if (this.walking) {
      this.currentFrame += 1;
      this.currentFrame %= 6;

    } else {
      this.currentFrame += 1;
      this.currentFrame %= 34;
    }
    this.x += this.dx;

  }
}

function init() {
  console.log(document.querySelector('#c'));
  document.querySelector('#c').setAttribute('width', window.innerWidth);
  document.querySelector('#c').setAttribute('height', window.innerHeight);
  c = document.querySelector('#c').getContext('2d');
  c.scale(2,2);

  //Load Ryuji Yamazaki standing on the map.
  walkingImage = new Image();
  walkingImage.onload = function () { console.log('standing image loaded'); }
  walkingImage.src = './images/walking-atlas.png';

  bwalkingImage = new Image();
  bwalkingImage.onload = function () { console.log('standing image loaded'); }
  bwalkingImage.src = './images/b-walking-atlas.png';

  standingImage = new Image();
  standingImage.onload = function () { console.log('standing image loaded'); }
  standingImage.src = './images/standing-atlas.png';
  let standing = true;
  this.ryuji = new Ryuji(standing);

  duckKingImage = new Image();
  duckKingImage.onload = function() { console.log('ducking king image loaded');}
  duckKingImage.src = './images/duck-king-atlas.png';
  this.duckKing = new DuckKing();


  //Load the map itself.
  mapTileSet = $.getJSON('./images/tileset.json',function() {
    mapAtlas = new Image();
    mapAtlas.onload = function() {
      assetsLoaded += 1;
    }
    mapAtlas.src = './images/' + mapTileSet.responseJSON.image;
    console.log(mapAtlas);
  });
  mapDesc = $.getJSON('./images/map2.json',function() {
    mapDescObj = mapDesc.responseJSON;
    console.log(mapDescObj);
    assetsLoaded += 1;
  });
  this.map = new Map();

}

function gameStart() {
  if (!gameRunning) {
    console.log('starting game rendering');
    console.log(c);
    animate();
    gameRunning = true;
  }
}

function animate() {
  c.clearRect(0,0, 3200, 3200);
  c.save();
  centerAtRyuji();
  map.update();
  map.draw();
  ryuji.update();
  ryuji.draw();
  duckKing.draw();
  duckKing.update();
  let now = Date.now();
  then = now + (1000 / fps);
  while (Date.now() < then) {

  }


  c.restore();
  requestAnimationFrame(animate);
}

function centerAtRyuji() {

  if(ryuji.x>=0 && ryuji.x <1000){
    console.log('ryuji is at '+ryuji.x +"," + ryuji.y);
    c.translate(-ryuji.x+50, -1 * (mapTileSet.responseJSON.tileheight* mapDescObj.height - window.innerHeight/2));
  } else {
    if(ryuji.x >= 1000) {
      c.translate(-950, -1* (mapTileSet.responseJSON.tileheight* mapDescObj.height - window.innerHeight/2));
    } else {
      c.translate(50, -1* (mapTileSet.responseJSON.tileheight* mapDescObj.height - window.innerHeight/2));
    }
  }

}
