var started = false;
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 1;
var count = 0;


//starting the game
$(document).on("keydown", function () {
    if (!started) {
        $("h1").text("Level: " + level);
        nextSequence();
        started = true;

    }
});


//changing the sequence
function nextSequence() {

    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);

}


//recording user click response
$(".btn").on("click", function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

//Playing sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//playing Animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Checking if userpattern and gamepattern are equal or not
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            console.log("success");
            userClickedPattern = [];
            gamePattern = [];
            count = 0;
            patternMaker();
            $("h1").text("Level: " + level);
            level++;

        }
    }
    else {
        playSound("Wrong");
        $("body").addClass("gameOver");
        setTimeout(function () {
            $("body").removeClass("gameOver");
        }, 200);
        $("h1").text("Game Over, Press Any Key To restart");

        startOver();

    }

}

//resetting game values
function startOver() {
    gamePattern = [];
    level = 1;
    userClickedPattern = [];
    started = false;

}


function patternMaker() {         //  create a loop function
    setTimeout(function () {   //  call a 3s setTimeout when the loop is called
        nextSequence();   //  your code here
        count++;                    //  increment the counter
        if (count < level) {           //  if the counter < 10, call the loop function
            patternMaker();             //  ..  again which will trigger another 
        }                       //  ..  setTimeout()
    }, 1000)
}

