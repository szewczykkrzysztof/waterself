import "../scss/main.scss";

// tworze zmienna z aktulną datą i czasem
var today = new Date();

// pętla wykona się i+1 razy
for (let i = 10; i > -1; i--) {

//    odejmuję od aktualnego czasu i * doba wyrażona w milisekundach
   var numberTimeValue = (today -(i*86400000));

   //    przypisuję do zmiennej nową datę utworzoną z milisekund
   var historicTime = new Date(numberTimeValue);

   //    przekształcam datę na format iso i wycinam tylko datę
   var isoDay = historicTime.toISOString().slice(0, 10);
   console.log(isoDay);
}
