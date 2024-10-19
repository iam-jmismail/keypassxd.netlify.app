const clickButton = document.getElementById("click-button");
const copyButton = document.getElementById("copy-button");
const feedbackText = document.getElementById("feedback-text");

// Generate a Random Password
const lettersUpperCase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const lettersLowerCase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbols = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  "|",
  ";",
  ":",
  ",",
  ".",
  "<",
  ">",
  "/",
  "?",
];

let dictionary = [];

let password = "";

// Password Generator
function generatePassword(characters, passwordLength) {
  let password = "";
  for (let p = 0; p <= passwordLength; p++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

const isLetter = (char) =>
  [...lettersLowerCase, ...lettersUpperCase].includes(char);

// Preselect options on load
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("numbers-checkbox").checked = true;
  document.getElementById("symbols-checkbox").checked = true;
  document.getElementById("upcase-letters-checkbox").checked = true;
  document.getElementById("lcase-letters-checkbox").checked = true;

  fetch("./words.json")
    .then((resp) => resp.json())
    .then((resp) => {
      dictionary = resp;
    });
});

function wordStartWith(letter) {
  const word = dictionary.find((word) => word.startsWith(letter.toLowerCase()));

  return word;
}

clickButton.addEventListener("click", async function (e) {
  e.preventDefault();

  document.getElementById("password-length").disabled = false;
  const rememberText = document.getElementById("password-placeholder");

  let characters = [];
  password = "";

  const passwordLength = document.getElementById("password-length").value || 10;
  const hasNumbers = document.getElementById("numbers-checkbox").checked;
  const hasSymbols = document.getElementById("symbols-checkbox").checked;
  const hasUpperCase = document.getElementById(
    "upcase-letters-checkbox"
  ).checked;
  const hasLowerCase = document.getElementById(
    "lcase-letters-checkbox"
  ).checked;

  if (hasNumbers) {
    characters = [...characters, ...numbers];
  }

  if (hasSymbols) {
    characters = [...characters, ...symbols];
  }

  if (hasUpperCase) {
    characters = [...characters, ...lettersUpperCase];
  }

  if (hasLowerCase) {
    characters = [...characters, ...lettersLowerCase];
  }

  if (!characters.length) {
    feedbackText.innerHTML = `<p> Please select options</p>`;
  } else {
    password = generatePassword(characters, passwordLength);

    const remember = password.split("").map((char) => {
      if (isLetter(char)) {
        const word = wordStartWith(char);

        if (char === char.toUpperCase()) {
          return `<span> <strong>${char.toUpperCase()}</strong>${word.slice(
            1
          )}</span>`;
        }

        return `<span> ${word}</span>`;
      } else return char;
    });

    rememberText.innerHTML = `<b>Hint: </b>` + remember.join(" ");
    feedbackText.innerHTML = `<p> ${password}</p>`;
  }
});

copyButton.addEventListener("click", function () {
  navigator.clipboard.writeText(password);
});
