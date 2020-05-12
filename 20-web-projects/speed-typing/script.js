const word = document.querySelector("#word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const words = ["one", "two", "three", "four", "five", "six"];
let randomWord;

let score = 0;

let time = 10;

// set diff to value in local storage or to medium if its not found in local storage
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// set difficulty select value
difficultySelect.value = difficulty;

//start counting down
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}
const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//game over show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p> Your final score is : ${score}</p>
    <button onClick="location.reload()">Reload</button>
    `;

  endgameEl.style.display = "flex";
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
//focus on text on start
text.focus();

addWordToDom();

text.addEventListener("input", e => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

//settings btn click

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

//settings select

settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
