import "../scss/main.scss";

// podpinam klasę zawierającą historię nawodnienia do zmiennej
const results = document.querySelector(".waterHistory--js");

// wycinam z aktualnej daty ISO 4 znaki (rok) i przypisuję do zmiennej
let year = new Date().toISOString().slice(0, 4);

// tworzę tablicę do przechowywania rekordów dziennych
var drinkTable = [];

for (let key in localStorage) {
  // wycianam pierwsze rok z pobranego klucza
  const keyYear = key.slice(0, 4);

  //   dodaje zmienną tworzącą tworzącą nowy paragraf
  var newParagraph = document.createElement("p");

  if (keyYear === year) {
    // przypisuję wartość klucza do zmiennej
    var keyValue = localStorage.getItem(key);

    console.log(`${key} wypiłeś: ${keyValue}`);

    // dodaje nowy paragraf do sekcji results
    results.appendChild(newParagraph);

    // dodaje atrybut do paragrafu
    newParagraph.setAttribute("class", "waterHistory--record");

    // tworzę zawartość wpisu pobraną z zapisanego obiektu
    var newParagraphContent = document.createTextNode(`${key} : ${keyValue}`);

    // dodaję do utworzonego paragrafu utworzoną zawartość
    newParagraph.appendChild(newParagraphContent);

    // funkcja tworząca nowy rekord
    function record(inputData, inputGlassValue) {
      var arrayRecord = {
        data: inputData,
        // ilość szklanek jest pobierana z wartości klucza
        glassCount: inputGlassValue,
      };
      return arrayRecord;
    }

    // wywołuje funkcję tworzącą obiekt z wpisem z jednego dnia
    var oneDayRecord = record(key, keyValue);
    drinkTable.push(oneDayRecord);
    console.log(drinkTable);
  }
}

// zapisuję tablice do localstorage z wykorzystaniem kodowania obiektów JSON
localStorage.setItem("glassHistory", JSON.stringify(drinkTable));
