const gameContainer = document.getElementById("game");
const beginButton = document.getElementById("beginBtn");
let COLORS = [];

//Display highest score
let highestScore = localStorage.getItem("BestScore");
let bestScoreValue = document.getElementById("currentHighest");
if (!highestScore) {
  bestScoreValue.textContent = "There is no high score!";
}
else {
  bestScoreValue.textContent = "Current High Score: " + highestScore;
}

//Generate random even number to determine how many cards will be in the game
let randomNumber = Math.floor(Math.random()*12) + 1;
if (randomNumber % 2 === 0) {

}
else if (randomNumber % 2 === 1) {
  randomNumber += 1;
}
console.log(randomNumber);

for (let i = 0; i < randomNumber; i++) {
  COLORS[i] = generateBoard();
}

for (let i = randomNumber; i < 2*randomNumber; i++) {
  COLORS[i] = COLORS[i-randomNumber];
}

function generateBoard() {
  let r = Math.floor(Math.random()*256 + 1)
  let g = Math.floor(Math.random()*256 + 1)
  let b = Math.floor(Math.random()*256 + 1)
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

console.log(COLORS);

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add("color");
    newDiv.setAttribute("id", color)
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
console.log(document);
//Button to begin game and display scoreboard
let displayScore;
beginButton.addEventListener("click", function (e) {
  displayScore = document.getElementById("scoreBrd");
  displayScore.style.display = "inline-block";
  displayScore.innerText = "Score: 0";
  e.target.style.display = 'none';
  bestScoreValue.style.display = "none";
  currentColors = document.getElementsByClassName("color");
  for (let color of currentColors) {
    color.style.display = 'inline-block';
  }})



// TODO: Implement this function!
let card1;
let card2;
let card1Color;
let card2Color;
let disabledHandleClick = false;
let scoreBoard=0;

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  
  //check if two cards are showing, prevent clicking if so
  if (disabledHandleClick === true) {
    return;
  }

  //set up variable to check styles and clickability
  var gameCounter = 0;

  //set up for loop to check number of cards with no style or white background
  currentColors = document.getElementsByClassName("color")

  //set up ScoreBoard variable to track clicks on cards
  let scoreVariable = Number((Math.round(1/currentColors.length*100)/100).toFixed(2));
  scoreBoard += Math.trunc(scoreVariable*100);
  console.log(scoreBoard);
  displayScore.textContent = "Score: " + scoreBoard;

  for (let color of currentColors) {
    if (!color.style.backgroundColor || color.style.backgroundColor === "white") {
      gameCounter += 1;
    }
  }
  if (gameCounter === 1) {
    restartBtn = document.getElementById("restartBtn");
    restartBtn.style.cursor = "pointer";
    let bestScore = localStorage.getItem("BestScore");
    bestScore = parseInt(bestScore);
    if (scoreBoard < bestScore || !bestScore) {
      bestScore = scoreBoard;
      localStorage.setItem("BestScore", bestScore);
      console.log(localStorage.getItem("BestScore"));
    }
    
    restartBtn.addEventListener("click", function () {
      location.reload();
    })
    restartBtn.style.display = "inline-block";
    youWon = document.getElementById("winner");
    youWon.style.display = "inline-block";
    
  }
  console.log(gameCounter);
  console.log(gameCounter % 2); 



    if (gameCounter % 2 === 0) {
      card1 = event.target;
      card1.removeEventListener("click", handleCardClick);
      console.log(card1);
      card1Color = event.target.id;
      event.target.style.backgroundColor = card1Color;
      return 0;
    }  
    else if (gameCounter % 2 === 1) {
      card2 = event.target;
      card2.removeEventListener("click", handleCardClick);
      console.log(card2);
      console.log(card1);
      card2Color = event.target.id;
      event.target.style.backgroundColor = card2Color;
    }
    else {
      return 1;
    }

    if (card1Color === card2Color) {
      return 0;
    }
    else {
          disabledHandleClick = true;
          setTimeout(function() {
            card1.style.backgroundColor = "white";
            card2.style.backgroundColor = "white";
            disabledHandleClick = false;
            card1.addEventListener("click", handleCardClick);
            card2.addEventListener("click", handleCardClick);      
            return;
          }, 1000);
        }
          
    }

// when the DOM loads
createDivsForColors(shuffledColors);

