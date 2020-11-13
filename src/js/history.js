import "../scss/main.scss";

// podpinam klasę zawierającą historię nawodnienia do zmiennej
const results = document.querySelector(".waterHistory--js");

// wycinam z aktualnej daty ISO 7 znaków i przypisuję do zmiennej aktualnego miesiąca
let mounth = new Date().toISOString().slice(0, 7);

for (let key in localStorage) {
  // wycianam pierwsze 7 znaków z klucza i przypisuję do zmiennej
  const keyMounth = key.slice(0, 7);

  //   dodaje zmienną tworzącą tworzącą nowy paragraf
  var newParagraph = document.createElement("p");

  if (keyMounth === mounth) {
    console.log(`${key} wypiłeś: ${localStorage.getItem(key)}`);

    // dodaje nowy paragraf do sekcji results
    results.appendChild(newParagraph);

    // dodaje atrybut do paragrafu
    newParagraph.setAttribute("class", "waterHistory--record");

    // tworzę zawartość wpisu pobraną z zapisanego obiektu
    var newParagraphContent = document.createTextNode(
      `${key} : ${localStorage.getItem(key)}`
    );

    // dodaję do utworzonego paragrafu utworzoną zawartość
    newParagraph.appendChild(newParagraphContent);
  }
}
