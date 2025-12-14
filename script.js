// =============================================================================
// TRAVEL APP - PROFESSIONEL VERSION MED ALLE FIXES
// =============================================================================

class TravelApp {
    constructor() {
        console.log('🚀 Initializing TravelApp...');
        
        // Core properties
        this.currentLanguage = 'da';
        this.currentScreen = null;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        // Data storage
        this.restaurants = [];
        this.accommodations = [];
        
        // Initialize all systems
        this.initializeElements();
        this.initializeTheme();
        this.initializeEventListeners();
        this.showScreen('startScreen');
        
        console.log('✅ TravelApp initialized successfully');
    }

    // =============================================================================
    // THEME SYSTEM - NEW AND COMPLETE
    // =============================================================================
    
    initializeTheme() {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
        
        console.log(`🎨 Theme initialized: ${this.currentTheme}`);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.currentTheme = newTheme;
        
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        this.updateThemeIcon();
        
        console.log(`🎨 Theme switched to: ${newTheme}`);
        
        // Show feedback
        Components.showInfo(`Skiftede til ${newTheme === 'dark' ? 'mørk' : 'lys'} tema`);
    }
    
    updateThemeIcon() {
        const sunIcon = document.querySelector('.theme-icon-sun');
        const moonIcon = document.querySelector('.theme-icon-moon');
        
        if (this.currentTheme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }

    // =============================================================================
    // ELEMENT INITIALIZATION - ENHANCED
    // =============================================================================
    
    initializeElements() {
        // Screens
        this.screens = {
            startScreen: document.getElementById('startScreen'),
            transportScreen: document.getElementById('transportScreen')
        };

        // Main form elements
        this.elements = {
            selectLanguage: document.getElementById('selectLanguage'),
            destination: document.getElementById('destination'),
            startDate: document.getElementById('startDate'),
            days: document.getElementById('days'),
            startTravel: document.getElementById('startTravel'),
            startForm: document.getElementById('startForm'),
            routeForm: document.getElementById('routeForm'),
            planRoute: document.getElementById('planRoute'),
            themeToggle: document.getElementById('themeToggle')
        };

        // Validation
        this.validateElements();
    }
    
    validateElements() {
        const missingElements = [];
        
        Object.keys(this.elements).forEach(key => {
            if (!this.elements[key]) {
                missingElements.push(key);
            }
        });
        
        if (missingElements.length > 0) {
            console.warn('⚠️ Missing elements:', missingElements);
        }
    }

    // =============================================================================
    // EVENT LISTENERS - COMPLETE WITH ALL HANDLERS
    // =============================================================================
    
    initializeEventListeners() {
        this.setupLanguageListener();
        this.setupThemeListener();
        this.setupFormListeners();
        this.setupNavigationListeners();
        this.setupBackButtonListeners();
        
        console.log('✅ Event listeners initialized');
    }
    
    setupLanguageListener() {
        if (this.elements.selectLanguage) {
            this.elements.selectLanguage.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
        }
    }
    
    setupThemeListener() {
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    
    setupFormListeners() {
        // Start form
        if (this.elements.startForm) {
            this.elements.startForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleStartTravel();
            });
        }

        // Transport form
        if (this.elements.routeForm) {
            this.elements.routeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handlePlanRoute();
            });
        }
    }
    
    setupNavigationListeners() {
        // Bottom navigation
        document.querySelectorAll('.nav-item[data-screen]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const screenId = item.dataset.screen;
                if (screenId) {
                    this.updateActiveNav(screenId);
                    this.navigateToScreen(screenId);
                }
            });
        });
    }
    
    setupBackButtonListeners() {
        // Back buttons
        document.querySelectorAll('.back-button[data-screen]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetScreen = button.dataset.screen;
                if (targetScreen) {
                    this.navigateToScreen(targetScreen);
                } else {
                    this.handleBack();
                }
            });
        });
        
        // Fallback back button
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.handleBack();
            });
        }
    }

    // =============================================================================
    // NAVIGATION SYSTEM - COMPLETE
    // =============================================================================
    
    handleBack() {
        const screenHistory = ['startScreen', 'transportScreen'];
        const currentIndex = screenHistory.indexOf(this.currentScreen);
        
        if (currentIndex > 0) {
            this.navigateToScreen(screenHistory[currentIndex - 1]);
        } else {
            this.navigateToScreen('startScreen');
        }
    }
    
    navigateToScreen(screenId) {
        if (this.screens[screenId]) {
            this.showScreen(screenId);
            this.updateActiveNav(screenId);
            
            // Update URL history
            history.pushState({ screen: screenId }, '', `#${screenId}`);
        } else {
            console.warn(`⚠️ Screen ${screenId} not found`);
            this.navigateToScreen('startScreen');
        }
    }
    
    updateActiveNav(screenId) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current nav item
        const activeItem = document.getElementById(`nav-${screenId.replace('Screen', '')}`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    // =============================================================================
    // SCREEN MANAGEMENT - COMPLETE
    // =============================================================================
    
    showScreen(screenId) {
        console.log(`📺 Switching to screen: ${screenId}`);
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = this.screens[screenId];
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
            
            // Scroll to top
            window.scrollTo({ top: 0, Behavior: 'smooth' });
            
            console.log(`✅ Screen ${screenId} shown successfully`);
        } else {
            console.error(`❌ Screen ${screenId} not found!`);
            this.showScreen('startScreen');
        }
    }

    // =============================================================================
    // LANGUAGE SYSTEM - COMPLETE
    // =============================================================================
    
    switchLanguage(language) {
        if (['da', 'de', 'en', 'pl', 'lt'].includes(language)) {
            this.currentLanguage = language;
            localStorage.setItem('travelAppLanguage', language);
            this.updateUI();
            console.log(`🌐 Language switched to: ${language}`);
        }
    }
    
    updateUI() {
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            const translation = translations[this.currentLanguage]?.[key];
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    // =============================================================================
    // FORM HANDLERS - COMPLETE
    // =============================================================================
    
    handleStartTravel() {
        console.log('🚀 Starting travel planning...');
        
        // Basic validation
        const destination = this.elements.destination?.value;
        const startDate = this.elements.startDate?.value;
        const days = this.elements.days?.value;
        
        if (!destination || !startDate || !days) {
            Components.showError('Udfyld venligst alle felter');
            return;
        }
        
        // Navigate to transport screen
        this.navigateToScreen('transportScreen');
        Components.showSuccess('Rejseplanlægning startet!');
    }
    
    handlePlanRoute() {
        console.log('🗺️ Planning route...');
        
        Components.showLoading('Planlægger rute...');
        
        setTimeout(() => {
            Components.hideLoading();
            Components.showSuccess('Rute planlagt! (Demo)');
        }, 2000);
    }

    // =============================================================================
    // OTHER METHODS
    // =============================================================================
    
    showError(message) {
        Components.showError(message);
    }
    
    showSuccess(message) {
        Components.showSuccess(message);
    }
    
    showInfo(message) {
        Components.showInfo(message);
    }
}

// =============================================================================
// APP INITIALIZATION - PROFESSIONEL
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🌟 DOM Content Loaded - Starting TravelApp');
        
        // Wait for translations to load
        if (typeof translations === 'undefined') {
            console.error('❌ Translations not loaded');
            return;
        }
        
        window.travelApp = new TravelApp();
        
        // Global error handling
        window.addEventListener('error', (e) => {
            console.error('🚨 JavaScript Error:', e.error);
            if (window.travelApp) {
                window.travelApp.showError('Der opstod en uventet fejl');
            }
        });
        
        // Handle browser back
        window.addEventListener('popstate', (e) => {
            if (e.state?.screen && window.travelApp) {
                window.travelApp.navigateToScreen(e.state.screen);
            }
        });
        
        console.log('✅ TravelApp is ready!');
        
    } catch (error) {
        console.error('❌ Failed to initialize TravelApp:', error);
        
        // Show user-friendly error message
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif; background: #121212; color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
                <div style="max-width: 600px;">
                    <h1 style="color: #ff4444; margin-bottom: 20px;">⚠️ Initialiseringsfejl</h1>
                    <p style="margin-bottom: 20px;">Appen kunne ikke starte korrekt.</p>
                    <button onclick="location.reload()" style="background: #00ffff; color: #121212; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                        Genindlæs side
                    </button>
                </div>
            </div>
        `;
    }
});
