import "../scss/main.scss";

// ładuję tablicę z historią z local storage poprzez odkodowanie JSON
var drinkTable = JSON.parse(localStorage.getItem("glassHistory"));

// pobieram długość wczytanej tablicy
var historyLength = drinkTable.length;
console.log(`Zapisanych zostało ${historyLength} wpisów w historii`);

//   tworze połacznie z klasą wykresu
var chartBody = document.querySelector(".chart__body");

// tworzę połaczenia z przyciskami do zmiany typu wykresu
const chartWeekButton = document.querySelector(".chart__week--js");
const chartMonthButton = document.querySelector(".chart__month--js");

generateChart("week");

// podpinam nasłuch na klik do przycisków
chartWeekButton.addEventListener("click", (e) => generateChart("week"));
chartMonthButton.addEventListener("click", (e) => generateChart("month"));

function generateChart(chartType) {
  // wybranie istniejących słupków
  var oldChartBar = document.getElementsByClassName("chart__oneDay");
  // odpalam petle dla każdego elementu z tablicy wybranych elementów
  for (var i = oldChartBar.length - 1; i >= 0; i--) {
    // przypisuję do zmiennej pojedyńczy element z tablicy
    var barToRemove = oldChartBar[i];
    // element do usunięcia.węzeł rodzica.usuń_dziecko
    barToRemove.parentNode.removeChild(barToRemove);
  }

  switch (chartType) {
    case "week":
      console.log(`Wybrałeś ${chartType}`);
      newChart(7);
      // // zamienia pomiedzy przyciskami klasę na active
      chartWeekButton.classList.add("chart__type--active");
      chartMonthButton.classList.remove("chart__type--active");
      break;
    case "month":
      console.log(`Wybrałeś ${chartType}`);
      newChart(30);
      // zamienia pomiedzy przyciskami klasę na active
      chartWeekButton.classList.remove("chart__type--active");
      chartMonthButton.classList.add("chart__type--active");
      break;
  }
}
function newChart(daysNumber) {
  // tworzę pętlę wykonywaną dla zdefiniowanej ilości dnii
  for (let i = 0; i <= daysNumber; i++) {
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
    function addGraphBar(entryData, entryValue) {
      //   przypinam do zmiennej stworzenie nowego słupka wykresu
      var newBox = document.createElement("div");
      // dodaje nowy słupek do wykresu (tworzę dziecko wykresu)
      chartBody.appendChild(newBox);
      // dodaje atrybut klasy do stworzonego słupka
      newBox.setAttribute("class", "chart__oneDay");
      //  ustalam wyskość słupka wykresu
      var barHeight = entryValue * 10;
      //   dodaje wysokosc słupka do zmiennej css
      newBox.style.setProperty("--barHeight", `${barHeight}%`);
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
      addGraphBar(recordDate, recordValue);
    } else {
      // wywołanie funkcji dodającej słupek dla braku wpisu
      addGraphBar(recordDate, 0);
    }
  }
}
