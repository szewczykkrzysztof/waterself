import "../scss/main.scss";

// podpinam klasę zawierającą historię nawodnienia do zmiennej
const results = document.querySelector(".waterHistory--js");

// wycinam z aktualnej daty ISO 4 znaki (rok) i przypisuję do zmiennej
let year = new Date().toISOString().slice(0, 4);

for (let key in localStorage) {
  // wycianam pierwsze rok z pobranego klucza
  const keyYear = key.slice(0, 4);

  //   dodaje zmienną tworzącą tworzącą nowy paragraf
  var newParagraph = document.createElement("p");

  if (keyYear === year) {
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
