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

function entryManipulate(glassValueToAdd) {
  // attach last element from history array
  var lastEntry = savingHistory[savingHistory.length - 1];

  // check if last entry is saved today
  if (lastEntry.data === today) {
    // remove last array element
    // historyDrinkTable.pop();

    // assign saved record value to counter variable
    var storageCounter = lastEntry.glassCount;

    // check if stored glass value > 0
    if (storageCounter > 0) {
      // add or substract glass to counter
      storageCounter = storageCounter + glassValueToAdd;
    }
  } else {
    // if no entry for today set counter to 0
    storageCounter = 0;
  }
  // inject glass number value to html element
  glassCounter.innerHTML = storageCounter;
  console.log(`Aktualna ilość szklanek: ${storageCounter}`);

  // add today record to array
  savingHistory.push({"data" :today, "glassCount" : storageCounter});
  console.log(savingHistory);
}

// Add +1 to glass counter on localstorage
addGlass.addEventListener("click", (e) => {
  // prevent from preloading page
  e.preventDefault();

  // execute function with input value +1
  entryManipulate(1);
});

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
