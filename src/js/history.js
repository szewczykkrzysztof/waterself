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

for (let i=0; i < localStorage.length; i++) {
    const historicalData = localStorage.key(i);
    const glassNumber = localStorage.getItem(localStorage.key(i));
    console.log(`${historicalData} wypiłeś : ${glassNumber} szklanek`);
    const drunkGlass = {
        data : historicalData,
        value : glassNumber,
    }
    console.log(drunkGlass);
};
