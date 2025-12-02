// --------------------------------------------------
//   Hämta API-nyckel dynamiskt (VG-krav)
// --------------------------------------------------
async function getApiKey() {
    const resp = await fetch(
        "https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com/key"
    );

    if (!resp.ok) {
        throw new Error("Kunde inte hämta API-nyckel.");
    }

    const data = await resp.json();
    return data.key;
}

// --------------------------------------------------
//   Hämta planeter (Med text/plain hantering och VG-error)
// --------------------------------------------------
async function getBodies(apiKey) {
    const url = "https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com/bodies";

    const resp = await fetch(url, {
        method: "GET",
        headers: { "x-zocom": apiKey }
    });

    if (!resp.ok) {
        throw new Error("Kunde inte hämta planetlistan: " + resp.status);
    }

    const text = await resp.text();

    if (!text) {
        throw new Error("API returnerade inget innehåll just nu.");
    }

    let data;
    try {
        data = JSON.parse(text);
    } catch (err) {
        throw new Error("API returnerade ogiltigt innehåll.");
    }

    // The actual array is inside the 'bodies' property
    if (!Array.isArray(data.bodies)) {
        throw new Error("API returnerade inte en array.");
    }

    return data.bodies;
}

// --------------------------------------------------
//   Rendera planeter
// --------------------------------------------------
function renderPlanets(bodies) {
    const container = document.querySelector("#planet-container");
    container.innerHTML = "";

    bodies.forEach(body => {
        if (body.type !== "planet") return;

        const el = document.createElement("button");
        el.className = `
            w-32 h-32 rounded-full bg-gray-800 shadow-lg
            flex items-center justify-center
            text-lg font-semibold
            hover:bg-gray-700 transition
        `;
        el.textContent = body.name;
        el.addEventListener("click", () => showPlanetInfo(body));

        container.appendChild(el);
    });
}

// --------------------------------------------------
//   Overlay med planetinfo
// --------------------------------------------------
function showPlanetInfo(body) {
    const overlay = document.querySelector("#overlay");

    overlay.innerHTML = `
        <div class="bg-gray-900 p-8 rounded-xl max-w-lg text-center space-y-4 animate-fadeIn">
            <h2 class="text-3xl font-bold">${body.name}</h2>
            <h3 class="text-lg text-gray-400 italic">${body.latinName}</h3>
            <p class="text-gray-200">${body.desc}</p>
            <ul class="text-left text-gray-300 space-y-1">
                <li><strong>Dygn:</strong> ${body.rotation}</li>
                <li><strong>Omkrets:</strong> ${body.circumference} km</li>
                <li><strong>Avstånd:</strong> ${body.distance} km</li>
                <li><strong>Temperatur:</strong> ${body.temp.day}°C / ${body.temp.night}°C</li>
                <li><strong>Månar:</strong> ${body.moons.length}</li>
            </ul>
            <button id="close-overlay"
                class="px-6 py-2 bg-white text-black font-bold rounded-md hover:bg-gray-200">
                Stäng
            </button>
        </div>
    `;

    overlay.classList.remove("hidden");
    document.querySelector("#close-overlay")
        .addEventListener("click", () => overlay.classList.add("hidden"));
}

// --------------------------------------------------
//   Felmeddelande (VG)
// --------------------------------------------------
function showError(message) {
    const container = document.querySelector("#planet-container");

    container.innerHTML = `
        <div class="bg-red-900 text-red-200 p-6 rounded-xl text-center max-w-md mx-auto space-y-4">
            <p class="text-lg font-semibold">${message}</p>
            <button id="retry"
                class="px-5 py-2 bg-white text-black font-bold rounded-md hover:bg-gray-200">
                Försök igen
            </button>
        </div>
    `;

    document.querySelector("#retry").addEventListener("click", init);
}

// --------------------------------------------------
//   Init
// --------------------------------------------------
async function init() {
    try {
        const key = await getApiKey();
        console.log("API KEY:", key);

        const bodies = await getBodies(key);
        console.log("PLANETLISTA:", bodies);

        renderPlanets(bodies);
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}

document.addEventListener("DOMContentLoaded", init);