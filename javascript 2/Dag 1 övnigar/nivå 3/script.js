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
button.textContent = "Visa namn";