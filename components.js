// === TRAVEL COMPONENTS KLASSE ===
// Denne fil indeholder alle UI-komponenter og hjælpefunktioner
// for at vise data i appen på en pæn måde

const TravelComponents = {
    
    // === LOADING KOMPONENTER SEKTION ===
    // Viser loading state når data hentes
    showLoading: function(container) {
        container.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>${translations.da.loading}</p>
            </div>
        `;
    },

    // === NO RESULTS KOMPONENTER SEKTION ===  
    // Viser besked når der ikke er resultater
    showNoResults: function(container) {
        container.innerHTML = `
            <div class="no-results">
                <p>${translations.da.noResults}</p>
            </div>
        `;
    },

    // === ERROR KOMPONENTER SEKTION ===
    // Viser fejlbesked når noget går galt
    showError: function(container) {
        container.innerHTML = `
            <div class="error">
                <p>${translations.da.error}</p>
            </div>
        `;
    },

    // === RESTAURANT KORT KOMPONENT ===
    // Opretter et kort for hver restaurant
    createRestaurantCard: function(restaurant, index) {
        return `
            <div class="card">
                <h3>${restaurant.name}</h3>
                <p>${restaurant.address}</p>
                <p>${restaurant.cuisine}</p>
                <div class="card-actions">
                    <button class="btn primary">Se mere</button>
                </div>
            </div>
        `;
    },

    // === OVERNATNING KORT KOMPONENT ===
    // Opretter et kort for hver overnatningsmulighed
    createAccommodationCard: function(place, index) {
        return `
            <div class="card">
                <h3>${place.name}</h3>
                <p>${place.address}</p>
                <p>${place.type}</p>
                <div class="card-actions">
                    <button class="btn primary">Se mere</button>
                </div>
            </div>
        `;
    },

    // === SEVÆRDIGHED KORT KOMPONENT ===
    // Opretter et kort for hver seværdighed
    createSightCard: function(sight, index) {
        return `
            <div class="card">
                <h3>${sight.name}</h3>
                <p>${sight.description}</p>
                <div class="card-actions">
                    <button class="btn primary">Se mere</button>
                </div>
            </div>
        `;
    },

    // === HEMMELIG STED KORT KOMPONENT ===
    // Opretter et kort for hver hemmelig attraktion
    createSecretCard: function(secret, index) {
        return `
            <div class="card">
                <h3>${secret.name}</h3>
                <p>${secret.description}</p>
                <div class="card-actions">
                    <button class="btn primary">Se mere</button>
                </div>
            </div>
        `;
    },

    // === BILLEDE KORT KOMPONENT ===
    // Opretter et kort for hvert billede
    createImageCard: function(image, index) {
        return `
            <div class="card">
                <img src="${image.url}" alt="${image.description}" class="image-card">
                <p>${image.description}</p>
                <div class="card-actions">
                    <button class="btn primary">Se mere</button>
                </div>
            </div>
        `;
    },

    // === VEJR KORT KOMPONENT ===
    // Opretter et vejr-kort med temperatur og beskrivelse
    createWeatherCard: function(weather) {
        return `
            <div class="weather-card">
                <h3>🌤️ Vejr i ${window.travelApp.currentCity}</h3>
                <div class="weather-info">
                    <div class="temp">${weather.temp}°C</div>
                    <div class="description">${weather.description}</div>
                </div>
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}">
                </div>
            </div>
        `;
    }
};
