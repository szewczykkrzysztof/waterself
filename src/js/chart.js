import "../scss/main.scss";
import {polishWeekDay} from './modules/daysFunctions.js'

// ładuję tablicę z historią z local storage poprzez odkodowanie JSON
var drinkTable = JSON.parse(localStorage.getItem("glassHistory"));

// pobieram długość wczytanej tablicy
var historyLength = drinkTable.length;
console.log(`Zapisanych zostało ${historyLength} wpisów w historii`);

//   tworze połacznie z klasą wykresu
var chartBody = document.querySelector(".chart__body");

// tworze połączenie z opisem wykresu
var chartDescription = document.querySelector(".chart__description");

// podpinam klasę pod którą pojawi się historia nawodnienia do zmiennej
const results = document.querySelector(".waterHistory--js");

// tworzę połaczenia z przyciskami do zmiany typu wykresu
const chartWeekButton = document.querySelector(".chart__week--js");
const chartMonthButton = document.querySelector(".chart__month--js");

// wywolanie generowania wykresu tygodniowego pod załadowaniu strony
generateChart("week");
generateDrinkHistory(7);

// podpinam nasłuch na klik do przycisków
chartWeekButton.addEventListener("click", (e) => {
  // clear old history element
  clearElement("chart__oneDay");
  clearElement("chart__weekDay");
  clearElement("waterHistory--record");
  // execute generation new chart
  generateChart("week");
  // generate list of daily drinks for 7 days
  generateDrinkHistory(7);
});
chartMonthButton.addEventListener("click", (e) => {
  // czyszczenie starych opisów
  clearElement("chart__oneDay");
  clearElement("chart__weekDay");
  clearElement("waterHistory--record");
  generateChart("month");
  generateDrinkHistory(30);
});

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
function weekDayDescription(entryDate) {
  // przypinam do zmiennej nowy opis słupka wykresu
  var newDescription = document.createElement("span");
  // dodaje nowy dziecko - opis słupka
  chartDescription.appendChild(newDescription);
  // podstawiam do nowego elementu html wynik z funkcji zwracającej polski dzień tygodnia
  newDescription.innerHTML = polishWeekDay(entryDate);
  // dodanie klasy do stworzonego opisu
  newDescription.setAttribute("class", "chart__weekDay");
}

// function created short date in dd/mm format
function shortDateDescription(entryDate) {
  // zapisuję do pobrany z obiektu z datą dzień/ miesiąc (miesiące są w obiekcie zapisane w zakresie 0..11, więc należy dodać 1)
  var dayMonth = `${entryDate.getDate()}/${entryDate.getMonth() + 1}`;
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
  switch (chartType) {
    case "week":
      // wywołuje generownie nowego wykresu z 7 słupkami
      newChart(7);
      // // zamienia pomiedzy przyciskami klasę na active
      chartWeekButton.classList.add("chart__type--active");
      chartMonthButton.classList.remove("chart__type--active");
      // usuwa klasę dla opisu miesięcznego
      chartDescription.classList.remove("chart__description-month");
      break;
    case "month":
      // wywołuje generownie nowego wykresu z 30 słupkami
      newChart(30);
      // zamienia pomiedzy przyciskami klasę na active
      chartWeekButton.classList.remove("chart__type--active");
      chartMonthButton.classList.add("chart__type--active");
      // dodaje klasę dla opisu miesięcznego (grid z 7 kolumnami), aby opisy pokrywały się ze słupkami
      chartDescription.classList.add("chart__description-month");
      break;
  }
}
// funkcja rysująca nowy wykres
function newChart(daysNumber) {
  // w zależności od ilości słupków ustaw ich szerokość
  switch (daysNumber) {
    case 7:
      var barWidth = 10;
      break;
    case 30:
      var barWidth = 3;
      break;
  }
  // tworzę pętlę wykonywaną dla zdefiniowanej ilości dni
  for (let i = 0; i <= daysNumber - 1; i++) {
    // generuję dzisiejszą datę
    let dateFromHistory = new Date();

    // ustawiam datę z historii
    dateFromHistory.setDate(dateFromHistory.getDate() - i);

    // konweruję datę na format ISO i wycinam samą datę
    let dateFromHistoryISO = dateFromHistory.toISOString().slice(0, 10);
    // szukam daty w tablicy i przypisuje element do zmiennej przy użyciu funkcji szczałkowej
    var record = drinkTable.find(({ data }) => data === dateFromHistoryISO);

    // funkcja tworząca nowy słupek wykresu
    function addGraphBar(entryData, entryValue) {
      //   przypinam do zmiennej stworzenie nowego słupka wykresu
      var newBox = document.createElement("div");
      // dodaje nowy słupek do wykresu (tworzę dziecko wykresu)
      chartBody.appendChild(newBox);
      // dodaje atrybut klasy do stworzonego słupka
      newBox.setAttribute("class", "chart__oneDay");
      //  ustalam wyskość słupka wykresu
      var barHeight = entryValue * 30;
      //   dodaje wysokosc słupka do zmiennej css
      newBox.style.setProperty("--barHeight", `${barHeight}px`);
      newBox.style.setProperty("--chartBarWidth", `${barWidth}%`);
    }

    // sprawdzam czy rekord istnieje
    if (record) {
      // wyszukuję index znalezionego rekordu
      var position = drinkTable.indexOf(record);
      console.log(`Index znalezionego rekordu to: ${position}`);
      // wyciągam datę rekordu(wpisu)
      var recordDate = drinkTable[position].data;
      // wyciągam z obiektu ilość zapisanych szklanek
      var recordValue = drinkTable[position].glassCount;
      console.log(`Data rekordu: ${recordDate}, ilość: ${recordValue}`);

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

function generateDrinkHistory(inputLength) {
  for (let i = 0; i <= inputLength - 1; i++) {
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
}
