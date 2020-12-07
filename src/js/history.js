import "../scss/main.scss";
// podpinam klawisz do importu
const results = document.querySelector(".import__history--js");

// ładuję tablicę z historią z local storage poprzez odkodowanie JSON
var drinkTable = JSON.parse(localStorage.getItem("glassHistory"));

results.addEventListener('click', (e) => importHistory());

function importHistory() {
  if (drinkTable) {
    console.log("Tablica istnieje");
    addNewRecord();
  } else {
    console.log("Zakładam nową tablicę");
    drinkTable = [];
    addNewRecord();
  }
  console.log(drinkTable);
}

function addNewRecord() {
  for (let i = 0; i <= 29; i++) {
    // generuję dzisiejszą datę
    let today = new Date();

    // ustawiam datę z historii
    today.setDate(today.getDate() - i);

    // konweruję datę na format ISO i wycinam samą datę
    let todayISO = today.toISOString().slice(0, 10);
    console.log(todayISO);

    var newRecordValue = localStorage.getItem(todayISO);
    console.log(newRecordValue);

    if (newRecordValue) {
      console.log(i);
      console.log(drinkTable);
      drinkTable.unshift({ data: todayISO, glassCount: newRecordValue });
      console.log(drinkTable);
    }
  }
  localStorage.setItem("glassHistory", JSON.stringify(drinkTable));
}
