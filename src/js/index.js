import { data } from "autoprefixer";
import "../scss/main.scss";

// uncomment the lines below to enable PWA
import { registerSW } from "./pwa.js";
registerSW();

// Create link to application element

const glassCounter = document.querySelector(".glass__count-js");
const addGlass = document.querySelector(".addGlass-js");
const removeGlass = document.querySelector(".removeGlass-js");

// Create today string with first 10 character in ISO format
const today = new Date().toISOString().slice(0, 10);

// Load drink history from localstorage

let savingHistory = JSON.parse(localStorage.getItem(`glassHistory`));

// check if history was stored in localstorage
if (savingHistory) {
  // attach last element from history array
  var lastEntry = savingHistory[savingHistory.length - 1];
  console.log(
    `Ostatni element z historii to ${lastEntry.data} a liczba szklanek to ${lastEntry.glassCount}`
  );
  // check if last entry is saved today
  if (lastEntry.data === today) {
    // assign saved record value to counter variable
    var storageCounter = lastEntry.glassCount;
    // check if saved value is a number
    if (typeof storageCounter == "number") {
      console.log(`Z historii wczytano: ${storageCounter} szklanek`);
    } else {
      storageCounter = 0;
      console.log(
        "Niestety zapisana ilość szklanek nie jest liczbą, ustawiam 0"
      );
    }
  } else {
    console.log("Dzisiaj jeszcze nic nie dodałeś");
    // if no record for today set local glass counter to 0
    storageCounter = 0;
  }
  // inject stored counter value to html counter
  glassCounter.innerHTML = storageCounter;
} else {
  // create today initial record
  var lastEntry = { data: today, glassCount: 0 };
  // create new array with today record
  savingHistory = [lastEntry];
  // save array to local storage
  localStorage.setItem("glassHistory", JSON.stringify(savingHistory));
  // set local glass counter variable
  var storageCounter = 0;
  glassCounter.innerHTML = 0;
}

// function which do operation on last record in history table

function entryManipulate(glassValueToAdd) {
  // check if last entry is saved today
  if (lastEntry.data === today) {
    // last record is saved in variable, remove last array element to do space on updated record
    savingHistory.pop();
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

  console.log(`Koniec petli, dodaję ${storageCounter} do htmla i zapisuję do localstorage`);

  // inject glass number value to html element
  glassCounter.innerHTML = storageCounter;

  // add today record to array
  savingHistory.push({ data: today, glassCount: storageCounter });

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
removeGlass.addEventListener("click", (e) => {
  if (storageCounter > 0) {
    e.preventDefault();
    // execute function with substract value
    entryManipulate(-1);
  } else {
    // if glass counter = 0 no reaction (prevent reloading page)
    e.preventDefault();
  }
});
