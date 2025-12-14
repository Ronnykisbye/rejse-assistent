// === REJSE ASSISTENT KLASSE ===
class TravelApp {
    constructor() {
        this.currentCity = null;
        this.currentTrip = null;
        this.theme = 'dark';
        this.init();
    }
    
    // === INITIALISERING SEKTION ===
    init() {
        Translations.initLanguage();
        this.loadSettings();
        this.bindEvents();
        this.checkSavedData();
        console.log('Rejse Assistent initialiseret');
    }
    
    // === EVENT HANDLER BINDING SEKTION ===
    bindEvents() {
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }
        
        const langSelect = document.getElementById('languageSelect');
        if (langSelect) {
            langSelect.addEventListener('change', (e) => {
                Translations.setLanguage(e.target.value);
            });
        }
        
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.handleStartTravel());
        }
        
        this.bindBackButtons();
        this.bindMenuButtons();
        this.bindTransportPlanner();
    }
    
    bindBackButtons() {
        const backToStart = document.getElementById('backToStart');
        if (backToStart) {
            backToStart.addEventListener('click', () => {
                showScreen('startScreen');
            });
        }
        
        const backToMenu = document.getElementById('backToMenu');
        if (backToMenu) {
            backToMenu.addEventListener('click', () => {
                showScreen('mainMenu');
            });
        }
        
        const backFromTransport = document.getElementById('backFromTransport');
        if (backFromTransport) {
            backFromTransport.addEventListener('click', () => {
                showScreen('mainMenu');
            });
        }
    }
    
    bindMenuButtons() {
        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const feature = e.currentTarget.getAttribute('data-feature');
                this.handleMenuClick(feature);
            });
        });
    }
    
    bindTransportPlanner() {
        const planRoute = document.getElementById('planRoute');
        if (planRoute) {
            planRoute.addEventListener('click', () => this.handlePlanRoute());
        }
    }
    
    // === REJSE START HÅNDTERING SEKTION ===
    async handleStartTravel() {
        const formData = getFormData('startScreen');
        const errors = validateForm(formData, ['destination', 'startDate', 'days']);
        
        if (errors.length > 0) {
            alert('Fejl:\n' + errors.join('\n'));
            return;
        }
        
        const cityData = await TravelAPI.geocodeCity(formData.destination);
        if (!cityData) {
            alert('Kunne ikke finde byen. Prøv venligst igen.');
            return;
        }
        
        this.currentTrip = {
            ...formData,
            ...cityData
        };
        
        this.currentCity = cityData.display_name.split(',')[0];
        
        this.updateCityTitle();
        showScreen('mainMenu');
        AppStorage.saveTrip(this.currentTrip);
        
        console.log('Trip started:', this.currentTrip);
    }
    
    updateCityTitle() {
        const cityTitle = document.getElementById('cityTitle');
        if (cityTitle && this.currentCity) {
            cityTitle.textContent = `📍 ${this.currentCity}`;
        }
    }
    
    // === MENU HÅNDTERING SEKTION ===
    async handleMenuClick(feature) {
        if (!this.currentCity) {
            alert('Vælg venligst en destination først');
            return;
        }
        
        activateMenuButton(feature);
        
        const detailTitle = document.getElementById('detailTitle');
        const detailContent = document.getElementById('detailContent');
        
        if (!detailContent) return;
        
        const titles = {
            restaurants: '🍽️ Restauranter',
            accommodation: '🏨 Overnatning',
            sights: '📸 Seværdigheder',
            secrets: '🔓 Hemmelige Steder',
            images: '🖼️ Billeder',
            transport: '🚗 Transport',
            weather: '🌤️ Vejr'
        };
        
        if (feature !== 'transport' && detailTitle) {
            detailTitle.textContent = titles[feature] || feature;
        }
        
        switch (feature) {
            case 'restaurants':
                await this.loadRestaurants();
                break;
            case 'accommodation':
                await this.loadAccommodation();
                break;
            case 'sights':
                await this.loadSights();
                break;
            case 'secrets':
                await this.loadSecretPlaces();
                break;
            case 'images':
                await this.loadImages();
                break;
            case 'transport':
                showScreen('transportPlanner');
                break;
            case 'weather':
                await this.loadWeather();
                break;
        }
    }
    
 // === DATA INDHENTNING FUNKTIONER SEKTION (forbedret) ===
async loadAccommodation() {
    const detailContent = document.getElementById('detailContent');
    showScreen('detailScreen');
    
    TravelComponents.showLoading(detailContent);
    
    try {
        const accommodation = await TravelAPI.findAccommodation(
            this.currentTrip.lat, 
            this.currentTrip.lon
        );
        
        if (accommodation.length === 0) {
            TravelComponents.showNoResults(detailContent);
            return;
        }
        
        const accommodationHTML = accommodation
            .slice(0, 10)
            .map(a => TravelComponents.createAccommodationCard(a))
            .join('');
        
        detailContent.innerHTML = accommodationHTML;
        
    } catch (error) {
        console.error('Error loading accommodation:', error);
        
        // Vis brugervenlig fejlmeddelelse
        detailContent.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Overnatning søgning fejlede</h3>
                <p>Overpass API'en er midlertidigt utilgængelig. Prøv igen senere.</p>
                <p>Alternativt kan du prøve:</p>
                <ul>
                    <li>Prøv at søge efter restauranter i stedet</li>
                    <li>Prøv igen om et par minutter</li>
                    <li>Kontakt os hvis problemet fortsætter</li>
                </ul>
            </div>
        `;
    }
}
    
    async loadAccommodation() {
        const detailContent = document.getElementById('detailContent');
        showScreen('detailScreen');
        
        TravelComponents.showLoading(detailContent);
        
        try {
            const accommodation = await TravelAPI.findAccommodation(
                this.currentTrip.lat, 
                this.currentTrip.lon
            );
            
            if (accommodation.length === 0) {
                TravelComponents.showNoResults(detailContent);
                return;
            }
            
            const accommodationHTML = accommodation
                .slice(0, 10)
                .map(a => TravelComponents.createAccommodationCard(a))
                .join('');
            
            detailContent.innerHTML = accommodationHTML;
            
        } catch (error) {
            console.error('Error loading accommodation:', error);
            TravelComponents.showError(detailContent);
        }
    }
    
    async loadSights() {
        const detailContent = document.getElementById('detailContent');
        showScreen('detailScreen');
        
        TravelComponents.showLoading(detailContent);
        
        try {
            const cityInfo = await TravelAPI.getWikipediaInfo(this.currentCity);
            const sights = await TravelAPI.findSights(
                this.currentTrip.lat, 
                this.currentTrip.lon
            );
            
            if (sights.length === 0 && !cityInfo) {
                TravelComponents.showNoResults(detailContent);
                return;
            }
            
            let html = '';
            
            if (cityInfo) {
                const weather = await TravelAPI.getWeather(this.currentTrip.lat, this.currentTrip.lon);
                html += TravelComponents.createCityInfo(cityInfo, weather);
            }
            
            if (sights.length > 0) {
                html += '<h3><i class="fas fa-camera"></i> Top 10 Seværdigheder</h3>';
                html += sights
                    .slice(0, 10)
                    .map((s, i) => TravelComponents.createSightCard(s, i))
                    .join('');
            }
            
            detailContent.innerHTML = html || '<p>Ingen seværdigheder fundet</p>';
            
        } catch (error) {
            console.error('Error loading sights:', error);
            TravelComponents.showError(detailContent);
        }
    }
    
    async loadSecretPlaces() {
        const detailContent = document.getElementById('detailContent');
        showScreen('detailScreen');
        
        TravelComponents.showLoading(detailContent);
        
        try {
            const secrets = await TravelAPI.findSecretPlaces(
                this.currentTrip.lat, 
                this.currentTrip.lon
            );
            
            if (secrets.length === 0) {
                TravelComponents.showNoResults(detailContent);
                return;
            }
            
            const secretsHTML = secrets
                .map((s, i) => TravelComponents.createSecretCard(s, i))
                .join('');
            
            detailContent.innerHTML = `
                <h3><i class="fas fa-key"></i> 5 Hemmelige Steder</h3>
                <p>Disse steder er mindre kendte af turister!</p>
                ${secretsHTML}
            `;
            
        } catch (error) {
            console.error('Error loading secrets:', error);
            TravelComponents.showError(detailContent);
        }
    }
    
    async loadImages() {
        const detailContent = document.getElementById('detailContent');
        showScreen('detailScreen');
        
        TravelComponents.showLoading(detailContent);
        
        try {
            const images = await TravelAPI.getCityImages(this.currentCity);
            const galleryHTML = TravelComponents.createImageGallery(images);
            
            detailContent.innerHTML = `
                <h3><i class="fas fa-images"></i> Billeder fra ${this.currentCity}</h3>
                ${galleryHTML}
            `;
            
        } catch (error) {
            console.error('Error loading images:', error);
            TravelComponents.showError(detailContent);
        }
    }
    
    async loadWeather() {
        const detailContent = document.getElementById('detailContent');
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
    
    // === TRANSPORT HÅNDTERING SEKTION ===
    async handlePlanRoute() {
        const formData = getFormData('transportPlanner');
        const errors = validateForm(formData, ['fromLocation', 'toLocation']);
        
        if (errors.length > 0) {
            alert('Fejl:\n' + errors.join('\n'));
            return;
        }
        
        const planBtn = document.getElementById('planRoute');
        const routeResult = document.getElementById('routeResult');
        
        planBtn.disabled = true;
        planBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Planlægger...';
        routeResult.classList.remove('show');
        
        try {
            const route = await TravelAPI.planRoute(
                formData.fromLocation, 
                formData.toLocation
            );
            
            routeResult.innerHTML = TravelComponents.createRouteResult(route);
            routeResult.classList.add('show');
            
        } catch (error) {
            console.error('Error planning route:', error);
            routeResult.innerHTML = '<div class="route-error"><p>Route planning failed</p></div>';
            routeResult.classList.add('show');
        } finally {
            planBtn.disabled = false;
            planBtn.innerHTML = '<i class="fas fa-route"></i> PLANLÆG RUTE';
        }
    }
    
    // === THEME HÅNDTERING SEKTION ===
    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.body.className = this.theme + '-mode';
        
        const themeBtn = document.getElementById('themeBtn');
        const icon = themeBtn.querySelector('i');
        
        if (this.theme === 'light') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        AppStorage.saveSettings({
            theme: this.theme,
            language: Translations.currentLanguage()
        });
    }
    
    // === SETTINGS HÅNDTERING SEKTION ===
    loadSettings() {
        const settings = AppStorage.getSettings();
        this.theme = settings.theme;
        document.body.className = this.theme + '-mode';
        
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            icon.className = this.theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    // === DATA CHECK SEKTION ===
    checkSavedData() {
        const trips = AppStorage.getTrips();
        if (trips.length > 0) {
            console.log('Fundet gemte trips:', trips.length);
        }
    }
}

// === APP INITIALISERING SEKTION ===
document.addEventListener('DOMContentLoaded', () => {
    window.travelApp = new TravelApp();
});

// === ERROR HANDLING SEKTION ===
window.addEventListener('error', (e) => {
    console.error('App error:', e.error);
});

// === SERVICE WORKER SEKTION (valgfri) ===
if ('serviceWorker' in navigator) {
}
