import "../scss/main.scss";

// zapisuję dzisiejszą datę wycinając ze stringa tylko rok dzień i miesiąc
const todayISO = new Date().toISOString().slice(0, 10);
console.log(`Dzisiejsza data ISO to ${todayISO}`);

// pobieram z localstorage wartość obiektu, którego kluczem jest dzisiejsza data
const todayInStorage = localStorage.getItem(todayISO);

// jeśli w localstorage nie ma jeszcze obiektu z dzisiejszą datą pokaże null
console.log(`Zapisana wartość w local storage to ${todayInStorage}`);

// pobieram date
const today = new Date();

// Odejmuję od dzisiejszej daty dobę wyrażoną w milisekundach i za pomocą funkcji Date uzyskuję datę wczorajszą
const yesterday = new Date(today - 86400000);

console.log(today);
console.log(`Wczoraj był ${yesterday}`);

console.log(localStorage);

for (let key in localStorage) {
    console.log(`${key} wypiłeś: ${localStorage.getItem(key)}`)
}