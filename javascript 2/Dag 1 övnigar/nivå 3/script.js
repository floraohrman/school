// ata
const people = [
  { name: "Anna", age: 28 },
  { name: "Bertil", age: 34 },
  { name: "Cecilia", age: 22 },
  { name: "David", age: 45 },
  { name: "Eva", age: 19 }
];

// DOM
const input = document.createElement("input");
input.type = "number";
input.placeholder = "Ange min ålder";

const button = document.createElement("button");
button.textContent = "Filtrera";

const resulDiv = document.createElement("div");

document.body.appendChild(input);
document.body.appendChild(button);
document.body.appendChild(resulDiv);

// Logik
function filterByAge() {
  const minAge = Number(input.value);
  resulDiv.innerHTML = "";

  for (let i = 0; i < people.length; i++) {
        if (people[i].age > minAge) {
        const p = document.createElement("p");
        p.textContent = `${people[i].name}, ${people[i].age} år`;
        resulDiv.appendChild(p);      
        }
    }
}

// Eventlyssnare
button.addEventListener("click", filterByAge);