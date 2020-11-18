import "../scss/main.scss";

// ładuję tablicę z historią z local storage poprzez odkodowanie JSON
var drinkTable = JSON.parse(localStorage.getItem("glassHistory"));

// pobieram długość wczytanej tablicy
var historyLength = drinkTable.length;
console.log(`Zapisanych zostało ${historyLength} wpisów w historii`);

//   tworze połacznie z klasą wykresu
var chartBody = document.querySelector(".chart__body");

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

  // funkcja tworząca nowy blok
  function addGraphBar(entryValue) {
    //   przypinam do zmiennej stworzenie nowego słupka wykresu
    var newBox = document.createElement("div");
    // dodaje nowy słupek do wykresu (tworzę dziecko wykresu)
    chartBody.appendChild(newBox);
    // dodaje atrybut klasy do stworzonego słupka
    newBox.setAttribute("class", "chart__oneDay");
   //  ustalam wyskość słupka wykresu
   var barHeight = entryValue * 10;
        //   dodaje wysokosc słupka do zmiennej css
    newBox.style.setProperty("--barHeight", `${barHeight}px`);
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

    //   wywołuję funkcję dodającą nowy słupek wykresu
    addGraphBar(recordValue);
  } else {
    // wywołuję dodanie nowej linii z aktualnie tetstowaną datą i wartością 0
    //  addBox(todayISO, 0);
  }
}
