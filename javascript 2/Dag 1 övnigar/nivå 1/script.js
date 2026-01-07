// nivå 1

let count = 0;
// Skapar variabel för räknaren med startvärde 0

const button = document.createElement("button");
// Skapar en knapp

button.textContent = "Klicka här";
// Sätter knappens text

const output = document.createElement("p");
// Skapar en paragraf för att visa räknarens värde

output.textContent = `Räknare: ${count}`;
// Sätter paragrafens initiala text

document.body.appendChild(button);
// Lägger till knappen i dokumentets body

document.body.appendChild(output);
// Lägger till paragrafen i dokumentets body

button.addEventListener("click", () => {
  count++;
  // Ökar räknarens värde med 1 vid varje klick

  output.textContent = `Räknare: ${count}`;
  // Uppdaterar paragrafens text med det nya värdet
}); 