//global declarations
var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var index
// to play sound
function playSound(btn) {
  var audio = new Audio("sounds/" + btn + ".mp3");
  audio.play();
}

// to animate the click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setInterval(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// to select the random color
function nextSequence() {
  level++;
  $("h1").text(`Level - ${level}`);
  var randomNum = Math.floor(Math.random() * 4);
  gamePattern.push(btnColors[randomNum]);
  $("#" + btnColors[randomNum])
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

// user selection
$(".btn").click((event) => {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    // console.log(userClickedPattern.length===gamePattern.length)
    if(userClickedPattern.length===gamePattern.length){
        console.log(gamePattern,userClickedPattern)
      checkAnswer(level,userClickedPattern.length-1)
    }
});

startOver=()=>{
  level=0
  gamePattern=[];
  started=false;
}
// answer checking
checkAnswer=(index)=>{
    console.log("hiii")
    for(var i=0;i<=index;i++){
        if(userClickedPattern[i]!==gamePattern[i]){
            console.log("WRONG")
            $("body").addClass("game-over");
            $("h1").text(`U lost - Restart the same`);
            setInterval(()=>{
              $("body").removeClass("game-over");
            },200)
            startOver()
            break
        }
        else{
            console.log("SUCCESS")
        }
    }
    userClickedPattern=[]
    setTimeout(()=>{
        nextSequence()
    },1000)
}

// initiating the game
$("body").keypress(() => {
  if (started === false) {
    $("h1").text(`Level - ${level}`);
    nextSequence();
    started = true;
  }
});

