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

// Create today string
const today = new Date().toISOString().slice(0, 10);
console.log(`Dzisiaj jest ${today}`);

// Loading storage glass counter

let storageCounter = localStorage.getItem(`${today}`);

if (storageCounter) {
  glassCounter.innerHTML = storageCounter;
} else {
  console.log("Licznik nie jest zapisany w localstorage");
  glassCounter.innerHTML = 0;
}

// Add +1 to glass counter on localstorage
addGlass.addEventListener("click", (e) => {
  e.preventDefault();
  storageCounter++;
  glassCounter.innerHTML = storageCounter;
  localStorage.setItem("glassCounter", storageCounter);
});

// Substract by 1 glass counter on local storage
removeGlass.addEventListener("click", (e) => {
  if (storageCounter > 0) {
    e.preventDefault();
    storageCounter--;
    glassCounter.innerHTML = storageCounter;
    localStorage.setItem("glassCounter", storageCounter);
  } else {
    e.preventDefault();
  }
});

console.log(`Wypiłeś ${glassCounter.innerHTML} szklanek,`);
console.log(`W pamieci jest zapisane ${storageCounter}`);
