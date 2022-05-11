const words = [
  "sajad",
  "mehrnaz",
  "parham",
  "soheil",
  "mahsa",
  "nikta",
  "nima",
  "sarina",
  "negin",
  "sam",
  "pooya",
  "khashayar",
  "mehdi",
];
let secretWord = "";
let clicked = [];
let resulte = "";
let mistakes = 0;

function selectWords() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  console.log(secretWord);
  let letters = document.querySelector("#letters").querySelectorAll("div");

  letters.forEach((item) => {
    item.addEventListener("click", buttonHandler);
  });
  window.addEventListener("keydown", keyHandler);
}

function checkWon() {
  if (resulte === secretWord) {
    document.getElementById("gameover").style.display = "block";
    document.querySelector("#image").querySelector("img").src =
      "./assets/winner.png";
  }
}

function checklose() {
  if (mistakes === 6) {
    document.getElementById("gameover").style.display = "block";
    document.querySelector(
      "#clue"
    ).innerHTML = `<p>Random words is ${secretWord}</p>`;
  }
}
function updatePicture() {
  document
    .querySelector("#image")
    .querySelector("img").src = `./assets/hangman${mistakes}.png`;
}
function letterHandler(letter) {
  letter = letter.toLowerCase();
  clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;

  document.getElementById(letter.toUpperCase()).className = "used";

  if (secretWord.indexOf(letter) >= 0) {
    underCorse();
    checkWon();
  } else if (secretWord.indexOf(letter) === -1) {
    mistakes++;
    checklose();
    updatePicture();
  }
}

function buttonHandler(event) {
  letterHandler(event.target.id);
  //   console.log(event.target.id);
}
function keyHandler(event) {
  letterHandler(event.key);
}
function underCorse() {
  let splitedword = secretWord.split("");
  let mappedWord = splitedword.map((item) =>
    clicked.indexOf(item) >= 0 ? item : "_"
  );
  resulte = mappedWord.join("");
  document.querySelector("#clue").querySelector("p").innerText = resulte;
  console.log(mappedWord);
}
selectWords();
underCorse();

document
  .getElementById("gameover")
  .querySelector("button")
  .addEventListener("click", function () {
    location.reload();
  });
