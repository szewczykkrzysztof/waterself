import { data } from "autoprefixer";
import "../scss/main.scss";

// uncomment the lines below to enable PWA
import { registerSW } from "./pwa.js";
registerSW();

/* place your code below */

console.log("HELLO 🚀");

// Create link to application element

const glassCounter = document.querySelector(".glass__count-js");
const addGlass = document.querySelector(".addGlass-js");
const removeGlass = document.querySelector(".removeGlass-js");

// Create today string with first 10 character in ISO format
const today = new Date().toISOString().slice(0, 10);

// Load drink history from localstorage

let savingHistory = JSON.parse(localStorage.getItem(`glassHistory`));

console.log(`Dzisiaj jest ${today}`);

if (savingHistory) {
  // glassCounter.innerHTML = storageCounter;
} else {
  // create empty history table
  var historyDrinkTable = [];

  // save table to local storage
  localStorage.setItem("glassHistory", JSON.stringify(historyDrinkTable));
  glassCounter.innerHTML = 0;
}

// function which do operation on last record in history table

function entryManipulate(operation) {
  // attach last element from history array
  var lastEntry = savingHistory[savingHistory.length - 1];

  // assign saved record value to counter variable
  var storageCounter = lastEntry.glassCount;

  // check if last entry is saved today
  if (lastEntry.data === today) {
  } else {
    // if no entry for today set counter to 0
    storageCounter = 0;
  }
}

// Add +1 to glass counter on localstorage
// addGlass.addEventListener("click", (e) => {
//   e.preventDefault();

// })

// Substract by 1 glass counter on local storage
// removeGlass.addEventListener("click", (e) => {
//   if (storageCounter > 0) {
//     e.preventDefault();
//     storageCounter--;
//     glassCounter.innerHTML = storageCounter;
//     localStorage.setItem(`${today}`, storageCounter);
//   } else {
//     e.preventDefault();
//   }
// });
