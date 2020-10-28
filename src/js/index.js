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

// Loading storage glass counter

let storageCounter = localStorage.getItem("glassCounter");

if (storageCounter) {
  glassCounter.innerHTML = storageCounter;
} else {
  console.log("Licznik nie jest zapisany w localstorage");
}

addGlass.addEventListener("click", (e) => {
  e.preventDefault();
  storageCounter++;
  glassCounter.innerHTML = storageCounter;
  localStorage.setItem("glassCounter", storageCounter);
});

console.log(`Wypiłeś ${glassCounter.innerHTML} szklanek,`);
console.log(`W pamieci jest zapisane ${storageCounter}`);
