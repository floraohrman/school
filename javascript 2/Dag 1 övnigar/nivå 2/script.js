// Data
const names = ["Alice", "Bob", "Charlie", "Diana", "Ethan"];

// Skapa DOM
const button = document.createElement("button");
button.textContent = "Visa namn";

const list = document.createElement("ul");

document.body.appendChild(button);
document.body.appendChild(list);

// Logik
function showNames() {
  // Rensa listan först
  list.innerHTML = "";

  // Lägg till varje namn som ett listobjekt
  names.forEach(name => {
    const listItem = document.createElement("li");
    listItem.textContent = name;
    list.appendChild(listItem);
  });
}

// Eventlyssnare
button.addEventListener("click", showNames);