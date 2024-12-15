var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keydown(function (e) {

    if(started == false) {
    nextSequence();
    started = true;
}
});


$(".btn").click(function() {
    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
    level += 1;
    $("h1").text("Level " + level );

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);

    randomeChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomeChosenColor);

    $("#" + randomeChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomeChosenColor);
}

function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        if(userClickedPattern.length === gamePattern.length) {

            userClickedPattern = [];
            setTimeout(function() {

                nextSequence();
            }, 1000);
        }
    }

    else {
        
        started = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];

        $("h1").text("Game Over,Press Any Key to Restart");

        $("body").addClass("game-over");

        setTimeout(function() {

            $("body").removeClass("game-over");
        }, 200);

        playSound("wrong");

    }
}


function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {

        $("#" + currentColor).removeClass("pressed");
    }, 100);

}


function playSound(name) {

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}