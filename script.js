const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const message = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

//   let selectedWord = words[Math.floor(Math.random() * words.length)];

//   const correctLetters = ["a", "e", "i", "o", "u", "t"];
//   const wrongLetters = [];

//   //Show hidden word: get selected word => turn into array (split) => map through it and return a letter or a blank and turn it back to string(join)
//   function displayWord() {
//     wordEl.innerHTML = `
//   ${selectedWord
//     .split("")
//     .map(
//       (letter) => `<span class="letter">
//     ${correctLetters.includes(letter) ? letter : ""}
//     </span>
//   `
//     )
//     .join("")}
//   `;

//     //Combine correctLetters into 1 line: replace the new line character with empty string
//     const innerWord = wordEl.innerText.replace(/\n/g, "");

//     if (innerWord === selectedWord) {
//       message.innerText = `Congratulations! You won the game! 😃`
//       popup.style.display = "flex"
//     }
//   }

//   displayWord();

//   //Update wrong letters
//   function updateWrongLettersEl() {}

//   //Show notification
//   function showNotification() {
//     notification.classList.add("show");
//     //Disappear in 2s
//     setTimeout(() => {
//       notification.classList.remove("show");
//     }, 2000);
//   }

//   //Keydown press on letter
//   window.addEventListener("keydown", (e) => {
//     if (e.keyCode >= 65 && e.keyCode <= 90) {
//       const letter = e.key;

//       if (selectedWord.includes(letter) && !correctLetters.includes(letter)) {
//         correctLetters.push(letter);
//         displayWord();
//       } else if (
//         selectedWord.includes(letter) &&
//         correctLetters.includes(letter)
//       ) {
//         showNotification();
//       } else if (
//         !selectedWord.includes(letter) &&
//         !wrongLetters.includes(letter)
//       ) {
//         wrongLetters.push(letter);
//         updateWrongLettersEl();
//       } else {
//         showNotification();
//       }
//     }
//   });
// }

//Get random words from API
async function randomWord() {
  const res = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  const selectedWord = await res.json();

  const correctLetters = ["a", "e", "i", "o", "u", "t"];
  const wrongLetters = [];

  //Show hidden word: get selected word => turn into array (split) => map through it and return a letter or a blank and turn it back to string(join)
  function displayWord() {
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
}
randomWord();
// 'Unfortunately you lost. 😕'//
