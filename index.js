var buttonColors = ['red', 'blue', 'yellow', 'green'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

document.querySelector('#starter').addEventListener('click', function () {
    if (!gameStarted) {
        startGame();
    } else {
        startOver();
    }
});


var clickedButtons = document.querySelectorAll('.btn');
for (let index = 0; index < clickedButtons.length; index++) {
    var clickedButton = clickedButtons[index];
    clickedButton.addEventListener('click', function () {
        var clickedColor = this.classList[1];
        userClickedPattern.push(clickedColor);
        
        makeSound(clickedColor);
        flash(clickedColor);

        checkAnswer(userClickedPattern.length - 1);
    });
}

function startGame() {
    gameStarted = true;
    level = 0;
    gamePattern = [];
    document.querySelector('#starter').innerHTML = 'Restart';
    nextSequence(); 
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector('#level-title').innerHTML = 'Level ' + level;

    var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);

    flash(randomChosenColor);
    makeSound(randomChosenColor);
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}


function gameOver() {
    makeSound('wrong');
    document.querySelector('#level-title').innerHTML = 'Game Over';
    document.querySelector('#starter').innerHTML = 'Restart';
    document.body.classList.add('game-over'); 
    setTimeout(function () {
        document.body.classList.remove('game-over'); 
    }, 200);
}


function startOver() {
    gamePattern = [];
    level = 0;
    gameStarted = false;
    document.querySelector('#level-title').innerHTML = 'Press Start to Begin'; 
    document.querySelector('#starter').innerHTML = 'Start Game'
}


function flash(color) {
    document.querySelector('.' + color).classList.add('pressed');
    setTimeout(function () {
        document.querySelector('.' + color).classList.remove('pressed');
    }, 100);
}


function makeSound(color) {
    var audio;
    switch (color) {
        case 'red':
            audio = new Audio('./sounds/red.mp3');
            break;
        case 'blue':
            audio = new Audio('./sounds/blue.mp3');
            break;
        case 'green':
            audio = new Audio('./sounds/green.mp3');
            break;
        case 'yellow':
            audio = new Audio('./sounds/yellow.mp3');
            break;
        default:
            audio = new Audio('./sounds/wrong.mp3');
            break;
    }
    audio.play();
}
