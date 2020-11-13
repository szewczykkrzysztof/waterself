import "../scss/main.scss";

// podpinam klasę zawierającą historię nawodnienia do zmiennej
const results = document.querySelector(".waterHistory--js");

// zapisuję dzisiejszą datę w formacie ISO wycinając ze stringa tylko rok dzień i miesiąc
let todayISO = new Date().toISOString().slice(0, 10);
console.log(`Dzisiejsza data ISO to ${todayISO}`);

// pobieram z localstorage wartość obiektu, którego kluczem jest dzisiejsza data
const todayInStorage = localStorage.getItem(todayISO);

// jeśli w localstorage nie ma jeszcze obiektu z dzisiejszą datą pokaże null
console.log(`Zapisana wartość w local storage to ${todayInStorage}`);

// pobieram date
const today = new Date();

// Odejmuję od dzisiejszej daty dobę wyrażoną w milisekundach i za pomocą funkcji Date uzyskuję datę wczorajszą
const yesterday = new Date(today - 86400000);

// Wczorajsza data
console.log(`Wczoraj był ${yesterday}`);
// Wczorajsza data w formacie ISO
console.log(`Wczoraj w ISO był: ${yesterday.toISOString()}`);
const yesterdayShort = yesterday.toISOString().slice(0, 10);

console.log(
  `Wczoraj wypiłeś szklanek: ${localStorage.getItem(yesterdayShort)}`
);

// wycinam z aktualnej daty ISO 7 znaków i przypisuję do zmiennej aktualnego miesiąca
let mounth = todayISO.slice(0, 7);

// tworzę string z aktualnej daty i wycinam z niego skrót miesiąca
const mounthName = Date(mounth).slice(4, 7);

console.log(`Wyświetlam dane dla miesiąca: ${mounthName}`);

// tworzę tabelę na wyniki
const historyTable = [];

for (let key in localStorage) {
  // wycianam pierwsze 7 znaków z klucza i przypisuję do zmiennej
  const keyMounth = key.slice(0, 7);

  //   dodaje zmienną tworzącą tworzącą nowy paragraf
  var newParagraph = document.createElement("p");

  if (keyMounth === mounth) {
    console.log(`${key} wypiłeś: ${localStorage.getItem(key)}`);

    // dodaje nowy paragraf do sekcji results
    results.appendChild(newParagraph);

    // tworzę zawartość wpisu pobraną z zapisanego obiektu
var newParagraphContent = document.createTextNode(`${key} : ${localStorage.getItem(key)}`);

// dodaję do utworzonego paragrafu utworzoną zawartość
newParagraph.appendChild(newParagraphContent);

     historyTable.push(`${key} : ${localStorage.getItem(key)}`);
  }
}

console.log(historyTable);
