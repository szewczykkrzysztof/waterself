import "../scss/main.scss";

// ładuję tablicę z historią z local storage poprzez odkodowanie JSON
var drinkTable = JSON.parse(localStorage.getItem("glassHistory"));

// pobieram długość wczytanej tablicy
var historyLength = drinkTable.length;
console.log(`Zapisanych zostało ${historyLength} wpisów w historii`);

//   tworze połacznie z klasą wykresu
var chartBody = document.querySelector(".chart__body");

// tworze połączenie z opisem wykresu
var chartDescription = document.querySelector(".chart__description");

// tworzę połaczenia z przyciskami do zmiany typu wykresu
const chartWeekButton = document.querySelector(".chart__week--js");
const chartMonthButton = document.querySelector(".chart__month--js");

// wywolanie generowania wykresu tygodniowego pod załadowaniu strony
generateChart("week");

// podpinam nasłuch na klik do przycisków
chartWeekButton.addEventListener("click", (e) => generateChart("week"));
chartMonthButton.addEventListener("click", (e) => generateChart("month"));

// funkcja czyszczaca stare elementy
function clearElement(elementClass) {
  // tworze tablice z elementami z wybranej klasy
  var elementsToDelete = document.getElementsByClassName(elementClass);
  // tworze pętlę usuwającą po kolei każdy element z tablicy
  for (var i = elementsToDelete.length - 1; i >= 0; i--) {
    // przypisuję do zmiennej pojedyńczy element z tablicy
    var deletedElement = elementsToDelete[i];
    console.log(deletedElement);
    // element do usunięcia.węzeł rodzica.usuń_dziecko
    deletedElement.parentNode.removeChild(deletedElement);
  }
}

// funkcja dodajaca do słupka opis dnia tygodnia dla zadanej daty
function weekDayDescription(entry) {
  // podpinam dzien tygonia dla aktualnie przetwarzanej daty
  var weekDay = entry.toString().slice(0, 3);
  // przypinam do zmiennej nowy opis słupka wykresu
  var newDescription = document.createElement("span");
  // dodaje nowy dziecko - opis słupka
  chartDescription.appendChild(newDescription);
  // tworzę treść ze zmiennej zawierajacej aktualny dzien tygodnia
  var dayDescription = document.createTextNode(weekDay);
  // dodaję tresc do storzonego opisu
  newDescription.appendChild(dayDescription);
  // dodanie klasy do stworzonego opisu
  newDescription.setAttribute("class", "chart__weekDay");
}

// function created short date in dd/mm format
function shortDateDescription(entry) {
  var entryDate = new Date(entry);
  var dayMonth = `${entryDate.getDate()}/${entryDate.getMonth()}`;
  // przypinam do zmiennej nowy opis słupka wykresu
  var newDescription = document.createElement("span");
  // dodaje nowy dziecko - opis słupka
  chartDescription.appendChild(newDescription);
  // tworzę treść ze zmiennej zawierajacej sktóconą datę
  var dayDescription = document.createTextNode(dayMonth);
  // dodaję tresc do storzonego opisu
  newDescription.appendChild(dayDescription);
  // dodanie klasy do stworzonego opisu
  newDescription.setAttribute("class", "chart__weekDay");
}

function generateChart(chartType) {
  // czyszczenie starych słupków
  clearElement("chart__oneDay");
  // czyszczenie starych opisów
  clearElement("chart__weekDay");

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
  switch (daysNumber) {
    case 7:
      var barWidth = 10;
      var dateDescriptionType = "weekDay";
      break;
    case 30:
      var barWidth = 3;
      var dateDescriptionType = "shortDate";
      break;
  }
  // tworzę pętlę wykonywaną dla zdefiniowanej ilości dni
  for (let i = 0; i <= daysNumber; i++) {
    // generuję dzisiejszą datę
    let dateFromHistory = new Date();

    // ustawiam datę z historii
    dateFromHistory.setDate(dateFromHistory.getDate() - i);

    // konweruję datę na format ISO i wycinam samą datę
    let dateFromHistoryISO = dateFromHistory.toISOString().slice(0, 10);

    // szukam daty w tablicy i przypisuje element do zmiennej przy użyciu funkcji szczałkowej
    var record = drinkTable.find(({ data }) => data === dateFromHistoryISO);
    console.log(record);

    // funkcja tworząca nowy słupek wykresu
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
      newBox.style.setProperty("--chartBarWidth", `${barWidth}%`);
    }

    // sprawdzam czy rekord istnieje
    if (record) {
      // wyszukuję index znalezionego rekordu
      var position = drinkTable.indexOf(record);
      console.log(position);
      // wyciągam datę rekordu(wpisu)
      var recordDate = drinkTable[position].data;
      // wyciągam z obiektu ilość zapisanych szklanek
      var recordValue = drinkTable[position].glassCount;

      //   wywołuję funkcję dodającą nowy słupek wykresu
      addGraphBar(recordDate, recordValue);
    } else {
      // wywołanie funkcji dodającej słupek dla braku wpisu
      addGraphBar(recordDate, 0);
    }
    // dla wykresu tygodniowego
    if (daysNumber == 7) {
      // uruchom generowanie opisu dniami tygodnia
      weekDayDescription(dateFromHistory);
    } else {
      // dla co piatego rekordu (i podzielne przez 5) generuj opis z datą skróconą
      if (i % 5 == 0) {
        shortDateDescription(dateFromHistory);
      }
    }
  }
}
