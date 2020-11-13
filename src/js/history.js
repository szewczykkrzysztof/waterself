import "../scss/main.scss";

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

console.log(`Wczoraj wypiłeś szklanek: ${localStorage.getItem(yesterdayShort)}`);

