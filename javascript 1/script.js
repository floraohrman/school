function renderPlanets(bodies) {
    const container = document.getElementById('planet-container');
    container.innerHTML = '';

    bodies.forEach(body => {
        if (body.type !== 'planet') return;

        const div = document.createElement('button');
        div.className = `
            planet w-32 h-32 rounded-full bg-gray-800 
            flex items-center justify-center
            text-lg font-semibold
            hover:bg-gray-700 transition
            cursor-pointer
        `;
        div.textContent = body.name;

        div.addEventListener('click', () => showPlanetInfo(body));

        container.appendChild(div);
    });
}
function showPlanetInfo(body) {
    const overlay = document.getElementById('overlay');

    overlay.innerHTML = `
        <div class="bg-gray-900 p-8 rounded-xl shadow-xl max-w-lg text-center space-y-4 animate-fadeIn">
            <h2 class="text-3xl font-bold">${body.name}</h2>
            <h3 class="text-xl italic text-gray-300">${body.latinName}</h3>

            <p class="text-gray-200 leading-relaxed">${body.desc}</p>

            <ul class="text-left text-gray-300 space-y-1">
                <li><strong>Dygn:</strong> ${body.rotation} jorddygn</li>
                <li><strong>Omkrets:</strong> ${body.circumference} km</li>
                <li><strong>Avstånd från solen:</strong> ${body.distance} km</li>
                <li><strong>Temperatur:</strong> ${body.temp.day}°C / ${body.temp.night}°C</li>
                <li><strong>Månar:</strong> ${body.moons.length}</li>
            </ul>

            <button id="close-overlay"
                class="mt-4 px-6 py-2 bg-white text-black rounded-md font-bold hover:bg-gray-200 transition">
                Stäng
            </button>
        </div>
    `;

    overlay.classList.remove('hidden');

    document.getElementById('close-overlay')
        .addEventListener('click', () => overlay.classList.add('hidden'));
}
function showError(msg) {
    const container = document.getElementById('planet-container');
    container.innerHTML = `
        <div class="bg-red-900 text-red-200 p-6 rounded-xl text-center max-w-md mx-auto space-y-4">
            <p class="text-lg font-semibold">${msg}</p>
            <button id="retry"
                class="px-5 py-2 bg-white text-black rounded-md font-bold hover:bg-gray-200 transition">
                Försök igen
            </button>
        </div>
    `;

    document.getElementById('retry').addEventListener('click', init);
}
