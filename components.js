// === UI KOMPONENTER KLASSE ===
class TravelComponents {
    // === LOADING KOMPONENTER SEKTION ===
    static showLoading(container) {
        container.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
                <p>${t('loading')}</p>
            </div>
        `;
    }
    
    static showError(container, message = null) {
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message || t('error')}</p>
            </div>
        `;
    }
    
    static showNoResults(container) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>${t('noResults')}</p>
            </div>
        `;
    }
    
    // === RESTAURANT KORT SEKTION ===
    static createRestaurantCard(restaurant) {
        const mapsUrl = `https://maps.google.com/?q=${restaurant.lat},${restaurant.lon}`;
        return `
            <div class="place-card">
                <h3>
                    <i class="fas fa-utensils"></i> ${restaurant.name}
                </h3>
                <p><strong>Type:</strong> ${restaurant.type}</p>
                ${restaurant.tags.cuisine ? `<p><strong>Køkken:</strong> ${restaurant.tags.cuisine}</p>` : ''}
                ${restaurant.tags.phone ? `<p><strong>${t('phone')}:</strong> ${restaurant.tags.phone}</p>` : ''}
                ${restaurant.tags.website ? `<p><strong>${t('website')}:</strong> <a href="${restaurant.tags.website}" target="_blank">${restaurant.tags.website}</a></p>` : ''}
                <div class="card-actions">
                    <a href="${mapsUrl}" target="_blank" class="neon-btn small">
                        <i class="fas fa-map-marker-alt"></i> ${t('openInMaps')}
                    </a>
                </div>
            </div>
        `;
    }
    
    // === OVERNATNING KORT SEKTION ===
    static createAccommodationCard(accommodation) {
        const mapsUrl = `https://maps.google.com/?q=${accommodation.lat},${accommodation.lon}`;
        return `
            <div class="place-card">
                <h3>
                    <i class="fas fa-bed"></i> ${accommodation.name}
                </h3>
                <p><strong>Type:</strong> ${accommodation.type}</p>
                ${accommodation.tags.stars ? `<p><strong>Stjerner:</strong> ${accommodation.tags.stars}</p>` : ''}
                ${accommodation.tags.phone ? `<p><strong>${t('phone')}:</strong> ${accommodation.tags.phone}</p>` : ''}
                ${accommodation.tags.website ? `<p><strong>${t('website')}:</strong> <a href="${accommodation.tags.website}" target="_blank">${accommodation.tags.website}</a></p>` : ''}
                <div class="card-actions">
                    <a href="${mapsUrl}" target="_blank" class="neon-btn small">
                        <i class="fas fa-map-marker-alt"></i> ${t('openInMaps')}
                    </a>
                </div>
            </div>
        `;
    }
    
    // === SEVÆRDIGHED KORT SEKTION ===
    static createSightCard(sight, index) {
        const mapsUrl = `https://maps.google.com/?q=${sight.lat},${sight.lon}`;
        return `
            <div class="place-card">
                <h3>
                    <span class="sight-number">${index + 1}.</span>
                    <i class="fas fa-camera"></i> ${sight.name}
                </h3>
                <p><strong>Type:</strong> ${sight.type}</p>
                ${sight.tags.historic ? `<p><strong>Historisk:</strong> ${sight.tags.historic}</p>` : ''}
                ${sight.tags.wikipedia ? `<p><a href="${sight.tags.wikipedia}" target="_blank">Læs mere på Wikipedia</a></p>` : ''}
                <div class="card-actions">
                    <a href="${mapsUrl}" target="_blank" class="neon-btn small">
                        <i class="fas fa-map-marker-alt"></i> ${t('openInMaps')}
                    </a>
                </div>
            </div>
        `;
    }
    
    // === HEMMELIGT STED KORT SEKTION ===
    static createSecretCard(place, index) {
        const mapsUrl = `https://maps.google.com/?q=${place.lat},${place.lon}`;
        return `
            <div class="place-card secret-card">
                <h3>
                    <span class="secret-number">${index + 1}.</span>
                    <i class="fas fa-key"></i> ${place.name}
                </h3>
                <p><strong>Gemt gemme:</strong> ${place.type}</p>
                <div class="card-actions">
                    <a href="${mapsUrl}" target="_blank" class="neon-btn small">
                        <i class="fas fa-map-marker-alt"></i> ${t('openInMaps')}
                    </a>
                </div>
            </div>
        `;
    }
    
    // === BILLEDE GALLERI SEKTION ===
    static createImageGallery(images) {
        if (!images || images.length === 0) {
            return `
                <div class="image-gallery">
                    <p>Ingen billeder fundet</p>
                </div>
            `;
        }
        
        const galleryHTML = images.map(img => `
            <div class="image-item">
                <img src="${img.url}" alt="${img.title}" onclick="window.open('${img.url}', '_blank')">
                <p>${img.title}</p>
            </div>
        `).join('');
        
        return `
            <div class="image-gallery">
                ${galleryHTML}
            </div>
        `;
    }
    
    // === RUTE RESULTAT SEKTION ===
    static createRouteResult(route) {
        if (route.error) {
            return `<div class="route-error"><p>${route.error}</p></div>`;
        }
        
        return `
            <div class="route-success">
                <h3><i class="fas fa-route"></i> Rute Fundet</h3>
                <p><strong>${t('distance')}:</strong> ${route.distance}</p>
                <p><strong>${t('duration')}:</strong> ${route.duration}</p>
                <a href="https://maps.google.com/" target="_blank" class="neon-btn">
                    <i class="fas fa-external-link-alt"></i> Åbn i Google Maps
                </a>
            </div>
        `;
    }
    
    // === BY INFO KORT SEKTION ===
    static createCityInfo(cityInfo, weather) {
        let weatherHTML = '';
        if (weather) {
            weatherHTML = `
                <div class="weather-info">
                    <h4><i class="fas fa-cloud"></i> Vejr</h4>
                    <p>${weather.temp}°C - ${weather.description}</p>
                </div>
            `;
        }
        
        return `
            <div class="city-info">
                <h3>Om ${cityInfo.title || 'Byen'}</h3>
                <p>${cityInfo.extract || 'Ingen information tilgængelig'}</p>
                ${weatherHTML}
                ${cityInfo.content_urls?.desktop?.page ? `
                    <a href="${cityInfo.content_urls.desktop.page}" target="_blank" class="neon-btn small">
                        <i class="fas fa-wikipedia-w"></i> Læs mere på Wikipedia
                    </a>
                ` : ''}
            </div>
        `;
    }
    
    // === VEJR KORT SEKTION ===
    static createWeatherCard(weather) {
        return `
            <div class="weather-card">
                <h3><i class="fas fa-cloud-sun"></i> Vejr i ${window.travelApp.currentCity}</h3>
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
}

// === HJÆLP FUNKTIONER SEKTION ===
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

function activateMenuButton(dataFeature) {
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-feature="${dataFeature}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

function getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return {};
    
    const formData = {};
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        formData[input.id] = input.value;
    });
    
    return formData;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'da' ? 'da-DK' : 'en-US');
}

function validateForm(formData, requiredFields = []) {
    const errors = [];
    
    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            errors.push(`${field} er påkrævet`);
        }
    });
    
    if (formData.startDate) {
        const startDate = new Date(formData.startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (startDate < today) {
            errors.push('Start dato kan ikke være i fortiden');
        }
    }
    
    if (formData.days) {
        const days = parseInt(formData.days);
        if (isNaN(days) || days < 1 || days > 30) {
            errors.push('Antal dage skal være mellem 1 og 30');
        }
    }
    
    return errors;
}

function createMapsLink(lat, lon, name = '') {
    const query = name ? `${name} ${lat} ${lon}` : `${lat} ${lon}`;
    return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

// === STORAGE FUNKTIONER SEKTION ===
class AppStorage {
    static saveTrip(tripData) {
        const trips = this.getTrips();
        trips.push({
            ...tripData,
            id: Date.now(),
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('travelAppTrips', JSON.stringify(trips));
    }
    
    static getTrips() {
        const saved = localStorage.getItem('travelAppTrips');
        return saved ? JSON.parse(saved) : [];
    }
    
    static deleteTrip(tripId) {
        const trips = this.getTrips();
        const filtered = trips.filter(trip => trip.id !== tripId);
        localStorage.setItem('travelAppTrips', JSON.stringify(filtered));
    }
    
    static getSettings() {
        const saved = localStorage.getItem('travelAppSettings');
        return saved ? JSON.parse(saved) : {
            theme: 'dark',
            language: 'da'
        };
    }
    
    static saveSettings(settings) {
        localStorage.setItem('travelAppSettings', JSON.stringify(settings));
    }
}

// === EKSPORT SEKTION ===
window.TravelComponents = TravelComponents;
window.ScreenUtils = {
    showScreen,
    activateMenuButton,
    resetForm,
    getFormData,
    formatDate,
    validateForm,
    createMapsLink
};
window.AppStorage = AppStorage;
