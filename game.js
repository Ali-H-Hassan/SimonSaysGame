//Initialization
const level_title = document.getElementById("level-title");
const buttons = document.querySelectorAll(".btn");
const simonPattern = [];
const userPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let start = false;
let level = 0;

function nextSequence() {
  userPattern.length = 0;
  level++;
  level_title.textContent = "Level " + level;
  const randomNb = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNb];
  simonPattern.push(randomColor);

  sequenceAnimation(simonPattern);
}

function sequenceAnimation(sequence) {
  let i = 0;
  const interval = setInterval(function () {
    animateButton(sequence[i]);
    playSound(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
    }
  }, 1000);
}

function animateButton(color) {
  const button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(function () {
    button.classList.remove("pressed");
  }, 500);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function handleClick(e) {
  const userColor = e.target.id;
  userPattern.push(userColor);
  animateButton(userColor);
  playSound(userColor);
  checkAnswer(userPattern.length - 1);
}

function checkAnswer(level) {
  if (simonPattern[level] === userPattern[level]) {
    if (userPattern.length === simonPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    gameOver();
  }
}
function gameOver() {
  level_title.textContent = "Game Over, Press Any Key to Restart";
  start = false;
  simonPattern = false;
}

buttons.forEach(function (button) {
  button.addEventListener("click", handleClick);
});

document.addEventListener("keydown", function (event) {
  if (!start) {
    start = true;
    level = 0;
    simonPattern.length = 0;
    nextSequence();
  }
});
