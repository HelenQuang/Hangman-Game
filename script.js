const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const message = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

const correctLetters = [];
const wrongLetters = [];
let playable = true;
let selectedWord;

//Get random words from API
async function randomWord() {
  const res = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  const data = await res.json();
  return data;
}

//Show hidden word: get selected word => turn into array (split) => map through it and return a letter or a blank and turn it back to string(join)
const displayWord = () => {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) => `<span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
  `
    )
    .join("")}
  `;

  //Combine correctLetters into 1 line: replace the new line character with empty string
  const innerWord = wordEl.innerText.replace(/[ \n]/g, "");

  if (innerWord == selectedWord) {
    message.innerText = `Congratulations! You won the game! 😃`;
    popup.style.display = "flex";

    playable = false;
  }
};

//Update wrong letters
const updateWrongLettersEl = () => {
  //Show wrong letters
  wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong answers:</p>` : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  //Show figure parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //Show losing message
  if (wrongLetters.length === figureParts.length) {
    message.innerText = `Unfortunately! You lost the game 😕`;
    popup.style.display = "flex";

    playable = false;
  }
};

//Show notification on retyped letters
function showNotification() {
  notification.classList.add("show");

  //Disappear in 2s
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key;

      if (selectedWord.includes(letter) && !correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else if (
        selectedWord.includes(letter) &&
        correctLetters.includes(letter)
      ) {
        showNotification();
      } else if (
        !selectedWord.includes(letter) &&
        !wrongLetters.includes(letter)
      ) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

const gamePlay = async () => {
  playable = true;
  wrongLetters.splice(0);
  correctLetters.splice(0);
  const fetchWords = await randomWord();

  selectedWord = fetchWords[0];

  console.log(selectedWord);

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
};

playAgainBtn.addEventListener("click", async () => {
  gamePlay();
});

gamePlay();
