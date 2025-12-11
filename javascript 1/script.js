// --------------------------------------------------
//   Fetching API-key dynamicly so its not to be hardcoded
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
//   Fetching planets from API
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
//   Rendering Planets
// --------------------------------------------------
function renderPlanets(bodies) {
    const container = document.querySelector("#planet-container");
    container.innerHTML = "";

    const planetStyles = {
        Solen: { size: 1000, color: "#f9d71c" },
        Merkurius: { size: 14, color: "#b1b1b1" },
        Venus: { size: 32, color: "#e3c27c" },
        Jorden: { size: 34, color: "#4b8fd8" },
        Mars: { size: 26, color: "#c1440e" },
        Jupiter: { size: 120, color: "#d2b48c" },
        Saturnus: { size: 100, color: "#e6c27a", ring: true },
        Uranus: { size: 56, color: "#9adbe8" },
        Neptunus: { size: 56, color: "#3f54ba" }
    };

        bodies.forEach(body => {
        if (body.type !== "star") return;

        const style = planetStyles[body.name];
        if (!style) return;

        const wrapper = document.createElement("div");
        wrapper.className = "relative flex justify-start";
        wrapper.style.width = style.size / 2 + "px"; // Show half the sun

        const star = document.createElement("div");
        star.className = `
            rounded-full cursor-pointer
            transition-transform duration-300
            hover:scale-110
        `;
        star.style.width = `${style.size}px`;
        star.style.height = `${style.size}px`;
        star.style.backgroundColor = style.color;
        star.style.marginLeft = `-${style.size / 1.5 }px`;

        star.addEventListener("click", () => showPlanetInfo(body));

        wrapper.appendChild(star);
        container.appendChild(wrapper);
    });

    bodies.forEach(body => {
        if (body.type !== "planet") return;

        const style = planetStyles[body.name];
        if (!style) return;

        const wrapper = document.createElement("div");
        wrapper.className = "relative flex items-center justify-center";

        const planet = document.createElement("div");
        planet.className = `
            rounded-full cursor-pointer
            transition-transform duration-300
            hover:scale-110
        `;
        planet.style.width = `${style.size}px`;
        planet.style.height = `${style.size}px`;
        planet.style.backgroundColor = style.color;


        // Saturn rings
        if (style.ring) {
            const ringOuter = document.createElement("div");
            ringOuter.className = "absolute rounded-full border-yellow-100 opacity-30";
            ringOuter.style.width = `${style.size * 1.9}px`;
            ringOuter.style.height = `${style.size * 0.35}px`;
            ringOuter.style.borderWidth = "3px";
            ringOuter.style.transform = "rotate(-20deg)";
            ringOuter.style.pointerEvents = "none";

            const ringMain = document.createElement("div");
            ringMain.className = "absolute rounded-full border-yellow-120 opacity-50";
            ringMain.style.width = `${style.size * 1.8}px`;
            ringMain.style.height = `${style.size * 0.3}px`;
            ringMain.style.borderWidth = "6px";
            ringMain.style.transform = "rotate(-20deg)";
            ringMain.style.pointerEvents = "none";

            const ringInner = document.createElement("div");
            ringInner.className = "absolute rounded-full border-yellow-200 opacity-70";
            ringInner.style.width = `${style.size * 1.6}px`;
            ringInner.style.height = `${style.size * 0.2}px`;
            ringInner.style.borderWidth = "2px";
            ringInner.style.transform = "rotate(-20deg)";
            ringInner.style.pointerEvents = "none";

            // Saturn top overlay (hides upper rings)
            const saturnOverlay = document.createElement("div");
            saturnOverlay.className = "absolute rounded-full";
            saturnOverlay.style.width = `${style.size}px`;
            saturnOverlay.style.height = `${style.size}px`;
            saturnOverlay.style.backgroundColor = style.color;
            saturnOverlay.style.clipPath = "inset(0 0 50% 0)";
            saturnOverlay.style.transform = "rotate(-20deg)";
            saturnOverlay.style.zIndex = "3";
            saturnOverlay.style.pointerEvents = "none";

            wrapper.appendChild(saturnOverlay);

            wrapper.appendChild(ringOuter);
            wrapper.appendChild(ringMain);
            wrapper.appendChild(ringInner);
        }

        planet.addEventListener("click", () => showPlanetInfo(body));

        wrapper.appendChild(planet);
        container.appendChild(wrapper);
    });
}

// --------------------------------------------------
//   Overlay with planetinfo
// --------------------------------------------------
function showPlanetInfo(body) {
    const view = document.querySelector("#planet-view");
    const solar = document.querySelector("#solar-system");

    solar.classList.add("hidden");
    view.classList.remove("hidden");

    view.innerHTML = `
        <button id="back"
            class="absolute top-10 left-10 text-gray-400 hover:text-white">
            ← Tillbaka
        </button>

        <div class="flex h-full items-center gap-24">

            <!-- Planet graphic -->
            <div class="relative w-[400px] h-[400px] flex items-center justify-center">
            ${body.name === "Saturnus" ? `
                <div class="absolute w-[720px] h-[260px] rounded-full rotate-[-20deg]
                    border-[3px] border-yellow-200 opacity-40">
                </div>
                <div class="absolute w-[660px] h-[230px] rounded-full rotate-[-20deg]
                    border-[6px] border-yellow-100 opacity-25">
                </div>
                <div class="absolute w-[600px] h-[200px] rounded-full rotate-[-20deg]
                    border-[2px] border-yellow-300 opacity-50">
                </div>
            ` : ""}
                <div class="w-full h-full rounded-full"
                    style="background:${getPlanetColor(body.name)}">
                </div>
            </div>

            <!-- Text -->
            <div class="max-w-xl space-y-6">
                <h1 class="text-7xl font-bold tracking-widest uppercase">${body.name}</h1>
                <p class="tracking-[0.4em] text-yellow-400 uppercase text-sm">
                    ${body.latinName}
                </p>

                <p class="text-gray-300 leading-relaxed">
                    ${body.desc}
                </p>

                <div class="grid grid-cols-2 gap-6 text-sm text-gray-300">
                    <div><strong>Omkrets</strong><br>${body.circumference} km</div>
                    <div><strong>Km från solen</strong><br>${body.distance}</div>
                    <div><strong>Max temp</strong><br>${body.temp.day}°C</div>
                    <div><strong>Min temp</strong><br>${body.temp.night}°C</div>
                </div>
            </div>

        </div>
    `;

    document.querySelector("#back").addEventListener("click", () => {
        view.classList.add("hidden");
        solar.classList.remove("hidden");
    });
}
function getPlanetColor(name) {
    const colors = {
        Solen: "#f9d71c",
        Merkurius: "#b1b1b1",
        Venus: "#e3c27c",
        Jorden: "#4b8fd8",
        Mars: "#c1440e",
        Jupiter: "#d2b48c",
        Saturnus: "#e6c27a",
        Uranus: "#9adbe8",
        Neptunus: "#3f54ba"
    };
    return colors[name] || "#888";
}
// --------------------------------------------------
//   Error handling and retry
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