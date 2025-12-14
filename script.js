/* =============================================================================
   TRAVEL ASSISTANT APP - KOMPLET SCRIPT.JS VERSION
   ============================================================================= */

// =============================================================================
// 1. GLOBAL KONFIGURATION & IMPORTS
// =============================================================================

// Import.Components er defineret i components.js
// Translations kommer fra translations.js

const API_CONFIG = {
    overpass: 'https://overpass-api.de/api/interpreter',
    nominatim: 'https://nominatim.openstreetmap.org/search'
};

const APP_SETTINGS = {
    defaultLanguage: 'da',
    defaultRadius: 2000,
    supportedLanguages: ['da', 'de', 'en', 'pl', 'lt'],
    existingScreens: ['startScreen', 'transportScreen'] // Kun screens der findes i HTML
};

console.log('📦 Loading TravelApp configuration...');

// =============================================================================
// 2. TRAVELAPP HOVEDKLASSE
// =============================================================================

class TravelApp {
    /**
     * Constructor initializerer hele app'en
     */
    constructor() {
        console.log('🚀 Initializing TravelApp...');
        
        // Core properties
        this.currentLanguage = APP_SETTINGS.defaultLanguage;
        this.currentScreen = null;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.isLoading = false;
        this.currentCity = null;
        
        // Data storage
        this.restaurants = [];
        this.accommodations = [];
        this.sights = [];
        this.secrets = [];
        this.images = [];
        this.transportData = null;
        
        // Initialize alle systemer i korrekt rækkefølge
        this.initializeElements();
        this.initializeTheme();
        this.initializeEventListeners();
        this.showScreen('startScreen');
        
        console.log('✅ TravelApp initialized successfully');
    }

    // =============================================================================
    // 3. ELEMENT INITIALIZATION SYSTEM
    // =============================================================================
    
    /**
     * Initialiserer alle HTML elementer som app'en skal bruge
     * KUN include elementer der FAKTISK findes i din index.html
     */
    initializeElements() {
        console.log('🔍 Initializing elements...');
        
        // Screens - KUN eksisterende screens fra HTML
        this.screens = {
            startScreen: document.getElementById('startScreen'),
            transportScreen: document.getElementById('transportScreen')
        };

        // Form elements - KUN eksisterende elementer fra HTML
        this.elements = {
            // Language og theme
            selectLanguage: document.getElementById('selectLanguage'),
            themeToggle: document.getElementById('themeToggle'),
            
            // Start form elementer
            destination: document.getElementById('destination'),
            startDate: document.getElementById('startDate'),
            days: document.getElementById('days'),
            startTravel: document.getElementById('startTravel'),
            startForm: document.getElementById('startForm'),
            
            // Transport form elementer
            routeForm: document.getElementById('routeForm'),
            routeFrom: document.getElementById('routeFrom'),
            routeTo: document.getElementById('routeTo'),
            departureDate: document.getElementById('departureDate'),
            departureTime: document.getElementById('departureTime'),
            planRoute: document.getElementById('planRoute'),
            
            // Navigation elementer
            backBtn: document.getElementById('backBtn')
        };

        // Valider at alle kritiske elementer findes
        this.validateExistingElements();
        console.log('✅ Elements initialized');
    }

    /**
     * Validerer at alle nødvendige HTML elementer findes
     */
    validateExistingElements() {
        console.log('🔍 Validating HTML elements...');
        
        // Valider screens - absolute krav
        Object.keys(this.screens).forEach(key => {
            if (!this.screens[key]) {
                console.error(`❌ CRITICAL: Screen not found: ${key}`);
            } else {
                console.log(`✅ Screen found: ${key}`);
            }
        });

        // Valider kritiske elementer - app kan ikke køre uden disse
        const criticalElements = ['selectLanguage', 'destination', 'themeToggle'];
        let criticalFound = 0;
        
        criticalElements.forEach(key => {
            if (!this.elements[key]) {
                console.error(`❌ CRITICAL: Element not found: ${key}`);
            } else {
                console.log(`✅ Critical element found: ${key}`);
                criticalFound++;
            }
        });
        
        // Valider optionelle elementer - app kan køre uden
        const optionalElements = ['routeForm', 'planRoute', 'backBtn'];
        optionalElements.forEach(key => {
            if (!this.elements[key]) {
                console.warn(`⚠️ Optional element not found: ${key}`);
            } else {
                console.log(`✅ Optional element found: ${key}`);
            }
        });
        
        // Status raport
        console.log(`📊 Element validation: ${criticalFound}/${criticalElements.length} critical elements found`);
    }

    // =============================================================================
    // 4. THEME SYSTEM - LYD/MØRK TILS
    // =============================================================================
    
    /**
     * Initialiserer theme system ved opstart
     */
    initializeTheme() {
        console.log('🎨 Initializing theme system...');
        
        // Anvend gemt theme til dokument
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Opdater theme toggle ikon
        this.updateThemeIcon();
        
        // Apply theme farver
        this.updateThemeColors();
        
        console.log(`✅ Theme initialized: ${this.currentTheme}`);
    }
    
    /**
     * Skifter mellem lys og mørk tema
     */
    toggleTheme() {
        console.log(`🔄 Toggling theme from ${this.currentTheme}...`);
        
        // Skift theme value
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        
        // Anvend theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        // Update UI
        this.updateThemeIcon();
        this.updateThemeColors();
        
        // Bruger feedback
        if (window.Components && window.Components.showInfo) {
            window.Components.showInfo(`Skiftede til ${this.currentTheme === 'dark' ? 'mørk' : 'lys'} tema`);
        }
        
        console.log(`✅ Theme switched to: ${this.currentTheme}`);
    }
    
    /**
     * Opdaterer theme toggle ikon baseret på current theme
     */
    updateThemeIcon() {
        const themeToggle = this.elements.themeToggle;
        const themeIcon = themeToggle?.querySelector('.theme-text');
        
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'dark' ? '🌙' : '☀️';
        }
        
        // Tilføj CSS class for styling
        if (themeToggle) {
            themeToggle.className = `theme-toggle theme-${this.currentTheme}`;
        }
    }
    
    /**
     * Opdaterer CSS farve-variabler baseret på theme
     */
    updateThemeColors() {
        const root = document.documentElement;
        
        if (this.currentTheme === 'light') {
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--text-primary', '#000000');
            root.style.setProperty('--bg-secondary', '#f5f5f5');
            root.style.setProperty('--text-secondary', '#333333');
            root.style.setProperty('--bg-card', '#ffffff');
        } else {
            root.style.setProperty('--bg-primary', '#0A0A0F');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#1A1A2E');
            root.style.setProperty('--text-secondary', '#e0e0ff');
            root.style.setProperty('--bg-card', 'rgba(15, 52, 96, 0.9)');
        }
    }

    // =============================================================================
    // 5. EVENT LISTENERS SETUP SYSTEM
    // =============================================================================
    
    /**
     * Initialiserer alle event listeners i app'en
     */
    initializeEventListeners() {
        console.log('👂 Setting up event listeners...');
        
        let listenersSetup = 0;
        
        // 5.1: Language selector
        if (this.elements.selectLanguage) {
            this.elements.selectLanguage.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
            console.log('✅ Language selector listener added');
            listenersSetup++;
        } else {
            console.error('❌ Language selector not found');
        }

        // 5.2: Theme toggle button
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
            console.log('✅ Theme toggle listener added');
            listenersSetup++;
        } else {
            console.error('❌ Theme toggle not found');
        }

        // 5.3: Start form submit
        if (this.elements.startForm) {
            this.elements.startForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleStartTravel();
            });
            console.log('✅ Start form listener added');
            listenersSetup++;
        } else {
            console.error('❌ Start form not found');
        }

        // 5.4: Transport form submit
        if (this.elements.routeForm) {
            this.elements.routeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handlePlanRoute();
            });
            console.log('✅ Transport form listener added');
            listenersSetup++;
        } else {
            console.warn('⚠️ Transport form not found');
        }

        // 5.5: Navigation system
        this.setupNavigationListeners();
        listenersSetup++;
        
        // 5.6: Back button system
        this.setupBackButtonListeners();
        listenersSetup++;
        
        console.log(`✅ Total listeners setup: ${listenersSetup}`);
    }

    // =============================================================================
    // 6. NAVIGATION SYSTEM
    // =============================================================================
    
    /**
     * Setup bottom navigation event listeners
     */
    setupNavigationListeners() {
        console.log('🧭 Setting up navigation...');
        
        const navItems = document.querySelectorAll('.nav-item[data-screen]');
        let navSetup = 0;
        
        navItems.forEach((item, index) => {
            const screenId = item.dataset.screen;
            
            console.log(`📍 Navigation item ${index}: ${screenId}`);
            
            // Validér at screen findes FØR listener tilføjes
            if (this.screens[screenId]) {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log(`🧭 Navigating to: ${screenId}`);
                    
                    this.updateActiveNav(screenId);
                    this.navigateToScreen(screenId);
                });
                navSetup++;
                
                console.log(`✅ Navigation ready for: ${screenId}`);
            } else {
                console.warn(`⚠️ Skipping navigation to ${screenId} - screen not found`);
                // Deaktiver navigation item der ikke virker
                item.style.opacity = '0.5';
                item.style.pointerEvents = 'none';
                item.setAttribute('aria-disabled', 'true');
            }
        });
        
        console.log(`✅ Navigation setup completed for ${navSetup}/${navItems.length} items`);
    }

    /**
     * Setup back button event listeners
     */
    setupBackButtonListeners() {
        console.log('↩️ Setting up back buttons...');
        
        let backSetup = 0;
        
        // Generiske back buttons med data-screen attribut
        document.querySelectorAll('.back-button[data-screen]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetScreen = button.dataset.screen;
                if (targetScreen && this.screens[targetScreen]) {
                    this.navigateToScreen(targetScreen);
                } else {
                    this.handleBack();
                }
            });
            backSetup++;
        });
        
        // Specifik back button
        if (this.elements.backBtn) {
            this.elements.backBtn.addEventListener('click', () => {
                this.handleBack();
            });
            backSetup++;
            console.log('✅ Back button listener added');
        }
        
        console.log(`✅ Back button setup completed: ${backSetup} buttons`);
    }

    /**
     * General navigation handler
     */
    handleBack() {
        console.log('↩️ Back button clicked');
        
        // Simpel back logik baseret på current screen
        if (this.currentScreen === 'transportScreen') {
            this.navigateToScreen('startScreen');
        } else {
            // Default til start screen
            this.navigateToScreen('startScreen');
        }
    }

    /**
     * Navigerer til en specifik screen opdaterer nav aktiv state
     */
    navigateToScreen(screenId) {
        console.log(`📺 Navigating to screen: ${screenId}`);
        
        if (this.screens[screenId]) {
            this.showScreen(screenId);
            this.updateActiveNav(screenId);
            
            // Update browser history
            history.pushState({ screen: screenId }, '', `#${screenId}`);
            
            console.log(`✅ Successfully navigated to: ${screenId}`);
        } else {
            console.error(`❌ Screen ${screenId} not available`);
            // Fallback til start screen
            this.navigateToScreen('startScreen');
        }
    }

    // =============================================================================
    // 7. SCREEN MANAGEMENT SYSTEM
    // =============================================================================
    
    /**
     * Viser en specifik screen og skjuler alle andre
     */
    showScreen(screenId) {
        console.log(`📺 Switching to screen: ${screenId}`);
        
        // Skjul alle screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Vis target screen
        const targetScreen = this.screens[screenId];
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
            
            // Scroll til top

Position 4148
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            console.log(`✅ Screen ${screenId} shown successfully`);
        } else {
            console.error(`❌ Screen ${screenId} not found!`);
        }
    }
    
    /**
     * Opdaterer active state i bottom navigation
     */
    updateActiveNav(screenId) {
        // Fjern active class fra alle nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Find og tilføj active class til current item
        const activeId = screenId.replace('Screen', '').toLowerCase();
        const activeItem = document.querySelector(`#nav-${activeId}`);
        
        if (activeItem) {
            activeItem.classList.add('active');
            console.log(`✅ Updated active nav: nav-${activeId}`);
        } else {
            console.warn(`⚠️ Could not find nav item for: ${activeId}`);
        }
    }

    // =============================================================================
    // 8. LANGUAGE SYSTEM
    // =============================================================================
    
    /**
     * Skifter sprog i hele app'en
     */
    switchLanguage(language) {
        console.log(`🌐 Switching language to: ${language}`);
        
        if (APP_SETTINGS.supportedLanguages.includes(language)) {
            this.currentLanguage = language;
            localStorage.setItem('travelAppLanguage', language);
            this.updateUI();
            
            console.log(`✅ Language switched to: ${language}`);
        } else {
            console.error(`❌ Unsupported language: ${language}`);
        }
    }
    
    /**
     * Opdaterer UI med nye tekster baseret på nuværende sprog
     */
    updateUI() {
        console.log('🔄 Updating UI language...');
        
        const elements = document.querySelectorAll('[data-translate]');
        let elementsUpdated = 0;
        
        elements.forEach(element => {
            const key = element.dataset.translate;
            const translation = translations[this.currentLanguage]?.[key];
            
            if (translation) {
                element.textContent = translation;
                elementsUpdated++;
            } else {
                console.warn(`⚠️ Missing translation for: ${key} (${this.currentLanguage})`);
            }
        });
        
        console.log(`✅ UI updated: ${elementsUpdated}/${elements.length} elements translated`);
        
        // Opdater form placeholders
        this.updateFormPlaceholders();
    }
    
    /**
     * Opdaterer form placeholders med nye tekster
     */
    updateFormPlaceholders() {
        // Update destination input
        if (this.elements.destination) {
            const placeholder = translations[this.currentLanguage]?.['destinationPlaceholder'] || 'Enter city name';
            this.elements.destination.placeholder = placeholder;
        }
        // Tilføj flere placeholder opdateringer efter behov
    }

    // =============================================================================
    // 9. FORM HANDLERS
    // =============================================================================
    
    /**
     * Håndterer start form submit
     */
    handleStartTravel() {
        console.log('🚀 Starting travel planning...');
        
        // Basic validation
        const destination = this.elements.destination?.value;
        const startDate = this.elements.startDate?.value;
        const days = this.elements.days?.value;
        
        // Validation check
        if (!destination || !startDate || !days) {
            const errorMessage = translations[this.currentLanguage]?.['formValidation']?.['requiredFields'] || 'Please fill all required fields';
            
            if (window.Components && window.Components.showError) {
                window.Components.showError(errorMessage);
            }
            console.warn('⚠️ Form validation failed');
            return;
        }
        
        // Valider destination
        if (destination.length < 2) {
            const errorMessage = translations[this.currentLanguage]?.['formValidation']?.['destinationTooShort'] || 'Destination must be at least 2 characters';
            
            if (window.Components && window.Components.showError) {
                window.Components.showError(errorMessage);
            }
            return;
        }
        
        this.currentCity = destination;
        
        // Navigation check
        if (this.screens.transportScreen) {
            this.navigateToScreen('transportScreen');
            
            const successMessage = translations[this.currentLanguage]?.['travel']?.['started'] || 'Travel planning started!';
            
            if (window.Components && window.Components.showSuccess) {
                window.Components.showSuccess(successMessage);
            }
        } else {
            console.error('❌ Transport screen not available');
            
            const errorMessage = translations[this.currentLanguage]?.['errors']?.['transportNotAvailable'] || 'Transport function not available';
            
            if (window.Components && window.Components.showError) {
                window.Components.showError(errorMessage);
            }
        }
    }
    
    /**
     * Håndterer transport form submit
     */
    handlePlanRoute() {
        console.log('🗺️ Planning route...');
        
        // Collect form data
        const routeData = this.getRouteFormData();
        
        // Validation
        if (!this.validateRouteData(routeData)) {
            return;
        }
        
        // Show loading
        if (window.Components && window.Components.showLoading) {
            const loadingMessage = translations[this.currentLanguage]?.['loading']?.['planningRoute'] || 'Planning route...';
            window.Components.showLoading(loadingMessage);
        }
        
        // Simuler rute planlægning 
        setTimeout(() => {
            if (window.Components && window.Components.hideLoading) {
                window.Components.hideLoading();
            }
            
            const successMessage = translations[this.currentLanguage]?.['route']?.['planned'] || 'Route planned! (Demo)';
            
            if (window.Components && window.Components.showSuccess) {
                window.Components.showSuccess(successMessage);
            }
            
            // Gem rute data
            this.transportData = routeData;
        }, 2000);
    }
    
    /**
     * Indsaml route form data
     */
    getRouteFormData() {
        return {
            from: this.elements.routeFrom?.value || '',
            to: this.elements.routeTo?.value || '',
            departureDate: this.elements.departureDate?.value || '',
            departureTime: this.elements.departureTime?.value || '',
            transportMode: 'auto', // Default transport mode
            timestamp: new Date().toISOString()
        };
    }
    
    /**
     * Validér route form data
     */
    validateRouteData(data) {
        if (!data.from || !data.to) {
            const errorMessage = translations[this.currentLanguage]?.['formValidation']?.['routeRequired'] || 'Start and destination are required';
            
            if (window.Components && window.Components.showError) {
                window.Components.showError(errorMessage);
            }
            return false;
        }

        if (data.from.toLowerCase().trim() === data.to.toLowerCase().trim()) {
            const errorMessage = translations[this.currentLanguage]?.['formValidation']?.['sameLocation'] || 'Start and destination cannot be the same';
            
            if (window.Components && window.Components.showError) {
                window.Components.showError(errorMessage);
            }
            return false;
        }
        
        return true;
    }


    // =============================================================================
    // 10. ERROR HANDLING SYSTEM
    // =============================================================================
    
    /**
     * Centraliseret error handler
     */
    handleError(error, userMessage = null) {
        console.error('🚨 App Error:', error);
        
        const errorMessage = userMessage || 
                          translations[this.currentLanguage]?.['errors']?.['general'] || 
                          'An unexpected error occurred';
        
        if (window.Components && window.Components.showError) {
            window.Components.showError(errorMessage);
        }
    }

    /**
     * Viser fejlbesked til bruger
     */
    showError(message) {
        if (window.Components && window.Components.showError) {
            window.Components.showError(message);
        } else {
            alert(message); // Fallback
        }
    }
    
    /**
     * Viser sucesbesked til bruger
     */
    showSuccess(message) {
        if (window.Components && window.Components.showSuccess) {
            window.Components.showSuccess(message);
        } else {
            console.log('✅ Success:', message); // Fallback
        }
    }

    
    // =============================================================================
// 11. VALIDATION SYSTEM
// =============================================================================

/**
 * Generisk form validator
 */
validateFormData(fields = []) {
    console.log('✅ Validating form data for fields:', fields);
    
    const formData = this.getFormData();
    const errors = [];

    fields.forEach(field => {
        const value = formData[field];
        
        if (!value || value.trim() === '') {
            const fieldName = this.getFieldDisplayName(field);
            const requiredMessage = translations[this.currentLanguage]?.['validation']?.['required'] || `${fieldName} is required`;
            errors.push(requiredMessage);
        }
        
        // Validering for 'days' felt
        if (field === 'days' && value) {
            const days = parseInt(value);
            if (isNaN(days) || days < 1 || days > 30) {
                const invalidDaysMessage = translations[this.currentLanguage]?.['validation']?.['invalidDays'] || 'Days must be between 1 and 30';
                errors.push(invalidDaysMessage);
            }
        }
        
        // Validering for 'destination' felt
        if (field === 'destination' && value) {
            if (value.length < 2) {
                const invalidDestMessage = translations[this.currentLanguage]?.['validation']?.['invalidDestination'] || 'Destination must be at least 2 characters';
                errors.push(invalidDestMessage);
            }
        }
        
        // Validering for 'startDate' felt
        if (field === 'startDate' && value) {
            const parsedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time part for comparison
            
            if (parsedDate < today) {
                const invalidDateMessage = translations[this.currentLanguage]?.['validation']?.['pastDate'] || 'Start date cannot be in the past';
                errors.push(invalidDateMessage);
            }
        }
        
        // Validering for 'departureDate' felt
        if (field === 'departureDate' && value) {
            const parsedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (parsedDate < today) {
                const invalidDateMessage = translations[this.currentLanguage]?.['validation']?.['pastDate'] || 'Departure date cannot be in the past';
                errors.push(invalidDateMessage);
            }
        }
        
        // Validering for 'departureTime' felt
        if (field === 'departureTime' && value) {
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(value)) {
                const invalidTimeMessage = translations[this.currentLanguage]?.['validation']?.['invalidTime'] || 'Invalid time format (HH:MM)';
                errors.push(invalidTimeMessage);
            }
        }
    });

    const isValid = errors.length === 0;
    
    console.log(`📋 Validation result: ${isValid ? '✅ Valid' : '❌ Invalid'} with ${errors.length} errors`);
    
    if (!isValid) {
        console.log('❌ Validation errors:', errors);
    }
    
    return {
        valid: isValid,
        errors: errors,
        formData: formData
    };
}

/**
 * Henter translated felt-navn
 */
getFieldDisplayName(field) {
    return translations[this.currentLanguage]?.['fields']?.[field] || field;
}

/**
 * Validerer specifikt felt og viser fejl direkte på elementet
 */
validateField(fieldId, customRules = {}) {
    console.log(`🔍 Validating field: ${fieldId}`);
    
    const field = document.getElementById(fieldId);
    if (!field) {
        console.error(`❌ Field not found: ${fieldId}`);
        return false;
    }
    
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error', 'success');
    
    // Required validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = translations[this.currentLanguage]?.['validation']?.['required'] || 'This field is required';
    }
    
    // Custom validation rules
    if (isValid && value) {
        // Min length validation
        if (customRules.minLength && value.length < customRules.minLength) {
            isValid = false;
            errorMessage = `Minimum ${customRules.minLength} characters required`;
        }
        
        // Max length validation
        if (customRules.maxLength && value.length > customRules.maxLength) {
            isValid = false;
            errorMessage = `Maximum ${customRules.maxLength} characters allowed`;
        }
        
        // Pattern validation
        if (customRules.pattern && !new RegExp(customRules.pattern).test(value)) {
            isValid = false;
            errorMessage = customRules.patternMessage || 'Invalid format';
        }
        
        // Email validation (for future use)
        if (customRules.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = translations[this.currentLanguage]?.['validation']?.['invalidEmail'] || 'Invalid email format';
            }
        }
        
        // Phone validation (for future use)
        if (customRules.type === 'phone') {
            const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = translations[this.currentLanguage]?.['validation']?.['invalidPhone'] || 'Invalid phone format';
            }
        }
    }
    
    // Apply visual feedback
    this.showFieldValidation(field, isValid, errorMessage);
    
    return isValid;
}

/**
 * Viser validerings feedback på et felt
 */
showFieldValidation(field, isValid, errorMessage = '') {
    // Fjern tidligere fejl styling
    field.classList.remove('error', 'success');
    
    // Fjern tidligere fejlbesked
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    if (!isValid) {
        // Tilføj error class
        field.classList.add('error');
        
        // Tilføj fejlbesked
        if (errorMessage) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }
        
        // Animate error state
        field.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
        
    } else if (field.value.trim()) {
        // Tilføj success class hvis felt har værdi
        field.classList.add('success');
    }
}

/**
 * Validerer hele form på én gang
 */
validateForm(formId) {
    console.log(`📋 Validating complete form: ${formId}`);
    
    const form = document.getElementById(formId);
    if (!form) {
        console.error(`❌ Form not found: ${formId}`);
        return { valid: false, errors: ['Form not found'] };
    }
    
    const requiredFields = Array.from(form.querySelectorAll('[required]')).map(field => field.name || field.id);
    return this.validateFormData(requiredFields);
}

/**
 * Viser alle form fejl på én gang
 */
showFormErrors(errors, formId = null) {
    console.log('❌ Showing form errors:', errors);
    
    if (window.Components && window.Components.showError) {
        // Brug Components system hvis tilgængeligt
        errors.forEach((error, index) => {
            setTimeout(() => {
                window.Components.showError(error);
            }, index * 100); // Stagger errors
        });
    } else {
        // Fallback til alert hvis Components ikke er loaded
        const errorMessage = errors.join('\n');
        alert(errorMessage);
    }
}

/**
 * Live validation - validerer felt mens bruger skriver (debounced)
 */
setupLiveValidation(fieldId, customRules = {}) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    let typingTimer;
    
    // Input event med debouncing
    field.addEventListener('input', () => {
        clearTimeout(typingTimer);
        
        typingTimer = setTimeout(() => {
            if (field.value.trim()) {
                this.validateField(fieldId, customRules);
            }
        }, 500); // 500ms delay
    });
    
    // Blur event - valider altid
    field.addEventListener('blur', () => {
        this.validateField(fieldId, customRules);
    });
    
    console.log(`✅ Live validation setup for: ${fieldId}`);
}

/**
 * Advanced validation med kryds-felt validering
 */
crossFieldValidation(formData) {
    const errors = [];
    
    // Validering: start dato må ikke være efter slut dato
    if (formData.startDate && formData.endDate) {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        
        if (startDate > endDate) {
            const crossFieldError = translations[this.currentLanguage]?.['validation']?.['dateOrder'] || 'Start date must be before end date';
            errors.push(crossFieldError);
        }
    }
    
    // Validering: tidsinterval (max 7 dage for travel planning)
    if (formData.startDate && formData.days) {
        const startDate = new Date(formData.startDate);
        const maxEndDate = new Date(startDate.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 dage
        
        if (formData.days > 7) {
            const maxDaysError = translations[this.currentLanguage]?.['validation']?.['maxDays'] || 'Maximum 7 days allowed for travel planning';
            errors.push(maxDaysError);
        }
    }
    
    // Validering: start og destination må ikke være identiske
    if (formData.from && formData.to) {
        if (formData.from.toLowerCase().trim() === formData.to.toLowerCase().trim()) {
            const sameLocationError = translations[this.currentLanguage]?.['validation']?.['sameLocation'] || 'Start and destination cannot be the same';
            errors.push(sameLocationError);
        }
    }
    
    return errors;
}

/**
 * Valideringer til specifikke form typer
 */
getValidationRules(fieldType) {
    const rules = {
        destination: {
            minLength: 2,
            maxLength: 100,
            pattern: '^[a-zA-ZæøåÆØÅäÄöÖ\\s\\-\\\'\\.]+$',
            patternMessage: 'Only letters, spaces, hyphens and dots allowed'
        },
        days: {
            type: 'number',
            min: 1,
            max: 30
        },
        email: {
            type: 'email'
        },
        phone: {
            type: 'phone'
        },
        date: {
            type: 'date',
            customValidator: (value) => {
                const date = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date >= today;
            },
            customMessage: 'Date cannot be in the past'
        },
        time: {
            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
            patternMessage: 'Please use 24-hour format (HH:MM)'
        }
    };
    
    // Tilføj ekstra regler baseret på current language
    if (this.currentLanguage === 'da') {
        // Danske specifikke regler
        rules.destination.patternMessage = 'Kun bogstaver, mellemrum, bindestreg og punktum tilladt';
    }
    
    return rules[fieldType] || {};
}

/**
 * Validerings status feedback til brugeren
 */
showValidationSummary(results, formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Fjern tidligere status
    const existingSummary = form.querySelector('.validation-summary');
    if (existingSummary) {
        existingSummary.remove();
    }
    
    if (results.valid) {
        // Vis succes status
        const successDiv = document.createElement('div');
        successDiv.className = 'validation-summary success';
        successDiv.innerHTML = `
            <div class="success-icon">✅</div>
            <div class="success-message">All fields are valid!</div>
        `;
        form.appendChild(successDiv);
        
        // Auto-fjern efter 3 sekunder
        setTimeout(() => {
            successDiv.style.opacity = '0';
            setTimeout(() => successDiv.remove(), 300);
        }, 3000);
        
    } else {
        // Vis fejl status
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-summary error';
        errorDiv.innerHTML = `
            <div class="error-icon">❌</div>
            <div class="error-message">Please fix the following errors:</div>
            <ul class="error-list">
                ${results.errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;
        form.appendChild(errorDiv);
        
        // Fokuser på første felt med fejl
        const firstErrorField = form.querySelector('.error');
        if (firstErrorField) {
            firstErrorField.focus();
        }
    }
}

// =============================================================================
// DEBUG AND TESTING FUNCTIONS
// =============================================================================

/**
 * Test validering system
 */
testValidationSystem() {
    console.log('🧪 Testing validation system...');
    
    const testCases = [
        {
            name: 'Valid destination',
            data: { destination: 'Copenhagen', days: 5, startDate: '2024-06-15' },
            shouldPass: true
        },
        {
            name: 'Too short destination',
            data: { destination: 'C', days: 5, startDate: '2024-06-15' },
            shouldPass: false
        },
        {
            name: 'Past date',
            data: { destination: 'Copenhagen', days: 5, startDate: '2020-01-01' },
            shouldPass: false
        },
        {
            name: 'Too many days',
            data: { destination: 'Copenhagen', days: 50, startDate: '2024-06-15' },
            shouldPass: false
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`📋 Test ${index + 1}: ${testCase.name}`);
        
        const result = this.validateFormData(Object.keys(testCase.data));
        const passed = result.valid === testCase.shouldPass;
        
        if (passed) {
            console.log(`✅ Test ${index + 1} passed`);
        } else {
            console.log(`❌ Test ${index + 1} failed`);
            console.log(`Expected: ${testCase.shouldPass ? 'Valid' : 'Invalid'}`);
            console.log(`Actual: ${result.valid ? 'Valid' : 'Invalid'}`);
            if (result.errors.length > 0) {
                console.log('Errors:', result.errors);
            }
        }
    });
    
    console.log('🏁 Validation system testing completed');
}

    
    
    
    // =============================================================================
// 12. FEJLHÅNDTERING SYSTEM
// =============================================================================

/**
 * Henter translated felt-navn
 */
getFieldDisplayName(field) {
    return translations[this.currentLanguage]?.['fields']?.[field] || field;
}

/**
 * Centraliseret API fejl håntering
 */
async handleApiError(error, operation = 'API operation') {
    console.error(`🚨 ${operation} failed:`, error);
    
    let userMessage = '';
    
    if (error.message.includes('Network') || error.message.includes('fetch')) {
        userMessage = this.translateError('networkError');
    } else if (error.message.includes('timeout')) {
        userMessage = this.translateError('timeoutError');
    } else if (error.status === 404) {
        userMessage = this.translateError('notFound');
    } else if (error.status === 500) {
        userMessage = this.translateError('serverError');
    } else {
        userMessage = this.translateError('generalError');
    }
    
    this.showError(userMessage);
}

/**
 * Simpel error translator
 */
translateError(errorKey) {
    return translations[this.currentLanguage]?.['errors']?.[errorKey] || 'An error occurred';
}

// =============================================================================
// 13. LOCAL STORAGE SYSTEM
// =============================================================================

/**
 * Gem data i localStorage med fejlhåndtering
 */
saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`💾 Saved to localStorage: ${key}`);
    } catch (error) {
        console.error(`❌ Failed to save to localStorage: ${key}`, error);
        this.showError('Failed to save data locally');
    }
}

/**
 * Hent data fra localStorage
 */
loadFromLocalStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return defaultValue;
    } catch (error) {
        console.error(`❌ Failed to load from localStorage: ${key}`, error);
        return defaultValue;
    }
}

/**
 * Ryd localStorage
 */
clearLocalStorage() {
    try {
        const keysToRemove = ['travelAppLanguage', 'theme', 'recentCities', 'savedRoutes', 'userPreferences'];
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
        console.log('🗑️ Local storage cleared');
    } catch (error) {
        console.error('❌ Failed to clear localStorage:', error);
    }
}

// =============================================================================
// 14. DEBUG SYSTEM
// =============================================================================

/**
 * Global debug funktion
 */
debug() {
    const debugInfo = {
        currentLanguage: this.currentLanguage,
        currentScreen: this.currentScreen,
        currentTheme: this.currentTheme,
        currentCity: this.currentCity,
        isLoading: this.isLoading,
        screensAvailable: Object.keys(this.screens),
        elementsStatus: this.getElementStatus(),
        localStorage: this.getLocalStorageStatus()
    };
    
    console.log('🐛 TravelApp Debug Info:', debugInfo);
    return debugInfo;
}

/**
 * Tjek status på HTML elementer
 */
getElementStatus() {
    const status = {};
    
    Object.keys(this.elements).forEach(key => {
        status[key] = {
            exists: !!this.elements[key],
            tagName: this.elements[key]?.tagName || 'N/A',
            visible: this.elements[key] ? (this.elements[key].offsetParent !== null) : false
        };
    });
    
    return status;
}

/**
 * Tjek localStorage status
 */
getLocalStorageStatus() {
    const status = {};
    const keys = ['travelAppLanguage', 'theme', 'recentCities', 'savedRoutes'];
    
    keys.forEach(key => {
        status[key] = {
            exists: !!localStorage.getItem(key),
            size: localStorage.getItem(key)?.length || 0
        };
    });
    
    return status;
}

// =============================================================================
// 15. GEOCODING & LOCATION SERVICES
// =============================================================================

/**
 * Konverter adresse til koordinater
 */
async geocodeAddress(address) {
    try {
        console.log(`🌍 Geocoding address: ${address}`);
        
        const query = encodeURIComponent(address);
        const response = await fetch(`${API_CONFIG.nominatim}?format=json&q=${query}&limit=1`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            const result = data[0];
            return {
                lat: parseFloat(result.lat),
                lon: parseFloat(result.lon),
                display_name: result.display_name,
                address: {
                    road: result.address?.road,
                    city: result.address?.city || result.address?.town || result.address?.village,
                    postcode: result.address?.postcode,
                    country: result.address?.country
                }
            };
        }
        
        return null;
    } catch (error) {
        await this.handleApiError(error, `Geocoding ${address}`);
        return null;
    }
}

/**
 * Bruger nuværende lokation
 */
async useCurrentLocation() {
    try {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }
        
        console.log('📍 Getting current location...');
        
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 10000,
                enableHighAccuracy: true
            });
        });
        
        const { latitude, longitude } = position.coords;
        
        // Reverse geocode
        const address = await this.reverseGeocode(latitude, longitude);
        
        if (address) {
            this.elements.destination.value = address.address?.city || address.display_name;
        }
        
        this.showSuccess('Location detected!');
        
    } catch (error) {
        console.error('❌ Location error:', error);
        this.showError('Unable to get your location. Please enter it manually.');
    }
}

/**
 * Reverse geocode fra koordinater
 */
async reverseGeocode(lat, lon) {
    try {
        const response = await fetch(`${API_CONFIG.nominatim}?format=json&lat=${lat}&lon=${lon}&limit=1`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            return data[0];
        }
        
        return null;
    } catch (error) {
        console.error('❌ Reverse geocoding failed:', error);
        return null;
    }
}

// =============================================================================
// 16. DATA LOADING & CACHE SYSTEM
// =============================================================================

/**
 * Hent by data med caching
 */
async loadCityData(formData) {
    try {
        console.log(`🏙️ Loading city data for: ${formData.destination}`);
        
        const cacheKey = `city_${formData.destination.toLowerCase()}`;
        const cachedData = this.loadFromLocalStorage(cacheKey);
        
        // Check if data is recent (1 hour old)
        if (cachedData && cachedData.timestamp && (Date.now() - new Date(cachedData.timestamp).getTime() < 3600000)) {
            console.log('📦 Using cached city data');
            return cachedData.data;
        }
        
        const coords = await this.geocodeAddress(formData.destination);
        if (!coords) {
            throw new Error(`City not found: ${formData.destination}`);
        }
        
        this.currentCity = {
            name: formData.destination,
            coords: coords,
            startDate: formData.startDate,
            days: formData.days
        };
        
        // Load all data in parallel
        const [restaurants, accommodations, sights, secrets, images] = await Promise.all([
            this.findRestaurants(coords.lat, coords.lon),
            this.findAccommodations(coords.lat, coords.lon),
            this.findSights(coords.lat, coords.lon),
            this.findSecrets(coords.lat, coords.lon),
            this.findImages(formData.destination)
        ]);
        
        const cityData = {
            restaurants,
            accommodations,
            sights,
            secrets,
            images,
            timestamp: new Date().toISOString()
        };
        
        this.restaurants = restaurants;
        this.accommodations = accommodations;
        this.sights = sights;
        this.secrets = secrets;
        this.images = images;
        
        // Cache the data
        this.saveToLocalStorage(cacheKey, cityData);
        
        // Update displays
        this.displayAllData();
        
        return cityData;
        
    } catch (error) {
        await this.handleApiError(error, `Loading city data for ${formData.destination}`);
        throw error;
    }
}

/**
 * Simulerer data hentning (placeholder til rigtig API)
 */
async findRestaurants(lat, lon, radius = 2000) {
    try {
        console.log('🍽️ Finding restaurants...');
        
        const query = `
            [out:json][timeout:25];
            (
              node["amenity"="restaurant"](around:${radius},${lat},${lon});
              way["amenity"="restaurant"](around:${radius},${lat},${lon});
              relation["amenity"="restaurant"](around:${radius},${lat},${lon});
            );
            out geom;
        `;
        
        return this.mockDataLoader('restaurants', 10);
        
    } catch (error) {
        console.error('❌ Restaurant search failed:', error);
        return [];
    }
}

/**
 * Simulerer hotel søgning
 */
async findAccommodations(lat, lon, radius = 3000) {
    try {
        console.log('🏨 Finding accommodations...');
        return this.mockDataLoader('accommodations', 8);
        
    } catch (error) {
        console.error('❌ Accommodation search failed:', error);
        return [];
    }
}

/**
 * Simulerer seværdigheder søgning
 */
async findSights(lat, lon, radius = 2500) {
    try {
        console.log('🏛️ Finding sights...');
        return this.mockDataLoader('sights', 12);
        
    } catch (error) {
        console.error('❌ Sights search failed:', error);
        return [];
    }
}

/**
 * Simulerer hemmelige steder søgning
 */
async findSecrets(lat, lon, radius = 3000) {
    try {
        console.log('🔍 Finding secret places...');
        return this.mockDataLoader('secrets', 6);
        
    } catch (error) {
        console.error('❌ Secret places search failed:', error);
        return [];
    }
}

/**
 * Simulerer billede hentning
 */
async findImages(cityName) {
    try {
        console.log('📸 Finding images...');
        return this.mockDataLoader('images', 8, cityName);
        
    } catch (error) {
        console.error('❌ Image search failed:', error);
        return [];
    }
}

// =============================================================================
// 17. MOCK DATA SYSTEM (TIL TEST)
// =============================================================================

/**
 * Genererer mock data for demonstration
 */
mockDataLoader(type, count, cityName = '') {
    const mockData = {
        restaurants: this.generateMockRestaurants(count),
        accommodations: this.generateMockAccommodations(count),
        sights: this.generateMockSights(count),
        secrets: this.generateMockSecrets(count),
        images: this.generateMockImages(count, cityName)
    };
    
    return mockData[type] || [];
}

/**
 * Genererer mock restaurant data
 */
generateMockRestaurants(count) {
    const restaurants = [];
    const cuisines = ['Italian', 'Danish', 'Chinese', 'Indian', 'Japanese', 'Mexican', 'French', 'Thai'];
    const names = ['Restaurant Denmark', 'Copenhagen Kitchen', 'Nordic Bites', 'Urban Taste', 'Coastal Flavors'];
    
    for (let i = 0; i < count; i++) {
        restaurants.push({
            id: `restaurant_${i}`,
            name: names[i % names.length] || `Restaurant ${i+1}`,
            address: `${100 + i} Main Street, Copenhagen`,
            cuisine: cuisines[i % cuisines.length],
            rating: (3.5 + Math.random() * 1.5).toFixed(1),
            phone: `+45${30000000 + i}`,
            website: `https://restaurant${i}.dk`,
            priceLevel: ['$', '$$', '$$$'][i % 3],
            lat: 55.6761 + (Math.random() - 0.5) * 0.1,
            lon: 12.5683 + (Math.random() - 0.5) * 0.1,
            opening_hours: '11:00-23:00',
            description: 'Excellent dining experience with local and international cuisine.',
            tags: ['Recommended', 'Local Favorite', 'Good for Groups']
        });
    }
    
    return restaurants;
}

/**
 * Genererer mock hotel data
 */
generateMockAccommodations(count) {
    const accommodations = [];
    const types = ['Hotel', 'Hostel', 'Guest House', 'Motel', 'Boutique Hotel'];
    const names = ['Copenhagen Grand', 'Nordic Comfort Hotel', 'Urban Escape', 'Harbor View Hotel', 'Coastal Inn'];
    
    for (let i = 0; i < count; i++) {
        accommodations.push({
            id: `accommodation_${i}`,
            name: names[i % names.length] || `Hotel ${i+1}`,
            address: `${200 + i} Boulevard Avenue, Copenhagen`,
            type: types[i % types.length],
            rating: (3.0 + Math.random() * 2.0).toFixed(1),
            phone: `+45${40000000 + i}`,
            website: `https://hotel${i}.dk`,
            priceRange: `DKK 800-${1200 + i * 100}`,
            lat: 55.6761 + (Math.random() - 0.5) * 0.1,
            lon: 12.5683 + (Math.random() - 0.5) * 0.1,
            amenities: ['WiFi', 'Parking', 'Breakfast', 'Gym', 'Pool'].slice(0, Math.floor(Math.random() * 4) + 2),
            rooms: Math.floor(Math.random() * 50) + 10,
            checkIn: '15:00',
            checkOut: '11:00',
            description: 'Comfortable and modern accommodation in the heart of the city.',
            tags: ['Pet Friendly', 'City Center', 'Free WiFi']
        });
    }
    
    return accommodations;
}

/**
 * Genererer mock seværdigheder data
 */
generateMockSights(count) {
    const sights = [];
    const types = ['Museum', 'Gallery', 'Monument', 'Park', 'Historic Site', 'Landmark'];
    const names = ['Little Mermaid', 'Tivoli Gardens', 'Nyhavn Harbor', 'Rosenborg Castle', 'Amalienborg Palace'];
    
    for (let i = 0; i < count; i++) {
        sights.push({
            id: `sight_${i}`,
            name: names[i % names.length] || `Attraction ${i+1}`,
            address: `${300 + i} Tourist Street, Copenhagen`,
            type: types[i % types.length],
            rating: (4.0 + Math.random() * 1.0).toFixed(1),
            lat: 55.6761 + (Math.random() - 0.5) * 0.1,
            lon: 12.5683 + (Math.random() - 0.5) * 0.1,
            opening_hours: '09:00-18:00',
            entranceFee: `DKK ${Math.floor(Math.random() * 100) + 50}`,
            visitDuration: '1-2 hours',
            description: 'Must-visit attraction showcasing Danish culture and history.',
            tags: ['Family Friendly', 'Photo Spot', 'Historic']
        });
    }
    
    return sights;
}

/**
 * Genererer mock hemmelige steder data
 */
generateMockSecrets(count) {
    const secrets = [];
    const types = ['Viewpoint', 'Hidden Garden', 'Local Café', 'Secret Beach', 'Hidden Path', 'Rooftop Bar'];
    const names = ['Secret Garden', 'Hidden Café', 'Local Library', 'Hidden Courtyard', 'Secret Rooftop'];
    
    for (let i = 0; i < count; i++) {
        secrets.push({
            id: `secret_${i}`,
            name: names[i % names.length] || `Hidden Gem ${i+1}`,
            address: `Hidden Location ${i+1}, Copenhagen`,
            type: types[i % types.length],
            rating: (4.2 + Math.random() * 0.8).toFixed(1),
            lat: 55.6761 + (Math.random() - 0.5) * 0.1,
            lon: 12.5683 + (Math.random() - 0.5) * 0.1,
            description: 'Local secret known only to insiders and Copenhagen residents.',
            tags: ['Off-the-beaten-path', 'Instagram-worthy', 'Local Tip']
        });
    }
    
    return secrets;
}

/**
 * Genererer mock billede data
 */
generateMockImages(count, cityName = 'Copenhagen') {
    const images = [];
    const categories = ['Street', 'Architecture', 'Food', 'People', 'Night', 'Nature', 'Buildings'];
    
    for (let i = 0; i < count; i++) {
        images.push({
            id: `image_${i}`,
            title: `${categories[i % categories.length]} ${cityName}`,
            caption: `Beautiful ${categories[i % categories.length].toLowerCase()} scene in ${cityName}`,
            url: `https://picsum.photos/seed/${cityName}${i}/400/300.jpg`,
            category: categories[i % categories.length],
            photographer: `Photographer ${i+1}`,
            likes: Math.floor(Math.random() * 1000),
            tags: ['Professional', 'High Quality', 'Tourist Spot']
        });
    }
    
    return images;
}

// =============================================================================
// 18. DISPLAY & RENDER SYSTEM
// =============================================================================

/**
 * Viser alle data på respektive screens
 */
displayAllData() {
    console.log('🎨 Displaying all data...');
    
    this.displayRestaurants();
    this.displayAccommodations();
    this.displaySights();
    this.displaySecrets();
    this.displayImages();
}

/**
 * Viser restauranter
 */
displayRestaurants() {
    if (!this.restaurants || this.restaurants.length === 0) {
        console.log('⚠️ No restaurants to display');
        return;
    }
    
    const container = document.getElementById('restaurants-list');
    if (container) {
        container.innerHTML = this.restaurants.map((restaurant, index) => 
            Components.createRestaurantCard(restaurant, index)
        ).join('');
        console.log(`🍽️ Displayed ${this.restaurants.length} restaurants`);
    }
}

/**
 * Viser overnatning
 */
displayAccommodations() {
    if (!this.accommodations || this.accommodations.length === 0) {
        console.log('⚠️ No accommodations to display');
        return;
    }
    
    const container = document.getElementById('accommodations-list');
    if (container) {
        container.innerHTML = this.accommodations.map((place, index) => 
            Components.createAccommodationCard(place, index)
        ).join('');
        console.log(`🏨 Displayed ${this.accommodations.length} accommodations`);
    }
}

/**
 * Viser seværdigheder
 */
displaySights() {
    if (!this.sights || this.sights.length === 0) {
        console.log('⚠️ No sights to display');
        return;
    }
    
    const container = document.getElementById('sights-list');
    if (container) {
        container.innerHTML = this.sights.map((sight, index) => 
            Components.createSightCard(sight, index)
        ).join('');
        console.log(`🏛️ Displayed ${this.sights.length} sights`);
    }
}

/**
 * Viser hemmelige steder
 */
displaySecrets() {
    if (!this.secrets || this.secrets.length === 0) {
        console.log('⚠️ No secret places to display');
        return;
    }
    
    const container = document.getElementById('secrets-list');
    if (container) {
        container.innerHTML = this.secrets.map((secret, index) => 
            Components.createSecretCard(secret, index)
        ).join('');
        console.log(`🔍 Displayed ${this.secrets.length} secret places`);
    }
}

/**
 * Viser billeder
 */
displayImages() {
    if (!this.images || this.images.length === 0) {
        console.log('⚠️ No images to display');
        return;
    }
    
    const container = document.getElementById('images-list');
    if (container) {
        container.innerHTML = this.images.map((image, index) => 
            Components.createImageCard(image, index)
        ).join('');
        console.log(`📸 Displayed ${this.images.length} images`);
    }
}

// =============================================================================
// 19. ROUTE PLANNING SYSTEM
// =============================================================================

/**
 * Planlæg rute mellem to punkter
 */
async planRoute(routeData) {
    try {
        console.log(`🗺️ Planning route: ${routeData.from} → ${routeData.to}`);
        
        // Geocode addresses
        const fromCoords = await this.geocodeAddress(routeData.from);
        const toCoords = await this.geocodeAddress(routeData.to);

        if (!fromCoords || !toCoords) {
            throw new Error('Could not find address locations');
        }

        // Calculate route details
        const distance = this.calculateDistance(fromCoords, toCoords);
        const duration = this.calculateDuration(distance, routeData.transportMode);
        const departure = new Date(`${routeData.departureDate}T${routeData.departureTime}`);
        const arrival = new Date(departure.getTime() + duration * 60 * 1000);

        return {
            from: routeData.from,
            to: routeData.to,
            fromCoords,
            toCoords,
            distance: `${distance.toFixed(1)} km`,
            duration: this.formatDuration(duration),
            departureTime: this.formatTime(routeData.departureTime),
            arrivalTime: this.formatTimeString(arrival),
            transportMode: routeData.transportMode,
            estimatedCost: this.calculateCost(distance, routeData.transportMode),
            route: this.generateRouteSteps(fromCoords, toCoords),
            alternatives: this.generateAlternativeRoutes(fromCoords, toCoords),
            traffic: this.getTrafficInfo(routeData.departureTime),
            weather: await this.getWeatherInfo(fromCoords),
            directions: this.getDirections(fromCoords, toCoords),
            warnings: this.getRouteWarnings(distance, routeData.departureTime)
        };

    } catch (error) {
        console.error('❌ Route planning failed:', error);
        throw error;
    }
}

/**
 * Beregn afstand mellem to koordinater (Haversine formlen)
 */
calculateDistance(coords1, coords2) {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(coords2.lat - coords1.lat);
    const dLon = this.toRad(coords2.lon - coords1.lon);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRad(coords1.lat)) * Math.cos(this.toRad(coords2.lat)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

/**
 * Konverter grader til radianer
 */
toRad(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Beregn rejsetid baseret på afstand og transportmiddel
 */
calculateDuration(distance, transportMode) {
    const speeds = {
        car: 60,      // km/h
        bicycle: 20,  // km/h
        walking: 5,   // km/h
        train: 80,    // km/h
        bus: 50       // km/h
    };
    
    const speed = speeds[transportMode] || speeds.car;
    return (distance / speed) * 60; // Returner minutter
}

/**
 * Formater varighed til læsbar format
 */
formatDuration(minutes) {
    if (minutes < 60) {
        return `${Math.round(minutes)} min`;
    } else {
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return `${hours}t ${mins}min`;
    }
}

/**
 * Formater tid til 24-timers format
 */
formatTimeString(date) {
    return date.toLocaleTimeString('da-DA', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

/**
 * Formater tid string
 */
formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

/**
 * Beregn transport omkostninger
 */
calculateCost(distance, transportMode) {
    const rates = {
        car: distance * 3.5,      // 3.5 DKK per km
        bicycle: distance * 0.5,  // 0.5 DKK per km
        walking: 0,              // Free
        train: distance * 1.2,   // 1.2 DKK per km
        bus: distance * 1.0       // 1.0 DKK per km
    };
    
    return Math.round(rates[transportMode] || rates.car);
}

/**
 * Generer rutesteps
 */
generateRouteSteps(fromCoords, toCoords) {
    const steps = [
        {
            instruction: `Start at ${fromCoords.address?.city || 'your location'}`,
            distance: '0 km',
            duration: '0 min',
            type: 'start'
        },
        {
            instruction: `Head towards ${toCoords.address?.city || 'destination'}`,
            distance: this.calculateDistance(fromCoords, toCoords).toFixed(1) + ' km',
            duration: this.formatDuration(this.calculateDistance(fromCoords, toCoords) * 2),
            type: 'main'
        },
        {
            instruction: `You have arrived at your destination`,
            distance: '0 km',
            duration: '0 min',
            type: 'end'
        }
    ];
    
    return steps;
}

// =============================================================================
// 20. WEATHER & TRAFFIC SYSTEM
// =============================================================================

/**
 * hent vejr information (placeholder)
 */
async getWeatherInfo(coords) {
    try {
        console.log('🌤️ Getting weather info...');
        
        // Placeholder - i rigtig app ville du api måske openweathermap
        const weathers = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Clear'];
        const temperatures = [15, 18, 22, 25, 28];
        const humidities = [45, 55, 65, 75, 85];
        
        return {
            temperature: temperatures[Math.floor(Math.random() * temperatures.length)],
            condition: weathers[Math.floor(Math.random() * weathers.length)],
            humidity: humidities[Math.floor(Math.random() * humidities.length)],
            windSpeed: Math.floor(Math.random() * 20) + 5,
            pressure: Math.floor(Math.random() * 20) + 1010,
            visibility: 'Good',
            uvIndex: Math.floor(Math.random() * 6) + 1,
            forecast: []
        };
        
    } catch (error) {
        console.error('❌ Weather info failed:', error);
        return null;
    }
}

/**
 * hent trafik information (placeholder)
 */
getTrafficInfo(departureTime) {
    const hour = new Date(departureTime).getHours();
    
    // Simpel traffic baseret på tidspunkt
    if (hour >= 7 && hour <= 9) {
        return { level: 'Heavy', delayMinutes: 15, description: 'Morning rush hour traffic' };
    } else if (hour >= 16 && hour <= 18) {
        return { level: 'Medium', delayMinutes: 10, description: 'Evening traffic' };
    } else {
        return { level: 'Light', delayMinutes: 0, description: 'Normal traffic' };
    }
}

/**
 * Generer alternative ruter
 */
generateAlternativeRoutes(fromCoords, toCoords) {
    const baseDistance = this.calculateDistance(fromCoords, toCoords);
    
    return [
        {
            name: 'Fastest Route',
            distance: `${baseDistance.toFixed(1)} km`,
            duration: this.formatDuration(this.calculateDuration(baseDistance, 'car')),
            cost: this.calculateCost(baseDistance, 'car'),
            reliability: 95
        },
        {
            name: 'Scenic Route',
            distance: `${(baseDistance * 1.3).toFixed(1)} km`,
            duration: this.formatDuration(this.calculateDuration(baseDistance * 1.3, 'car')),
            cost: this.calculateCost(baseDistance * 1.3, 'car'),
            reliability: 85
        },
        {
            name: 'Economical Route',
            distance: `${(baseDistance * 1.1).toFixed(1)} km`,
            duration: this.formatDuration(this.calculateDuration(baseDistance * 1.1, 'car')),
            cost: Math.round(this.calculateCost(baseDistance * 1.1, 'car') * 0.8),
            reliability: 90
        }
    ];
}

/**
 * Hent detaljerede directions
 */
getDirections(fromCoords, toCoords) {
    return {
        totalDistance: this.calculateDistance(fromCoords, toCoords),
        estimatedTime: this.calculateDuration(this.calculateDistance(fromCoords, toCoords), 'car'),
        trafficCondition: 'Moderate',
        instructions: this.generateRouteSteps(fromCoords, toCoords),
        landmarks: ['Notable landmark 1', 'Important junction', 'Central square'],
        turns: 3,
        trafficLights: 5,
        speedZones: ['50 zones', '80 zones'],
        tolls: false,
        ferries: false
    };
}

/**
 * Generer rute advarsler
 */
getRouteWarnings(distance, departureTime) {
    const warnings = [];
    
    // Trafik baserede advarsler
    const traffic = this.getTrafficInfo(departureTime);
    if (traffic.level === 'Heavy') {
        warnings.push({
            type: 'traffic',
            message: `Heavy traffic expected. Add ${traffic.delayMinutes} minutes to your travel time.`,
            severity: 'medium'
        });
    }
    
    // Afstand baserede advarsler
    if (distance > 200) {
        warnings.push({
            type: 'distance',
            message: 'Long distance. Consider taking breaks during your journey.',
            severity: 'low'
        });
    }
    
    // Tids baserede advarsler
    const hour = new Date(departureTime).getHours();
    if (hour >= 22 || hour <= 5) {
        warnings.push({
            type: 'time',
            message: 'Night driving. Ensure your vehicle lights are working and stay alert.',
            severity: 'medium'
        });
    }
    
    return warnings;
}

// =============================================================================
// 21. USER PREFERENCES & SETTINGS
// =============================================================================

/**
 * Hent bruger præferencer
 */
getUserPreferences() {
    try {
        const prefs = this.loadFromLocalStorage('userPreferences', {
            language: 'da',
            theme: 'dark',
            notifications: true,
            autoSave: true,
            defaultTransportMode: 'car',
            maxSearchRadius: 5000,
            showTraffic: true,
            enableDebug: false
        });

        return prefs;
    } catch (error) {
        console.error('❌ Failed to load user preferences:', error);
        return {};
    }
}

/**
 * Gem bruger præferencer
 */
saveUserPreferences(prefs) {
    try {
        const currentPrefs = this.getUserPreferences();
        const updatedPrefs = { ...currentPrefs, ...prefs };
        this.saveToLocalStorage('userPreferences', updatedPrefs);
        console.log('💾 User preferences saved');
    } catch (error) {
        console.error('❌ Failed to save user preferences:', error);
    }
}

/**
 * Reset bruger præferencer
 */
resetUserPreferences() {
    try {
        localStorage.removeItem('userPreferences');
        this.currentLanguage = APP_SETTINGS.defaultLanguage;
        this.currentTheme = 'dark';
        this.initializeTheme();
        this.updateUI();
        
        console.log('🔄 User preferences reset to defaults');
    } catch (error) {
        console.error('❌ Failed to reset user preferences:', error);
    }
}

// =============================================================================
// 22. APP LIFECYCLE & CLEANUP
// =============================================================================

/**
 * Global error handler
 */
setupGlobalErrorHandlers() {
    window.addEventListener('error', (e) => {
        console.error('🚨 Global error:', e.error);
        this.handleError(e.error, 'An unexpected error occurred');
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('🚨 Unhandled promise rejection:', e.reason);
        this.handleError(e.reason, 'A promise operation failed');
    });
}

/**
 * Setup browser historik håndtering
 */
setupBrowserHistory() {
    window.addEventListener('popstate', (e) => {
        if (e.state?.screen && this.screens[e.state.screen]) {
            this.showScreen(e.state.screen);
        } else {
            this.showScreen('startScreen');
        }
    });

    window.addEventListener('beforeunload', () => {
        // Opdater URL med current state
        if (this.currentScreen) {
            history.replaceState({ screen: this.currentScreen }, '', `#${this.currentScreen}`);
        }
    });
}

/**
 * Setup keyboard shortcuts
 */
setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Esc - gå tilbage
        if (e.key === 'Escape') {
            this.handleBack();
        }
        
        // Ctrl/Cmd + K - fokus søg
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Ctrl/Cmd + Shift + D - toggle debug mode
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            this.debug();
        }
        
        // Space (i navigation) - aktiver valgt menu item
        if (e.key === ' ' && document.activeElement?.classList?.contains('nav-item')) {
            e.preventDefault();
            document.activeElement.click();
        }
    });
}

/**
 * Setup performance monitoring
 */
setupPerformanceMonitoring() {
    if (window.PerformanceObserver) {
        // Monitor navigation timing
        const navObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log('📊 Navigation Performance:', {
                        loadTime: entry.loadEventEnd - entry.fetchStart,
                        domReady: entry.domContentLoadedEventEnd - entry.fetchStart,
                        fullLoad: entry.loadEventEnd - entry.navigationStart
                    });
                }
            }
        });

        navObserver.observe({ entryTypes: ['navigation'] });
    }
}

/**
 * App destruction - cleanup når app stoppes
 */
destroy() {
    console.log('🧹 Cleaning up TravelApp...');
    
    // Remove alle event listeners
    this.removeEventListeners();
    
    // Clear timeouts
    this.clearAllTimeouts();
    
    // Ryd data
    this.restaurants = [];
    this.accommodations = [];
    this.sights = [];
    this.secrets = [];
    this.images = [];
    
    // Reset state
    this.currentScreen = null;
    this.currentCity = null;
    this.isLoading = false;
    
    console.log('✅ TravelApp destroyed successfully');
}

/**
 * Fjern alle event listeners
 */
removeEventListeners() {
    // Fjern app specifikke listeners
    
    // Sprog selector
    if (this.elements.selectLanguage) {
        this.elements.selectLanguage.removeEventListener('change', this.switchLanguage);
    }
    
    // Theme toggle
    if (this.elements.themeToggle) {
        this.elements.themeToggle.removeEventListener('click', this.toggleTheme);
    }
    
    // Forms
    if (this.elements.startForm) {
        this.elements.startForm.removeEventListener('submit', this.handleStartTravel);
    }
    
    if (this.elements.routeForm) {
        this.elements.routeForm.removeEventListener('submit', this.handlePlanRoute);
    }
}

/**
 * Clear alle timeouts
 */
clearAllTimeouts() {
    // Find og clear alle timeouts (til debugging purposes)
    const highestTimeoutId = setTimeout(() => {});
    for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
}

// =============================================================================
// 23. ENGAGEMENT & GAMIFICATION FEATURES
// =============================================================================

/**
 * Simpel user engagement system
 */
trackUserEngagement(action, data = {}) {
    const engagement = {
        action: action,
        timestamp: new Date().toISOString(),
        data: data,
        sessionDuration: Date.now() - (window.travelAppStartTime || Date.now())
    };
    
    // Gem engagement data til analyse
    this.saveEngagementData(engagement);
}

/**
 * Gem engagement data
 */
saveEngagementData(data) {
    try {
        let engagementData = this.loadFromLocalStorage('userEngagement', []);
        engagementData.push(data);
        
        // Hold kun de sidste 100 aktiviteter
        if (engagementData.length > 100) {
            engagementData = engagementData.slice(-100);
        }
        
        this.saveToLocalStorage('userEngagement', engagementData);
    } catch (error) {
        console.error('❌ Failed to save engagement data:', error);
    }
}

/**
 * Simpel gamification system
 */
awardPoints(action, points = 10) {
    try {
        let totalPoints = this.loadFromLocalStorage('userPoints', 0);
        totalPoints += points;
        
        this.saveToLocalStorage('userPoints', totalPoints);
        
        // Vis point-belønning
        if (window.Components && window.Components.showSuccess) {
            window.Components.showSuccess(`🎉 +${points} points! Total: ${totalPoints}`);
        }
        
        console.log(`🏆 Points awarded: +${points} (Total: ${totalPoints})`);
        
        return totalPoints;
    } catch (error) {
        console.error('❌ Failed to award points:', error);
        return 0;
    }
}

/**
 * Hent user level baseret på points
 */
getUserLevel() {
    const points = this.loadFromLocalStorage('userPoints', 0);
    
    const levels = [
        { name: 'Explorer', min: 0, color: '🌱' },
        { name: 'Adventurer', min: 100, color: '🌿' },
        { name: 'Navigator', min: 500, color: '🌳' },
        { name: 'Travel Master', min: 1000, color: '🌴' },
        { name: 'Legendary Explorer', min: 5000, color: '🏆' }
    ];
    
    let currentLevel = levels[0];
    let nextLevel = null;
    let progress = 0;
    
    for (let i = levels.length - 1; i >= 0; i--) {
        if (points >= levels[i].min) {
            currentLevel = levels[i];
            nextLevel = i < levels.length - 1 ? levels[i + 1] : null;
            break;
        }
    }
    
    if (nextLevel) {
        const prevPoints = currentLevel.min;
        const nextPoints = nextLevel.min;
        const currentProgress = (points - prevPoints) / (nextPoints - prevPoints);
        progress = Math.min(currentProgress * 100, 100);
    }
    
    return {
        ...currentLevel,
        points: points,
        nextLevel: nextLevel,
        progress: Math.round(progress),
        pointsToNext: nextLevel ? nextLevel.min - points : 0
    };
}

// =============================================================================
// 24. APP INITIALIZATION (EKSTERNE)
// =============================================================================

// App start tidspunkt til engagement tracking
window.travelAppStartTime = Date.now();

// Automatisk initialisering når DOM er klar
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🌟 DOM Content Loaded - Initializing TravelApp');
        
        // Tjek at dependencies er indlæst
        if (typeof translations === 'undefined') {
            console.error('❌ Translations not loaded! Make sure translations.js is loaded before script.js');
            document.body.innerHTML = generateErrorMessage('Missing translations file', 'Please include translations.js before script.js');
            return;
        }
        
        if (typeof Components === 'undefined') {
            console.error('❌ Components not loaded! Make sure components.js is loaded before script.js');
            document.body.innerHTML = generateErrorMessage('Missing components file', 'Please include components.js before script.js');
            return;
        }
        
        // Start app
        const travelApp = new TravelApp();
        
        // Make app global for debugging og udvikler værktøjer
        window.travelApp = travelApp;
        window.debugTravelApp = () => travelApp.debug();
        
        // Setup globale fejlhandlere
        travelApp.setupGlobalErrorHandlers();
        travelApp.setupBrowserHistory();
        travelApp.setupKeyboardShortcuts();
        
        // Setup performance monitoring kun i dev mode
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            travelApp.setupPerformanceMonitoring();
            
            // Dev console utilities
            window.testApp = () => {
                console.log('🧪 Testing app functionality...');
                travelApp.debug();
                return 'App test completed. Check console for details.';
            };
            
            window.simulateData = () => {
                console.log('🎲 Simulating city data...');
                const mockData = {
                    destination: 'Copenhagen',
                    startDate: new Date().toISOString().split('T')[0],
                    days: 7
                };
                
                travelApp.loadCityData(mockData)
                    .then(() => {
                        console.log('✅ Mock data loaded successfully');
                        window.Components.showSuccess('Mock data loaded! Try navigating to different screens.');
                    })
                    .catch(error => {
                        console.error('❌ Failed to load mock data:', error);
                        window.Components.showError('Failed to load mock data');
                    });
                    
                return 'Mock data simulation started...';
            };
        }
        
        // Track engagement - app start
        travelApp.trackUserEngagement('app_start', {
            theme: travelApp.currentTheme,
            language: travelApp.currentLanguage,
            userAgent: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`
        });
        
        // Award points for visiting
        travelApp.awardPoints('app_visit', 5);
        
        // Log successful initialization
        console.log('✅ TravelApp is ready! 🚀');
        console.log('🎯 Available tools: debugTravelApp() [debug], testApp() [test], simulateData() [dev]');
        
    } catch (error) {
        console.error('❌ FATAL: Failed to initialize TravelApp:', error);
        
        // Vis user-friendly fejlmeddelelse
        document.body.innerHTML = generateFatalErrorMessage(error.message);
    }
});

/**
 * Generer HTML fejlmeddelelse
 */
function generateErrorMessage(title, message) {
    return `
        <div style="
            text-align: center; 
            padding: 50px; 
            font-family: 'Inter', Arial, sans-serif; 
            background: var(--bg-primary); 
            color: var(--text-primary); 
            min-height: 100vh; 
            display: flex; 
            align-items: center; 
            justify-content: center;
        ">
            <div style="
                max-width: 600px; 
                padding: var(--spacing-2xl); 
                background: var(--bg-card); 
                border-radius: var(--radius-xl); 
                box-shadow: var(--shadow-xl);
                border: 1px solid var(--neon-primary);
            ">
                <h1 style="color: var(--neon-secondary); margin-bottom: var(--spacing-lg); font-size: var(--font-size-2xl);">
                    ⚠️ ${title}
                </h1>
                <p style="margin-bottom: var(--spacing-xl); line-height: var(--line-height-relaxed);">
                    ${message}
                </p>
                <button onclick="location.reload()" style="
                    background: var(--primary-gradient); 
                    color: var(--text-on-primary); 
                    border: none; 
                    padding: var(--spacing-md) var(--spacing-xl); 
                    border-radius: var(--radius-lg); 
                    cursor: pointer; 
                    font-weight: var(--font-bold); 
                    font-size: var(--font-size-base);
                    transition: all var(--transition-normal);
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Genindlæs side
                </button>
            </div>
        </div>
    `;
}

/**
 * Generer fatal fejlmeddelelse
 */
function generateFatalErrorMessage(message) {
    return `
        <div style="
            text-align: center; 
            padding: 50px; 
            font-family: 'Inter', Arial, sans-serif; 
            background: #0a0a0f; 
            color: white; 
            min-height: 100vh; 
            display: flex; 
            align-items: center; 
            justify-content: center;
        ">
            <div style="
                max-width: 600px; 
                padding: 40px; 
                background: rgba(255, 68, 68, 0.1); 
                border-radius: 16px; 
                border: 2px solid #ff4444;
            ">
                <h1 style="color: #ff4444; margin-bottom: 20px; font-size: 28px;">
                    🚨 App Initialization Failed
                </h1>
                <p style="margin-bottom: 30px; line-height: 1.6;">
                    Der opstod en kritisk fejl under start af appen.
                </p>
                <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; margin-bottom: 30px; text-align: left;">
                    <strong>Fejl detalejer:</strong><br>
                    <code style="color: #ff8888;">${message}</code>
                </div>
                <p style="margin-bottom: 20px; font-size: 14px; opacity: 0.8;">
                    Tjek browser konsollen for flere detaljer.
                </p>
                <button onclick="location.reload()" style="
                    background: #ff4444; 
                    color: white; 
                    border: none; 
                    padding: 15px 30px; 
                    border-radius: 8px; 
                    cursor: pointer; 
                    font-weight: bold; 
                    font-size: 16px;
                ">
                    Tryk at genindlæse
                </button>
            </div>
        </div>
    `;
}

// =============================================================================
// 25. EXPORTS (TIL MODULÆR BRUG)
// =============================================================================

// Eksport for moderne JavaScript moduler
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TravelApp,
        API_CONFIG,
        APP_SETTINGS
    };
}

// Global tilgængelighed for konsol debugging og udvikling
if (typeof window !== 'undefined') {
    window.TravelApp = TravelApp;
    window.travelAppConfig = {
        API_CONFIG,
        APP_SETTINGS
    };
}

console.log('📦 TravelApp script.js loaded successfully');

