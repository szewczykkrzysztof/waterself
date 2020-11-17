import "../scss/main.scss";

// podpinam klasę pod którą pojawi się historię nawodnienia do zmiennej
const results = document.querySelector(".waterHistory--js");

// ładuję tablicę z historią z local storage poprzez odkodowanie JSON
var drinkTable = JSON.parse(localStorage.getItem("glassHistory"));

// tworzę pętlę, która będzie wykonywana dla 30 elementów z tablicy

for (let i = 0; i <= 29; i++) {
  // generuję dzisiejszą datę
  let today = new Date();

  // ustawiam datę z historii
  today.setDate(today.getDate() - i);

  // konweruję datę na format ISO i wycinam samą datę
  let todayISO = today.toISOString().slice(0, 10);

  // szukam daty w tablicy i przypisuje element do zmiennej przy użyciu funkcji szczałkowej
  var record = drinkTable.find(({ data }) => data === todayISO);
  console.log(record);

  // tworze funkcję dodającą nową linię w dokumencie html

  function addParagraph(entryDate, entryValue) {
    //   dodaje zmienną tworzącą tworzącą nowy paragraf
    var newParagraph = document.createElement("p");

    // dodaje nowy paragraf do sekcji results (tworzę jego dziecko)
    results.appendChild(newParagraph);

    // dodaje atrybut do paragrafu
    newParagraph.setAttribute("class", "waterHistory--record");

    // tworzę zawartość węzła tekstowego z wyciągniętych z obiektu wartości
    var newParagraphContent = document.createTextNode(
      `${entryDate} : ${entryValue}`
    );

    // dodaję do utworzonego paragrafu storzony tekst
    newParagraph.appendChild(newParagraphContent);
  }

  // sprawdzam czy rekord istnieje
  if (record) {
    // wyszukuję index znalezionego rekordu
    var position = drinkTable.indexOf(record);
    console.log(position);
    // wysiagam datę rekordu(wpisu)
    var recordDate = drinkTable[position].data;
    // wyciągam z obiektu ilość zapisanych szklanek
    var recordValue = drinkTable[position].glassCount;
    // przeliczam szklanki na litry
    recordValue = recordValue * 0.25;
    // dodaję symbol litra
    recordValue = recordValue + "  l";
    // wywołuję fukcję dodającą nowa linie z danymi wyciagniętymi z pobranego rekordu
    addParagraph(recordDate, recordValue);
  } else {
    // wywołuję dodanie nowej linii z aktualnie tetstowaną datą i wartością 0
    addParagraph(todayISO, "0");
  }
}
