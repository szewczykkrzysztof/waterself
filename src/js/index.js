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

// check if history was stored in localstorage
if (savingHistory) {
  // attach last element from history array
  var lastEntry = savingHistory[savingHistory.length - 1];
  // check if last entry is saved today
  if (lastEntry.data === today) {
    var storageCounter = lastEntry.glassCount;
    // assign saved record value to counter variable
    if (typeof storageCounter == "number") {
      console.log(`Z historii wczytano: ${storageCounter} szklanek`);
    } else {
      storageCounter = 0;
    }
    // inject stored counter value to html counter
    glassCounter.innerHTML = storageCounter;
  }
} else {
  // create array with today record
  var historyDrinkTable = [{ data: today, glassCount: 0 }];
  // save table to local storage
  localStorage.setItem("glassHistory", JSON.stringify(historyDrinkTable));
  glassCounter.innerHTML = 0;
}

// function which do operation on last record in history table

function entryManipulate(glassValueToAdd) {
  console.log(`Wejściowa wartość to ${glassValueToAdd}`);

  // check if last entry is saved today
  if (lastEntry.data === today) {
    console.log("W tablicy jest już dzisiejszy wpis");
    // remove last array element
    savingHistory.pop();
    console.log(savingHistory);
    console.log(`Wczytane zostało szklanek: ${storageCounter}`);
    // check if stored glass value > 0
    if ((storageCounter) => 0) {
      // add or substract glass to counter
      storageCounter = storageCounter + glassValueToAdd;
      // if storage dropped below 0, set counter on 0
      if (storageCounter < 0) {
        storageCounter = 0;
      }
    }
  }
  // inject glass number value to html element
  glassCounter.innerHTML = storageCounter;
  console.log(`Aktualna ilość szklanek: ${storageCounter}`);

  // add today record to array
  savingHistory.push({ data: today, glassCount: storageCounter });
  console.log(savingHistory);
  // remove old localstorage key
  localStorage.removeItem("glassHistory");
  // // add updated key to local storage`
  localStorage.setItem("glassHistory", JSON.stringify(savingHistory));
}

// Add +1 to glass counter on localstorage
addGlass.addEventListener("click", (e) => {
  // prevent from preloading page
  e.preventDefault();

  // execute function with input value +1
  entryManipulate(1);
});

// // Substract by 1 glass counter on local storage
// removeGlass.addEventListener("click", (e) => {
//   if (storageCounter > 0) {
//     e.preventDefault();
//     // execute function with substract value
//     entryManipulate(-1);
//   } else {
//     e.preventDefault();
//   }
// });
