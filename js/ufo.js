(function(){

  var ufoGame = {},
      lives = 5,
      points = 0,
      speed = 10;

ufoGame.init = function(){
  document.getElementById('startBtn').addEventListener('click',function(){
    ufoGame.setUp();
    ufoGame.startUp();
  });
}

//reset everything
ufoGame.setUp = function(){
  var winText = document.getElementsByClassName('winText')[0],
      loseText = document.getElementsByClassName('loseText')[0],
      pointsEl = document.getElementById('points'),
      livesEl = document.getElementById('lives');

      //clear text
      winText.classList.remove('show');
      loseText.classList.remove('show');

      //reset lives
      lives = 5;
      livesEl.innerHTML ='Lives: ' + 5;

      //reset points
      points = 0;
      pointsEl.innerHTML ='Points: ' + 0;

      //reset speed
      speed = 10;

      //remove click handlers
      var area = document.getElementById('area');
      area.removeEventListener('click', areaClick);
}

//generate UFO and add event listener area
ufoGame.startUp = function(){

  var area = document.getElementById('area');

  generateUFO();

  area.addEventListener('click', areaClick);

};

function areaClick(e){
  if(e.srcElement.className.indexOf('ufo') !== -1){return;}

  damage();

  var ufo = document.getElementsByClassName('ufo')[0],
      livesEl = document.getElementById('lives'),
      loseText = document.getElementsByClassName('loseText')[0];

    if(lives > 0){
      lives--;
      livesEl.innerHTML ='Lives: ' + lives;
    }

  setTimeout(function(){
    if(lives === 0){
        gameover();
        ufo.parentNode.removeChild(ufo);
        loseText.classList.add('show');
        area.removeEventListener('click',areaClick);
      }
  },10);


};


/*
  Generate UFO at random position, if already at max speed
  then show win text
*/
  function generateUFO(){
  	var ufo = document.createElement('div');
    ufo.className = 'ufo flying',
    random = getRandomInt(0, 450);

    if(speed !== 0){
      //speed up each time
      ufo.style.animationDuration = speedUp() + 's';

      ufo.style.top = (random) + 'px';

      //click handler
      ufo.addEventListener('click', hitUFO);

      area.append(ufo);
    }else{

      winText = document.getElementsByClassName('winText')[0];
      winText.classList.add('show');
    }
  }

/**
  Increase points, create new UFO, destroy old one
**/
  function hitUFO() {

    var pointsEl = document.getElementById('points');

    explosion();

    var me = this;
    me.addEventListener('click',null); //remove click handler
    me.style.animationPlayState = 'paused';
    me.classList.add('destroy');
    points++;
    pointsEl.innerHTML ='Points: ' + points;

    setTimeout(function(){
      me.parentNode.removeChild(me);
      generateUFO();
    }, 500);
  }

  function explosion(){
        var audio = document.createElement("audio");
        audio.src = "../audio/laser.mp3";
        audio.addEventListener("ended", function () {
           this.remove();
        }, false);
        audio.play();
  }

  function damage(){
        var audio = document.createElement("audio");
        audio.src = "../audio/damage.mp3";
        audio.addEventListener("ended", function () {
          this.remove();
        }, false);
        audio.play();
  }

  function gameover(){
        var audio = document.createElement("audio");
        audio.src = "../audio/gameover.mp3";
        audio.addEventListener("ended", function () {
            this.remove();
        }, false);
        audio.play();
  }

/*
  Generate random number between two numbers
*/
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

/*
  Decrement speed by 0.5s
*/
  function speedUp(){
    speed = (speed - 0.5);
    return speed;
  }


document.addEventListener('DOMContentLoaded', function(){
  ufoGame.init();
});
}());
