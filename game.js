const userClickedPattern =[];
const gamePattern = [];
const empty = [];
const buttonColours = ["red", "blue", "green","yellow"];
var startGame = true;
var level = 0;
// var color = 0; Used for testing;

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var grab = ('#' + randomChosenColour);
  var name = randomChosenColour;
  $(grab).fadeOut(100).fadeIn(100);
  playSound(name);
  level++;
  $('h1').text('Level '+ level);
}

$(".btn").on('click', function (element) {
  var userChosenColour = element.target.id;
  userClickedPattern.push(userChosenColour);
  var name = userChosenColour;
  var currentColour = ('#' + userChosenColour)
  // color = '#' + userChosenColour; Used for testing;
  // console.log(userChosenColour);
  // console.log("'"+ currentColour + "'"); Used for testing;
  animatePress(currentColour);
  playSound(name);
  checkAnswer()
})

function playSound(name) {
  var sound = new Audio('https://github.com/juliotrujilloh/JulioHenriquezSimonGame.github.io/blob/main/Sounds/'+ name +'.mp3');   
  sound.play();
}

function animatePress(currentColour) {
      $(currentColour).addClass('pressed');
      setTimeout(function(){
        $(currentColour).removeClass('pressed');
      }, 100);
}

function gameOver() {
      $('body').addClass('game-over');
      setTimeout(function(){
        $('body').removeClass('game-over');;
      }, 200);
}

function startOver(){
    startGame = true;
    level = 0;
    gamePattern.splice(0,gamePattern.length);
    userClickedPattern.splice(0,userClickedPattern.length);
}

$(document).keydown(function () {
  if (startGame) {
    nextSequence();
    startGame = false;
  }
})

$('h1').on('click', function () {
    startOver();
    nextSequence();
})

function checkAnswer() {
  if (userClickedPattern.length !== gamePattern.length) {
    for (var i = 0; i < userClickedPattern.length; i++) {
      userClickedPattern[i] === gamePattern[i];
      if (userClickedPattern[i] !== gamePattern[i]) {
        // console.log('wrong'); Used for testing;
        var wrong = new Audio('https://github.com/juliotrujilloh/JulioHenriquezSimonGame.github.io/blob/main/Sounds/wrong.mp3');
        wrong.play();
        gameOver();
        $('h1').text('Game Over, Press Any Key (or title) to Restart')
        startOver();
      }
    }
  }else if(userClickedPattern.toString() === gamePattern.toString()) {
    console.log('success');
    userClickedPattern.splice(0,userClickedPattern.length);
    setTimeout(function(){
      nextSequence()},1000);
  }else{
    console.log('wrong');
    var wrong = new Audio('https://github.com/juliotrujilloh/JulioHenriquezSimonGame.github.io/blob/main/Sounds/wrong.mp3');
    wrong.play();
    gameOver();
    $('h1').text('Game Over, Press Any Key (or title) to Restart')
    startOver();
    }
  }
