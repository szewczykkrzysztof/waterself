// funkcja zwracająca skrót polskiego dnia tygodnia dla zadanej daty
export function polishWeekDay(entryDate) {
    // definiuję tablicę z polskimi dniami tygodnia
    const polishDay = ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"];
    // pobieram numer dnia tygodnia i podstawiam go jako index do tablicy z polskimi dniami tygodnia
    var weekDay = polishDay[entryDate.getDay()];
    // zwracam jako wynik działąnia funkcji wartość polskiego dnia tygonia
    return weekDay;
  }