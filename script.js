// === REJSE ASSISTENT APP ===
class TravelApp {
    constructor() {
        this.currentLanguage = 'da';
        this.currentTrip = null;
        this.currentCity = '';
        this.translations = translations; // Bruger translations fra translations.js
        this.init();
    }

    init() {
        this.loadTrip();
        this.setupEventListeners();
        this.updateUI();
    }

    setupEventListeners() {
        // Sprogskifte
        const languageSelect = document.getElementById('selectLanguage');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.currentLanguage = e.target.value;
                this.updateUI();
                this.saveLanguage();
            });
        }

        // Start rejse
        const startButton = document.getElementById('startTravel');
        if (startButton) {
            startButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.startTrip();
            });
        }

        // Menu-knapper
        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const menuType = e.target.dataset.menu;
                this.handleMenuClick(menuType);
            });
        });

        // Tilbage-knapper
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.goBack();
            });
        });
    }

    handleMenuClick(feature) {
        if (!this.currentCity) {
            alert(this.translations[this.currentLanguage].selectDestinationFirst);
            return;
        }
        
        activateMenuButton(feature);
        
        const detailTitle = document.getElementById('detailTitle');
        const detailContent = document.getElementById('detailContent');
        
        if (!detailContent) return;
        
        const titles = {
            restaurants: '🍽️ ' + this.translations[this.currentLanguage].restaurants,
            accommodation: '🏨 ' + this.translations[this.currentLanguage].accommodation,
            sights: '📸 ' + this.translations[this.currentLanguage].sights,
            secrets: '🔓 ' + this.translations[this.currentLanguage].secrets,
            images: '🖼️ ' + this.translations[this.currentLanguage].images,
            transport: '🚗 ' + this.translations[this.currentLanguage].transport,
            weather: '🌤️ ' + this.translations[this.currentLanguage].weather
        };
        
        if (detailTitle) {
            detailTitle.textContent = titles[feature] || feature;
        }
        
        this.showScreen('detailScreen');
        
        // Håndter specifikke funktioner
        switch(feature) {
            case 'restaurants':
                this.loadRestaurants();
                break;
            case 'accommodation':
                this.loadAccommodation();
                break;
            case 'sights':
                this.loadSights();
                break;
            case 'secrets':
                this.loadSecretPlaces();
                break;
            case 'images':
                this.loadImages();
                break;
            case 'transport':
                this.showScreen('transportPlanner');
                break;
            case 'weather':
                this.loadWeather();
                break;
        }
    }

    startTrip() {
        const formData = this.getFormData('startScreen');
        const errors = this.validateForm(formData, ['destination', 'startDate', 'days']);
        
        if (errors.length > 0) {
            alert(this.translations[this.currentLanguage].errors + '\n' + errors.join('\n'));
            return;
        }

        // Geocode byen
        this.geocodeCity(formData.destination)
            .then(cityData => {
                if (!cityData) {
                    alert(this.translations[this.currentLanguage].cityNotFound);
                    return;
                }

                this.currentTrip = {
                    ...formData,
                    ...cityData
                };
                this.currentCity = cityData.display_name.split(',')[0];
                this.updateCityTitle();
                this.showScreen('mainMenu');
                this.saveTrip();
                console.log('Trip started:', this.currentTrip);
            })
            .catch(error => {
                console.error('Error starting trip:', error);
                alert(this.translations[this.currentLanguage].error);
            });
    }

    geocodeCity(cityName) {
        return new Promise((resolve, reject) => {
            // Simuler API kald - udskift med rigtig API kald
            setTimeout(() => {
                // Eksempel på bydata
                const mockData = {
                    display_name: cityName + ', Denmark',
                    lat: 55.6761,
                    lon: 12.5683
                };
                resolve(mockData);
            }, 500);
        });
    }

    getFormData(formId) {
        const form = document.getElementById(formId);
        if (!form) return {};
        
        const formData = {};
        form.querySelectorAll('input, select').forEach(input => {
            if (input.name) {
                formData[input.name] = input.value;
            }
        });
        return formData;
    }

    validateForm(formData, requiredFields) {
        const errors = [];
        requiredFields.forEach(field => {
            if (!formData[field] || formData[field].trim() === '') {
                errors.push(this.translations[this.currentLanguage][field] + ' ' + this.translations[this.currentLanguage].isRequired);
            }
        });
        return errors;
    }

    updateUI() {
        // Opdater alle tekster
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (this.translations[this.currentLanguage][key]) {
                element.textContent = this.translations[this.currentLanguage][key];
            }
        });

        // Opdater knapper og labels
        this.updateFormLabels();
    }

    updateFormLabels() {
        const labelMap = {
            'destination': this.translations[this.currentLanguage].destination,
            'startDate': this.translations[this.currentLanguage].startDate,
            'days': this.translations[this.currentLanguage].days,
            'fromLocation': this.translations[this.currentLanguage].from,
            'toLocation': this.translations[this.currentLanguage].to,
            'departureDate': this.translations[this.currentLanguage].departureDate,
            'departureTime': this.translations[this.currentLanguage].departureTime
        };

        Object.entries(labelMap).forEach(([id, text]) => {
            const label = document.querySelector(`label[for="${id}"]`);
            if (label) {
                label.textContent = text;
            }
        });
    }

    updateCityTitle() {
        const cityTitle = document.getElementById('cityTitle');
        if (cityTitle && this.currentCity) {
            cityTitle.textContent = this.currentCity;
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
        });
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.style.display = 'block';
        }
    }

    goBack() {
        this.showScreen('mainMenu');
    }

    saveTrip() {
        localStorage.setItem('currentTrip', JSON.stringify(this.currentTrip));
    }

    loadTrip() {
        const savedTrip = localStorage.getItem('currentTrip');
        if (savedTrip) {
            this.currentTrip = JSON.parse(savedTrip);
            this.currentCity = this.currentTrip.display_name.split(',')[0];
            this.updateCityTitle();
        }
    }

    saveLanguage() {
        localStorage.setItem('appLanguage', this.currentLanguage);
    }

    loadLanguage() {
        const savedLanguage = localStorage.getItem('appLanguage');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
        }
    }

    // === LOADING FUNKTIONER ===
    async loadRestaurants() {
        const detailContent = document.getElementById('detailContent');
        if (!detailContent) return;
        
        showScreen('detailScreen');
        TravelComponents.showLoading(detailContent);
        
        try {
            const restaurants = await TravelAPI.findRestaurants(
                this.currentTrip.lat,
                this.currentTrip.lon
            );
            if (restaurants.length > 0) {
                detailContent.innerHTML = restaurants
                    .map((restaurant, i) => TravelComponents.createRestaurantCard(restaurant, i))
                    .join('');
            } else {
                TravelComponents.showNoResults(detailContent);
            }
        } catch (error) {
            console.error('Error loading restaurants:', error);
            TravelComponents.showError(detailContent);
        }
    }

    async loadAccommodation() {
        const detailContent = document.getElementById('detailContent');
        if (!detailContent) return;
        
        showScreen('detailScreen');
        TravelComponents.showLoading(detailContent);
        
        try {
            const accommodation = await TravelAPI.findAccommodation(
                this.currentTrip.lat,
                this.currentTrip.lon
            );
            if (accommodation.length > 0) {
                detailContent.innerHTML = accommodation
                    .map((place, i) => TravelComponents.createAccommodationCard(place, i))
                    .join('');
            } else {
                TravelComponents.showNoResults(detailContent);
            }
        } catch (error) {
            console.error('Error loading accommodation:', error);
            TravelComponents.showError(detailContent);
        }
    }

    async loadSights() {
        const detailContent = document.getElementById('detailContent');
        if (!detailContent) return;
        
        showScreen('detailScreen');
        TravelComponents.showLoading(detailContent);
        
        try {
            const sights = await TravelAPI.findSights(
                this.currentTrip.lat,
                this.currentTrip.lon
            );
            if (sights.length > 0) {
                detailContent.innerHTML = sights
                    .map((sight, i) => TravelComponents.createSightCard(sight, i))
                    .join('');
            } else {
                TravelComponents.showNoResults(detailContent);
            }
        } catch (error) {
            console.error('Error loading sights:', error);
            TravelComponents.showError(detailContent);
        }
    }

    async loadSecretPlaces() {
        const detailContent = document.getElementById('detailContent');
        if (!detailContent) return;
        
        showScreen('detailScreen');
        TravelComponents.showLoading(detailContent);
        
        try {
            const secrets = await TravelAPI.findSecretPlaces(
                this.currentTrip.lat,
                this.currentTrip.lon
            );
            if (secrets.length > 0) {
                detailContent.innerHTML = secrets
                    .map((s, i) => TravelComponents.createSecretCard(s, i))
                    .join('');
            } else {
                TravelComponents.showNoResults(detailContent);
            }
        } catch (error) {
            console.error('Error loading secrets:', error);
            TravelComponents.showError(detailContent);
        }
    }

    async loadImages() {
        const detailContent = document.getElementById('detailContent');
        if (!detailContent) return;
        
        showScreen('detailScreen');
        TravelComponents.showLoading(detailContent);
        
        try {
            const images = await TravelAPI.getCityImages(this.currentCity);
            if (images.length > 0) {
                detailContent.innerHTML = images
                    .map((img, i) => TravelComponents.createImageCard(img, i))
                    .join('');
            } else {
                TravelComponents.showNoResults(detailContent);
            }
        } catch (error) {
            console.error('Error loading images:', error);
            TravelComponents.showError(detailContent);
        }
    }

    async loadWeather() {
        const detailContent = document.getElementById('detailContent');
        if (!detailContent) return;
        
        showScreen('detailScreen');
        TravelComponents.showLoading(detailContent);
        
        try {
            const weather = await TravelAPI.getWeather(
                this.currentTrip.lat,
                this.currentTrip.lon
            );
            if (weather) {
                detailContent.innerHTML = TravelComponents.createWeatherCard(weather);
            } else {
                TravelComponents.showNoResults(detailContent);
            }
        } catch (error) {
            console.error('Error loading weather:', error);
            TravelComponents.showError(detailContent);
        }
    }
}

// === APP INITIALISERING ===
document.addEventListener('DOMContentLoaded', () => {
    const app = new TravelApp();
    window.travelApp = app; // Gør appen globalt tilgængelig
});

// === HELPER FUNKTIONER ===
function activateMenuButton(feature) {
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.menu === feature) {
            btn.classList.add('active');
        }
    });
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'block';
    }
}
