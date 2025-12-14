// =============================================================================
// TRAVEL ASSISTANT APP - COMPLETE TRANSLATIONS SYSTEM
// =============================================================================

/* === TRANSLATION META DATA === */
/* Languages: Danish (da), German (de), English (en), Polish (pl), Lithuanian (lt) */
/* Total Keys: 150+ | Coverage: 100% | Format: JSON Compatible */
/* Last Updated: 2024 | Version: 2.0 */

// =============================================================================
// 1. GLOBAL TRANSLATIONS OBJECT & CONFIGURATION
// =============================================================================

const translations = {
    // =============================================================================
    // 2. DANISH TRANSLATIONS SECTION (PRIMARY LANGUAGE)
    // =============================================================================
    da: {
        // === APP GLOBAL ===
        appTitle: 'REJSE ASSISTENT',
        loading: 'Indlæser...',
        error: 'Der opstod en fejl',
        success: 'Handling fuldført',
        warning: 'Advarsel',
        info: 'Information',
        
        // === NAVIGATION ===
        back: 'TILBAGE',
        next: 'NÆSTE',
        continue: 'FORTSÆT',
        cancel: 'ANNULLER',
        save: 'GEM',
        delete: 'SLET',
        edit: 'REDIGER',
        close: 'LUK',
        home: 'HJEM',
        
        // === START SCREEN ===
        destination: 'Destination By',
        destinationPlaceholder: 'Indtast bynavn...',
        startDate: 'Start dato',
        startDatePlaceholder: 'Vælg dato',
        days: 'Antal dage',
        daysPlaceholder: 'Indtast antal dage',
        selectLanguage: 'Vælg sprog:',
        startTravel: 'START REJSE',
        welcome: 'Velkommen til Rejse Assistent',
        welcomeDescription: 'Planlæg din perfekte rejse med vores avancerede rejseværktøjer',
        
        // === LANGUAGE OPTIONS ===
        languageDanish: 'Dansk',
        languageGerman: 'Deutsch',
        languageEnglish: 'English',
        languagePolish: 'Polski',
        languageLithuanian: 'Lietuvių',
        
        // === MENU ITEMS ===
        restaurants: 'Restauranter',
        accommodation: 'Overnatning',
        sights: 'Seværdigheder',
        secrets: 'Hemmelige Steder',
        images: 'Billeder',
        transport: 'Transport',
        transportPlanner: 'Transport Planlægger',
        
        // === RESTAURANT SCREEN ===
        restaurantTitle: 'Restauranter',
        noRestaurants: 'Ingen restauranter fundet',
        restaurantLoading: 'Søger efter restauranter...',
        cuisine: 'Køkken',
        priceLevel: 'Prisniveau',
        rating: 'Bedømmelse',
        openingHours: 'Åbningstider',
        phoneNumber: 'Telefonnummer',
        website: 'Hjemmeside',
        address: 'Adresse',
        
        // === ACCOMMODATION SCREEN ===
        accommodationTitle: 'Overnatning',
        noAccommodations: 'Ingen overnatningssteder fundet',
        accommodationLoading: 'Søger efter overnatning...',
        hotel: 'Hotel',
        hostel: 'Hostel',
        guestHouse: 'Gæstehus',
        motel: 'Motel',
        amenities: 'Faciliteter',
        checkIn: 'Indtjekning',
        checkOut: 'Udtjekning',
        rooms: 'Værelser',
        
        // === SIGHTS SCREEN ===
        sightsTitle: 'Seværdigheder',
        noSights: 'Ingen seværdigheder fundet',
        sightsLoading: 'Søger efter seværdigheder...',
        attraction: 'Attraktion',
        museum: 'Museum',
        monument: 'Monument',
        park: 'Park',
        description: 'Beskrivelse',
        entranceFee: 'Entrépris',
        visitDuration: 'Besøgsvarighed',
        
        // === SECRETS SCREEN ===
        secretsTitle: 'Hemmelige Steder',
        noSecrets: 'Ingen hemmelige steder fundet',
        secretsLoading: 'Søger efter hemmelige steder...',
        viewpoint: 'Udsigtspunkt',
        garden: 'Have',
        fountain: 'Springvand',
        square: 'Plads',
        hiddenGem: 'Skjult perle',
        
        // === IMAGES SCREEN ===
        imagesTitle: 'Billeder',
        noImages: 'Ingen billeder fundet',
        imagesLoading: 'Indlæser billeder...',
        photoGallery: 'Fotogalleri',
        photographer: 'Fotograf',
        source: 'Kilde',
        
        // === TRANSPORT SCREEN ===
        from: 'Fra',
        to: 'Til',
        fromPlaceholder: 'Indtart startpunkt',
        toPlaceholder: 'Indtast destination',
        departureDate: 'Afrejse dato',
        departureTime: 'Afrejse tid',
        departureDatePlaceholder: 'Vælg afrejsedato',
        departureTimePlaceholder: 'Vælg afrejsetid',
        planRoute: 'PLANLÆG RUTE',
        distance: 'Afstand',
        duration: 'Varighed',
        arrivalTime: 'Ankomsttid',
        transportMode: 'Transportform',
        
        // === TRANSPORT MODES ===
        car: 'Bil',
        train: 'Tog',
        bus: 'Bus',
        bicycle: 'Cykel',
        walking: 'Gående',
        
        // === SEARCH & FILTER ===
        search: 'Søg',
        searchPlaceholder: 'Søg efter...',
        filter: 'Filter',
        sortBy: 'Sorter efter',
        sortByDistance: 'Afstand',
        sortByRating: 'Bedømmelse',
        sortByPrice: 'Pris',
        clearFilter: 'Ryd filter',
        
        // === RESULTS & DATA ===
        results: 'Resultater',
        noResults: 'Ingen resultater fundet',
        showingResults: 'Viser resultater',
        of: 'af',
        totalResults: 'Samlet antal resultater',
        
        // === FORM VALIDATION ===
        errors: 'Fejl:',
        isRequired: ' er påkrævet',
        invalidEmail: 'Ugyldig e-mail adresse',
        invalidPhone: 'Ugyldigt telefonnummer',
        invalidDate: 'Ugyldig dato',
        minLength: 'Minimum antal tegn:',
        maxLength: 'Maksimum antal tegn:',
        
        // === SPECIFIC VALIDATION MESSAGES ===
        cityNotFound: 'Kunne ikke finde byen. Prøv venligst igen.',
        destinationRequired: 'Destination er påkrævet',
        dateRequired: 'Dato er påkrævet',
        daysRequired: 'Antal dage er påkrævet',
        fromRequired: 'Startpunkt er påkrævet',
        toRequired: 'Destination er påkrævet',
        timeRequired: 'Tid er påkrævet',
        
        // === API MESSAGES ===
        apiError: 'API fejl opstod',
        networkError: 'Netværksfejl, tjek din forbindelse',
        serverError: 'Serverfejl, prøv igen senere',
        timeoutError: 'Forbindelse timed out',
        
        // === WEATHER ===
        weather: 'Vejr',
        temperature: 'Temperatur',
        forecast: 'Vejrudsigt',
        sunny: 'Solskin',
        cloudy: 'Skyet',
        rainy: 'Regnfuldt',
        snowy: 'Sne',
        windy: 'Blæsende',
        
        // === EXTERNAL LINKS ===
        openInMaps: 'Åbn i Google Maps',
        callRestaurant: 'Ring restaurant',
        visitWebsite: 'Besøg hjemmeside',
        getDirections: 'Fem vejvisning',
        share: 'Del',
        bookmark: 'Gem bogmærke',
        
        // === USER FEEDBACK ===
        thankYou: 'Mange tak!',
        reviewAdded: 'Bedømmelse tilføjet',
        savedToFavorites: 'Gemt i favoritter',
        removedFromFavorites: 'Fjernet fra favoritter',
        
        // === PRIVACY & LEGAL ===
        privacy: 'Privatlivspolitik',
        terms: 'Betingelser',
        about: 'Om',
        contact: 'Kontakt',
        
        // === ACCESSIBILITY ===
        skipToContent: 'Gå til indhold',
        menuToggle: 'Menu toggle',
        closeMenu: 'Luk menu',
        openMenu: 'Åbn menu',
        
        // === TIME & DATE FORMATS ===
        today: 'I dag',
        tomorrow: 'I morgen',
        yesterday: 'I går',
        minutes: 'minutter',
        hours: 'timer',
        days: 'dage',
        week: 'uge',
        month: 'måned',
        year: 'år',
        
        // === COMMON PHRASES ===
        yes: 'Ja',
        no: 'Nej',
        ok: 'OK',
        thankYou: 'Tak',
        please: 'Venligst',
        welcome: 'Velkommen',
        goodbye: 'Farvel',
        
        // === LOCATIONS ===
        currentLocation: 'Nuværende lokation',
        useCurrentLocation: 'Brug nuværende lokation',
        nearMe: 'Nær mig',
        
        // === RATINGS ===
        starRating: 'Stjerne bedømmelse',
        excellent: 'Fremragende',
        good: 'God',
        average: 'Gennemsnit',
        poor: 'Dårlig',
        
        // === PRICES ===
        free: 'Gratis',
        paid: 'Betalt',
        priceRange: 'Prisklasse',
        currencyDKK: 'DKK',
        currencyEUR: 'EUR',
        currencyUSD: 'USD',
        
        // === MOBILE SPECIFIC ===
        swipeLeft: 'Swipe venstre',
        swipeRight: 'Swipe højre',
        tapToSelect: 'Tryk for at vælge',
        longPress: 'Langt tryk',
        pullToRefresh: 'Træk for at opdatere'
    },
    
    // =============================================================================
    // 3. GERMAN TRANSLATIONS SECTION (DEUTSCH)
    // =============================================================================
    de: {
        // === APP GLOBAL ===
        appTitle: 'REISE-ASSISTENT',
        loading: 'Laden...',
        error: 'Ein Fehler ist aufgetreten',
        success: 'Vorgang abgeschlossen',
        warning: 'Warnung',
        info: 'Information',
        
        // === NAVIGATION ===
        back: 'ZURÜCK',
        next: 'WEITER',
        continue: 'FORTSETZEN',
        cancel: 'ABBRECHEN',
        save: 'SPEICHERN',
        delete: 'LÖSCHEN',
        edit: 'BEARBEITEN',
        close: 'SCHLIESSEN',
        home: 'STARTSEITE',
        
        // === START SCREEN ===
        destination: 'Zielstadt',
        destinationPlaceholder: 'Stadtname eingeben...',
        startDate: 'Startdatum',
        startDatePlaceholder: 'Datum wählen',
        days: 'Anzahl Tage',
        daysPlaceholder: 'Tage eingeben',
        selectLanguage: 'Sprache auswählen:',
        startTravel: 'REISE STARTEN',
        welcome: 'Willkommen beim Reise-Assistenten',
        welcomeDescription: 'Planen Sie Ihre perfekte Reise mit unseren erweiterten Reise-Tools',
        
        // === LANGUAGE OPTIONS ===
        languageDanish: 'Dänisch',
        languageGerman: 'Deutsch',
        languageEnglish: 'English',
        languagePolish: 'Polski',
        languageLithuanian: 'Lietuvių',
        
        // === MENU ITEMS ===
        restaurants: 'Restaurants',
        accommodation: 'Unterkunft',
        sights: 'Sehenswürdigkeiten',
        secrets: 'Geheime Orte',
        images: 'Bilder',
        transport: 'Transport',
        transportPlanner: 'Transport Planer',
        
        // === RESTAURANT SCREEN ===
        restaurantTitle: 'Restaurants',
        noRestaurants: 'Keine Restaurants gefunden',
        restaurantLoading: 'Suche nach Restaurants...',
        cuisine: 'Küche',
        priceLevel: 'Preisniveau',
        rating: 'Bewertung',
        openingHours: 'Öffnungszeiten',
        phoneNumber: 'Telefonnummer',
        website: 'Webseite',
        address: 'Adresse',
        
        // === ACCOMMODATION SCREEN ===
        accommodationTitle: 'Unterkunft',
        noAccommodations: 'Keine Unterkünfte gefunden',
        accommodationLoading: 'Suche nach Unterkünften...',
        hotel: 'Hotel',
        hostel: 'Hostel',
        guestHouse: 'Gästehaus',
        motel: 'Motel',
        amenities: 'Ausstattung',
        checkIn: 'Anreise',
        checkOut: 'Abreise',
        rooms: 'Zimmer',
        
        // === SIGHTS SCREEN ===
        sightsTitle: 'Sehenswürdigkeiten',
        noSights: 'Keine Sehenswürdigkeiten gefunden',
        sightsLoading: 'Suche nach Sehenswürdigkeiten...',
        attraction: 'Attraktion',
        museum: 'Museum',
        monument: 'Denkmal',
        park: 'Park',
        description: 'Beschreibung',
        entranceFee: 'Eintrittspreis',
        visitDuration: 'Besuchsdauer',
        
        // === SECRETS SCREEN ===
        secretsTitle: 'Geheime Orte',
        noSecrets: 'Keine geheimen Orte gefunden',
        secretsLoading: 'Suche nach geheimen Orten...',
        viewpoint: 'Aussichtspunkt',
        garden: 'Garten',
        fountain: 'Brunnen',
        square: 'Platz',
        hiddenGem: 'Verstecktes Juwel',
        
        // === IMAGES SCREEN ===
        imagesTitle: 'Bilder',
        noImages: 'Keine Bilder gefunden',
        imagesLoading: 'Lade Bilder...',
        photoGallery: 'Fotogalerie',
        photographer: 'Fotograf',
        source: 'Quelle',
        
        // === TRANSPORT SCREEN ===
        from: 'Von',
        to: 'Nach',
        fromPlaceholder: 'Startpunkt eingeben',
        toPlaceholder: 'Ziel eingeben',
        departureDate: 'Abreisedatum',
        departureTime: 'Abfahrtszeit',
        departureDatePlaceholder: 'Datum wählen',
        departureTimePlaceholder: 'Zeit wählen',
        planRoute: 'ROUTE PLANEN',
        distance: 'Entfernung',
        duration: 'Dauer',
        arrivalTime: 'Ankunftszeit',
        transportMode: 'Transportmittel',
        
        // === TRANSPORT MODES ===
        car: 'Auto',
        train: 'Zug',
        bus: 'Bus',
        bicycle: 'Fahrrad',
        walking: 'Zu Fuß',
        
        // === SEARCH & FILTER ===
        search: 'Suchen',
        searchPlaceholder: 'Suchen nach...',
        filter: 'Filter',
        sortBy: 'Sortieren nach',
        sortByDistance: 'Entfernung',
        sortByRating: 'Bewertung',
        sortByPrice: 'Preis',
        clearFilter: 'Filter löschen',
        
        // === RESULTS & DATA ===
        results: 'Ergebnisse',
        noResults: 'Keine Ergebnisse gefunden',
        showingResults: 'Ergebnisse anzeigen',
        of: 'von',
        totalResults: 'Gesamte Ergebnisse',
        
        // === FORM VALIDATION ===
        errors: 'Fehler:',
        isRequired: ' ist erforderlich',
        invalidEmail: 'Ungültige E-Mail-Adresse',
        invalidPhone: 'Ungültige Telefonnummer',
        invalidDate: 'Ungültiges Datum',
        minLength: 'Mindestens Zeichen:',
        maxLength: 'Höchstens Zeichen:',
        
        // === SPECIFIC VALIDATION MESSAGES ===
        cityNotFound: 'Stadt nicht gefunden. Bitte versuchen Sie es erneut.',
        destinationRequired: 'Ziel ist erforderlich',
        dateRequired: 'Datum ist erforderlich',
        daysRequired: 'Anzahl Tage ist erforderlich',
        fromRequired: 'Startpunkt ist erforderlich',
        toRequired: 'Ziel ist erforderlich',
        timeRequired: 'Zeit ist erforderlich',
        
        // === API MESSAGES ===
        apiError: 'API-Fehler aufgetreten',
        networkError: 'Netzwerkfehler, überprüfen Sie Ihre Verbindung',
        serverError: 'Serverfehler, versuchen Sie es später erneut',
        timeoutError: 'Verbindungstimeout',
        
        // === WEATHER ===
        weather: 'Wetter',
        temperature: 'Temperatur',
        forecast: 'Wettervorhersage',
        sunny: 'Sonnig',
        cloudy: 'Bewölkt',
        rainy: 'Regnerisch',
        snowy: 'Schnee',
        windy: 'Windig',
        
        // === EXTERNAL LINKS ===
        openInMaps: 'In Google Maps öffnen',
        callRestaurant: 'Restaurant anrufen',
        visitWebsite: 'Webseite besuchen',
        getDirections: 'Wegbeschreibung erhalten',
        share: 'Teilen',
        bookmark: 'Lesezeichen speichern',
        
        // === USER FEEDBACK ===
        thankYou: 'Vielen Dank!',
        reviewAdded: 'Bewertung hinzugefügt',
        savedToFavorites: 'Zu Favoriten gespeichert',
        removedFromFavorites: 'Von Favoriten entfernt',
        
        // === PRIVACY & LEGAL ===
        privacy: 'Datenschutz',
        terms: 'Bedingungen',
        about: 'Über',
        contact: 'Kontakt',
        
        // === ACCESSIBILITY ===
        skipToContent: 'Zum Inhalt springen',
        menuToggle: 'Menü umschalten',
        closeMenu: 'Menü schließen',
        openMenu: 'Menü öffnen',
        
        // === TIME & DATE FORMATS ===
        today: 'Heute',
        tomorrow: 'Morgen',
        yesterday: 'Gestern',
        minutes: 'Minuten',
        hours: 'Stunden',
        days: 'Tage',
        week: 'Woche',
        month: 'Monat',
        year: 'Jahr',
        
        // === COMMON PHRASES ===
        yes: 'Ja',
        no: 'Nein',
        ok: 'OK',
        thankYou: 'Danke',
        please: 'Bitte',
        welcome: 'Willkommen',
        goodbye: 'Auf Wiedersehen',
        
        // === LOCATIONS ===
        currentLocation: 'Aktueller Standort',
        useCurrentLocation: 'Aktuellen Standort verwenden',
        nearMe: 'In der Nähe',
        
        // === RATINGS ===
        starRating: 'Sternebewertung',
        excellent: 'Ausgezeichnet',
        good: 'Gut',
        average: 'Durchschnitt',
        poor: 'Schlecht',
        
        // === PRICES ===
        free: 'Kostenlos',
        paid: 'Kostenpflichtig',
        priceRange: 'Preisklasse',
        currencyDKK: 'DKK',
        currencyEUR: 'EUR',
        currencyUSD: 'USD',
        
        // === MOBILE SPECIFIC ===
        swipeLeft: 'Nach links wischen',
        swipeRight: 'Nach rechts wischen',
        tapToSelect: 'Tippen zum Auswählen',
        longPress: 'Lang drücken',
        pullToRefresh: 'Zum Aktualisieren ziehen'
    },
    
    // =============================================================================
    // 4. ENGLISH TRANSLATIONS SECTION (ENGLISH)
    // =============================================================================
    en: {
        // === APP GLOBAL ===
        appTitle: 'TRAVEL ASSISTANT',
        loading: 'Loading...',
        error: 'An error occurred',
        success: 'Action completed',
        warning: 'Warning',
        info: 'Information',
        
        // === NAVIGATION ===
        back: 'BACK',
        next: 'NEXT',
        continue: 'CONTINUE',
        cancel: 'CANCEL',
        save: 'SAVE',
        delete: 'DELETE',
        edit: 'EDIT',
        close: 'CLOSE',
        home: 'HOME',
        
        // === START SCREEN ===
        destination: 'Destination City',
        destinationPlaceholder: 'Enter city name...',
        startDate: 'Start Date',
        startDatePlaceholder: 'Choose date',
        days: 'Number of Days',
        daysPlaceholder: 'Enter number of days',
        selectLanguage: 'Select Language:',
        startTravel: 'START TRAVEL',
        welcome: 'Welcome to Travel Assistant',
        welcomeDescription: 'Plan your perfect trip with our advanced travel tools',
        
        // === LANGUAGE OPTIONS ===
        languageDanish: 'Dansk',
        languageGerman: 'Deutsch',
        languageEnglish: 'English',
        languagePolish: 'Polski',
        languageLithuanian: 'Lietuvių',
        
        // === MENU ITEMS ===
        restaurants: 'Restaurants',
        accommodation: 'Accommodation',
        sights: 'Sights',
        secrets: 'Secret Places',
        images: 'Images',
        transport: 'Transport',
        transportPlanner: 'Transport Planner',
        
        // === RESTAURANT SCREEN ===
        restaurantTitle: 'Restaurants',
        noRestaurants: 'No restaurants found',
        restaurantLoading: 'Searching for restaurants...',
        cuisine: 'Cuisine',
        priceLevel: 'Price Level',
        rating: 'Rating',
        openingHours: 'Opening Hours',
        phoneNumber: 'Phone Number',
        website: 'Website',
        address: 'Address',
        
        // === ACCOMMODATION SCREEN ===
        accommodationTitle: 'Accommodation',
        noAccommodations: 'No accommodations found',
        accommodationLoading: 'Searching for accommodation...',
        hotel: 'Hotel',
        hostel: 'Hostel',
        guestHouse: 'Guest House',
        motel: 'Motel',
        amenities: 'Amenities',
        checkIn: 'Check In',
        checkOut: 'Check Out',
        rooms: 'Rooms',
        
        // === SIGHTS SCREEN ===
        sightsTitle: 'Sights',
        noSights: 'No sights found',
        sightsLoading: 'Searching for sights...',
        attraction: 'Attraction',
        museum: 'Museum',
        monument: 'Monument',
        park: 'Park',
        description: 'Description',
        entranceFee: 'Entrance Fee',
        visitDuration: 'Visit Duration',
        
        // === SECRETS SCREEN ===
        secretsTitle: 'Secret Places',
        noSecrets: 'No secret places found',
        secretsLoading: 'Searching for secret places...',
        viewpoint: 'Viewpoint',
        garden: 'Garden',
        fountain: 'Fountain',
        square: 'Square',
        hiddenGem: 'Hidden Gem',
        
        // === IMAGES SCREEN ===
        imagesTitle: 'Images',
        noImages: 'No images found',
        imagesLoading: 'Loading images...',
        photoGallery: 'Photo Gallery',
        photographer: 'Photographer',
        source: 'Source',
        
        // === TRANSPORT SCREEN ===
        from: 'From',
        to: 'To',
        fromPlaceholder: 'Enter starting point',
        toPlaceholder: 'Enter destination',
        departureDate: 'Departure Date',
        departureTime: 'Departure Time',
        departureDatePlaceholder: 'Choose departure date',
        departureTimePlaceholder: 'Choose departure time',
        planRoute: 'PLAN ROUTE',
        distance: 'Distance',
        duration: 'Duration',
        arrivalTime: 'Arrival Time',
        transportMode: 'Transport Mode',
        
        // === TRANSPORT MODES ===
        car: 'Car',
        train: 'Train',
        bus: 'Bus',
        bicycle: 'Bicycle',
        walking: 'Walking',
        
        // === SEARCH & FILTER ===
        search: 'Search',
        searchPlaceholder: 'Search for...',
        filter: 'Filter',
        sortBy: 'Sort By',
        sortByDistance: 'Distance',
        sortByRating: 'Rating',
        sortByPrice: 'Price',
        clearFilter: 'Clear Filter',
        
        // === RESULTS & DATA ===
        results: 'Results',
        noResults: 'No results found',
        showingResults: 'Showing results',
        of: 'of',
        totalResults: 'Total Results',
        
        // === FORM VALIDATION ===
        errors: 'Errors:',
        isRequired: ' is required',
        invalidEmail: 'Invalid email address',
        invalidPhone: 'Invalid phone number',
        invalidDate: 'Invalid date',
        minLength: 'Minimum characters:',
        maxLength: 'Maximum characters:',
        
        // === SPECIFIC VALIDATION MESSAGES ===
        cityNotFound: 'City not found. Please try again.',
        destinationRequired: 'Destination is required',
        dateRequired: 'Date is required',
        daysRequired: 'Number of days is required',
        fromRequired: 'Starting point is required',
        toRequired: 'Destination is required',
        timeRequired: 'Time is required',
        
        // === API MESSAGES ===
        apiError: 'API error occurred',
        networkError: 'Network error, check your connection',
        serverError: 'Server error, please try again later',
        timeoutError: 'Connection timeout',
        
        // === WEATHER ===
        weather: 'Weather',
        temperature: 'Temperature',
        forecast: 'Weather Forecast',
        sunny: 'Sunny',
        cloudy: 'Cloudy',
        rainy: 'Rainy',
        snowy: 'Snowy',
        windy: 'Windy',
        
        // === EXTERNAL LINKS ===
        openInMaps: 'Open in Google Maps',
        callRestaurant: 'Call restaurant',
        visitWebsite: 'Visit website',
        getDirections: 'Get directions',
        share: 'Share',
        bookmark: 'Save bookmark',
        
        // === USER FEEDBACK ===
        thankYou: 'Thank you!',
        reviewAdded: 'Review added',
        savedToFavorites: 'Saved to favorites',
        removedFromFavorites: 'Removed from favorites',
        
        // === PRIVACY & LEGAL ===
        privacy: 'Privacy Policy',
        terms: 'Terms',
        about: 'About',
        contact: 'Contact',
        
        // === ACCESSIBILITY ===
        skipToContent: 'Skip to content',
        menuToggle: 'Menu toggle',
        closeMenu: 'Close menu',
        openMenu: 'Open menu',
        
        // === TIME & DATE FORMATS ===
        today: 'Today',
        tomorrow: 'Tomorrow',
        yesterday: 'Yesterday',
        minutes: 'minutes',
        hours: 'hours',
        days: 'days',
        week: 'week',
        month: 'month',
        year: 'year',
        
        // === COMMON PHRASES ===
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        thankYou: 'Thank you',
        please: 'Please',
        welcome: 'Welcome',
        goodbye: 'Goodbye',
        
        // === LOCATIONS ===
        currentLocation: 'Current Location',
        useCurrentLocation: 'Use current location',
        nearMe: 'Near Me',
        
        // === RATINGS ===
        starRating: 'Star Rating',
        excellent: 'Excellent',
        good: 'Good',
        average: 'Average',
        poor: 'Poor',
        
        // === PRICES ===
        free: 'Free',
        paid: 'Paid',
        priceRange: 'Price Range',
        currencyDKK: 'DKK',
        currencyEUR: 'EUR',
        currencyUSD: 'USD',
        
        // === MOBILE SPECIFIC ===
        swipeLeft: 'Swipe left',
        swipeRight: 'Swipe right',
        tapToSelect: 'Tap to select',
        longPress: 'Long press',
        pullToRefresh: 'Pull to refresh'
    },
    
    // =============================================================================
    // 5. POLISH TRANSLATIONS SECTION (POLSKI)
    // =============================================================================
    pl: {
        // === APP GLOBAL ===
        appTitle: 'ASYSTENT PODRÓŻY',
        loading: 'Ładowanie...',
        error: 'Wystąpił błąd',
        success: 'Akcja zakończona',
        warning: 'Ostrzeżenie',
        info: 'Informacja',
        
        // === NAVIGATION ===
        back: 'WRÓĆ',
        next: 'DALEJ',
        continue: 'KONTYNUUJ',
        cancel: 'ANULUJ',
        save: 'ZAPISZ',
        delete: 'USUŃ',
        edit: 'EDYTUJ',
        close: 'ZAMKNIJ',
        home: 'STRONA GŁÓWNA',
        
        // === START SCREEN ===
        destination: 'Miasto docelowe',
        destinationPlaceholder: 'Wprowadź nazwę miasta...',
        startDate: 'Data rozpoczęcia',
        startDatePlaceholder: 'Wybierz datę',
        days: 'Liczba dni',
        daysPlaceholder: 'Wprowadź liczbę dni',
        selectLanguage: 'Wybierz język:',
        startTravel: 'ROZPOCZNIJ PODRÓŻ',
        welcome: 'Witaj w Asystencie Podróży',
        welcomeDescription: 'Zaplanuj swoją idealną podróż za pomocą naszych zaawansowanych narzędzi',
        
        // === LANGUAGE OPTIONS ===
        languageDanish: 'Dansk',
        languageGerman: 'Deutsch',
        languageEnglish: 'English',
        languagePolish: 'Polski',
        languageLithuanian: 'Lietuvių',
        
        // === MENU ITEMS ===
        restaurants: 'Restauracje',
        accommodation: 'Noclegi',
        sights: 'Atrakcje',
        secrets: 'Tajne miejsca',
        images: 'Zdjęcia',
        transport: 'Transport',
        transportPlanner: 'Planer transportu',
        
        // === RESTAURANT SCREEN ===
        restaurantTitle: 'Restauracje',
        noRestaurants: 'Nie znaleziono restauracji',
        restaurantLoading: 'Wyszukiwanie restauracji...',
        cuisine: 'Kuchnia',
        priceLevel: 'Poziom cen',
        rating: 'Ocena',
        openingHours: 'Godziny otwarcia',
        phoneNumber: 'Numer telefonu',
        website: 'Strona internetowa',
        address: 'Adres',
        
        // === ACCOMMODATION SCREEN ===
        accommodationTitle: 'Noclegi',
        noAccommodations: 'Nie znaleziono noclegów',
        accommodationLoading: 'Wyszukiwanie noclegów...',
        hotel: 'Hotel',
        hostel: 'Hostel',
        guestHouse: 'Dom gościnny',
        motel: 'Motel',
        amenities: 'Udogodnienia',
        checkIn: 'Zameldowanie',
        checkOut: 'Wymeldowanie',
        rooms: 'Pokoje',
        
        // === SIGHTS SCREEN ===
        sightsTitle: 'Atrakcje',
        noSights: 'Nie znaleziono atrakcji',
        sightsLoading: 'Wyszukiwanie atrakcji...',
        attraction: 'Atrakcja',
        museum: 'Muzeum',
        monument: 'Pomnik',
        park: 'Park',
        description: 'Opis',
        entranceFee: 'Opłata wstępu',
        visitDuration: 'Czas wizyty',
        
        // === SECRETS SCREEN ===
        secretsTitle: 'Tajne miejsca',
        noSecrets: 'Nie znaleziono tajnych miejsc',
        secretsLoading: 'Wyszukiwanie tajnych miejsc...',
        viewpoint: 'Punkt widokowy',
        garden: 'Ogród',
        fountain: 'Fontanna',
        square: 'Plac',
        hiddenGem: 'Ukryta perła',
        
        // === IMAGES SCREEN ===
        imagesTitle: 'Zdjęcia',
        noImages: 'Nie znaleziono zdjęć',
        imagesLoading: 'Ładowanie zdjęć...',
        photoGallery: 'Galeria zdjęć',
        photographer: 'Fotograf',
        source: 'Źródło',
        
        // === TRANSPORT SCREEN ===
        from: 'Z',
        to: 'Do',
        fromPlaceholder: 'Wprowadź punkt początkowy',
        toPlaceholder: 'Wprowadź cel',
        departureDate: 'Data wyjazdu',
        departureTime: 'Godzina wyjazdu',
        departureDatePlaceholder: 'Wybierz datę wyjazdu',
        departureTimePlaceholder: 'Wybierz godzinę wyjazdu',
        planRoute: 'ZAPLANUJ TRASĘ',
        distance: 'Odległość',
        duration: 'Czas trwania',
        arrivalTime: 'Godzina przyjazdu',
        transportMode: 'Środek transportu',
        
        // === TRANSPORT MODES ===
        car: 'Samochód',
        train: 'Pociąg',
        bus: 'Autobus',
        bicycle: 'Rower',
        walking: 'Pieszo',
        
        // === SEARCH & FILTER ===
        search: 'Szukaj',
        searchPlaceholder: 'Szukaj...',
        filter: 'Filtr',
        sortBy: 'Sortuj wg',
        sortByDistance: 'Odległości',
        sortByRating: 'Oceny',
        sortByPrice: 'Ceny',
        clearFilter: 'Wyczyść filtr',
        
        // === RESULTS & DATA ===
        results: 'Wyniki',
        noResults: 'Brak wyników',
        showingResults: 'Wyświetlanie wyników',
        of: 'z',
        totalResults: 'Łączna liczba wyników',
        
        // === FORM VALIDATION ===
        errors: 'Błędy:',
        isRequired: ' jest wymagane',
        invalidEmail: 'Nieprawidłowy adres e-mail',
        invalidPhone: 'Nieprawidłowy numer telefonu',
        invalidDate: 'Nieprawidłowa data',
        minLength: 'Minimalna liczba znaków:',
        maxLength: 'Maksymalna liczba znaków:',
        
        // === SPECIFIC VALIDATION MESSAGES ===
        cityNotFound: 'Nie znaleziono miasta. Spróbuj ponownie.',
        destinationRequired: 'Cel jest wymagany',
        dateRequired: 'Data jest wymagana',
        daysRequired: 'Liczba dni jest wymagana',
        fromRequired: 'Punkt początkowy jest wymagany',
        toRequired: 'Cel jest wymagany',
        timeRequired: 'Czas jest wymagany',
        
        // === API MESSAGES ===
        apiError: 'Wystąpił błąd API',
        networkError: 'Błąd sieci, sprawdź połączenie',
        serverError: 'Błąd serwera, spróbuj ponownie później',
        timeoutError: 'Przekroczenie czasu połączenia',
        
        // === WEATHER ===
        weather: 'Pogoda',
        temperature: 'Temperatura',
        forecast: 'Prognoza pogody',
        sunny: 'Słonecznie',
        cloudy: 'Pochmurno',
        rainy: 'Deszczowo',
        snowy: 'śnieży',
        windy: 'Wietrznie',
        
        // === EXTERNAL LINKS ===
        openInMaps: 'Otwórz w Google Maps',
        callRestaurant: 'Zadzwoń do restauracji',
        visitWebsite: 'Odwiedź stronę',
        getDirections: 'Wskaż directions',
        share: 'Udostępnij',
        bookmark: 'Zapisz zakładkę',
        
        // === USER FEEDBACK ===
        thankYou: 'Dziękujemy!',
        reviewAdded: 'Recenzja dodana',
        savedToFavorites: 'Zapisano w ulubionych',
        removedFromFavorites: 'Usunięto z ulubionych',
        
        // === PRIVACY & LEGAL ===
        privacy: 'Polityka prywatności',
        terms: 'Warunki',
        about: 'O nas',
        contact: 'Kontakt',
        
        // === ACCESSIBILITY ===
        skipToContent: 'Przejdź do treści',
        menuToggle: 'Przełącznik menu',
        closeMenu: 'Zamknij menu',
        openMenu: 'Otwórz menu',
        
        // === TIME & DATE FORMATS ===
        today: 'Dziś',
        tomorrow: 'Jutro',
        yesterday: 'Wczoraj',
        minutes: 'minut',
        hours: 'godzin',
        days: 'dni',
        week: 'tydzień',
        month: 'miesiąc',
        year: 'rok',
        
        // === COMMON PHRASES ===
        yes: 'Tak',
        no: 'Nie',
        ok: 'OK',
        thankYou: 'Dziękuję',
        please: 'Proszę',
        welcome: 'Witaj',
        goodbye: 'Żegnaj',
        
        // === LOCATIONS ===
        currentLocation: 'Aktualna lokalizacja',
        useCurrentLocation: 'Użyj aktualnej lokalizacji',
        nearMe: 'Blisko mnie',
        
        // === RATINGS ===
        starRating: 'Ocena gwiazdkowa',
        excellent: 'Doskonałe',
        good: 'Dobre',
        average: 'Średnie',
        poor: 'Słabe',
        
        // === PRICES ===
        free: 'Bezpłatnie',
        paid: 'Płatne',
        priceRange: 'Przedział cenowy',
        currencyDKK: 'DKK',
        currencyEUR: 'EUR',
        currencyUSD: 'USD',
        
        // === MOBILE SPECIFIC ===
        swipeLeft: 'Przesuń w lewo',
        swipeRight: 'Przesuń w prawo',
        tapToSelect: 'Dotknij aby wybrać',
        longPress: 'Długie naciśnięcie',
        pullToRefresh: 'Przeciągnij aby odświeżyć'
    },
    
    // =============================================================================
    // 6. LITHUANIAN TRANSLATIONS SECTION (LIETUVIŲ)
    // =============================================================================
    lt: {
        // === APP GLOBAL ===
        appTitle: 'KELIONIŲ ASISTENTAS',
        loading: 'Kraunama...',
        error: 'Įvyko klaida',
        success: 'Veiksmas baigtas',
        warning: 'Įspėjimas',
        info: 'Informacija',
        
        // === NAVIGATION ===
        back: 'ATGAL',
        next: 'KITAS',
        continue: 'TĘSTI',
        cancel: 'ATŠAUKTI',
        save: 'IŠSAUGOTI',
        delete: 'IŠTRINTI',
        edit: 'REDAGUOTI',
        close: 'UŽDARYTI',
        home: 'PRADŽIA',
        
        // === START SCREEN ===
        destination: 'Kelionės miestas',
        destinationPlaceholder: 'Įveskite miesto pavadinimą...',
        startDate: 'Pradžios data',
        startDatePlaceholder: 'Pasirinkite datą',
        days: 'Dienų skaičius',
        daysPlaceholder: 'Įveskite dienų skaičių',
        selectLanguage: 'Pasirinkite kalbą:',
        startTravel: 'PRADĖTI KELIONĘ',
        welcome: 'Sveiki atvykę į kelionių asistentą',
        welcomeDescription: 'Suplanuokite tobulą kelionę su mūsų pažangiais kelionių įrankiais',
        
        // === LANGUAGE OPTIONS ===
        languageDanish: 'Dansk',
        languageGerman: 'Deutsch',
        languageEnglish: 'English',
        languagePolish: 'Polski',
        languageLithuanian: 'Lietuvių',
        
        // === MENU ITEMS ===
        restaurants: 'Restoranai',
        accommodation: 'Apgyvendinimas',
        sights: 'Lankytinos vietos',
        secrets: 'Slaptos vietos',
        images: 'Nuotraukos',
        transport: 'Transportas',
        transportPlanner: 'Transporto planuotojas',
        
        // === RESTAURANT SCREEN ===
        restaurantTitle: 'Restoranai',
        noRestaurants: 'Restoranų nerasta',
        restaurantLoading: 'Ieškoma restoranų...',
        cuisine: 'Virtuvė',
        priceLevel: 'Kainos lygis',
        rating: 'Įvertinimas',
        openingHours: 'Darbo laikas',
        phoneNumber: 'Telefon numeris',
        website: 'Svetainė',
        address: 'Adresas',
        
        // === ACCOMMODATION SCREEN ===
        accommodationTitle: 'Apgyvendinimas',
        noAccommodations: 'Apgyvendinimo vietų nerasta',
        accommodationLoading: 'Ieškoma apgyvendinimo vietų...',
        hotel: 'Viešbutis',
        hostel: 'Hostelis',
        guestHouse: 'Svečių namai',
        motel: 'Motelis',
        amenities: 'Patogumai',
        checkIn: 'Registracija',
        checkOut: 'Išvykimas',
        rooms: 'Kambariai',
        
        // === SIGHTS SCREEN ===
        sightsTitle: 'Lankytinos vietos',
        noSights: 'Lankytinų vietų nerasta',
        sightsLoading: 'Ieškoma lankytinų vietų...',
        attraction: 'Attrakcija',
        museum: 'Muziejus',
        monument: 'Paminklas',
        park: 'Parkas',
        description: 'Aprašymas',
        entranceFee: 'Įėjimo mokestis',
        visitDuration: 'Aplankymo trukmė',
        
        // === SECRETS SCREEN ===
        secretsTitle: 'Slaptos vietos',
        noSecrets: 'Slaptų vietų nerasta',
        secretsLoading: 'Ieškoma slaptų vietų...',
        viewpoint: 'Vaizdo taškas',
        garden: 'Sodas',
        fountain: 'Fontanas',
        square: 'Aikštė',
        hiddenGem: 'Paslėptas brangakmenis',
        
        // === IMAGES SCREEN ===
        imagesTitle: 'Nuotraukos',
        noImages: 'Nuotraukų nerasta',
        imagesLoading: 'Kraunamos nuotraukos...',
        photoGallery: 'Nuotraukų galerija',
        photographer: 'Fotografas',
        source: 'Šaltinis',
        
        // === TRANSPORT SCREEN ===
        from: 'Iš',
        to: 'Į',
        fromPlaceholder: 'Įveskite pradžios tašką',
        toPlaceholder: 'Įveskite vietą',
        departureDate: 'Išvykimo data',
        departureTime: 'Išvykimo laikas',
        departureDatePlaceholder: 'Pasirinkite išvykimo datą',
        departureTimePlaceholder: 'Pasirinkite išvykimo laiką',
        planRoute: 'PLANUOTI KELIONĘ',
        distance: 'Atstumas',
        duration: 'Trukmė',
        arrivalTime: 'Atvykimo laikas',
        transportMode: 'Transporto būdas',
        
        // === TRANSPORT MODES ===
        car: 'Automobilis',
        train: 'Traukinys',
        bus: 'Autobusas',
        bicycle: 'Dviračias',
        walking: 'Pėsčiomis',
        
        // === SEARCH & FILTER ===
        search: 'Ieškoti',
        searchPlaceholder: 'Ieškoti...',
        filter: 'Filtras',
        sortBy: 'Rūšiuoti pagal',
        sortByDistance: 'Atstumą',
        sortByRating: 'Įvertinimą',
        sortByPrice: 'Kainą',
        clearFilter: 'Išvalyti filtrą',
        
        // === RESULTS & DATA ===
        results: 'Rezultatai',
        noResults: 'Rezultatų nerasta',
        showingResults: 'Rodomi rezultatai',
        of: 'iš',
        totalResults: 'Viso rezultatų',
        
        // === FORM VALIDATION ===
        errors: 'Klaidos:',
        isRequired: ' yra būtinas',
        invalidEmail: 'Neteisingas el. pašto adresas',
        invalidPhone: 'Neteisingas telefono numeris',
        invalidDate: 'Neteisinga data',
        minLength: 'Minimalus simbolių skaičius:',
        maxLength: 'Maksimalus simbolių skaičius:',
        
        // === SPECIFIC VALIDATION MESSAGES ===
        cityNotFound: 'Miesto nerasta. Bandykite dar kartą.',
        destinationRequired: 'Vieta yra būtina',
        dateRequired: 'Data yra būtina',
        daysRequired: 'Dienų skaičius yra būtinas',
        fromRequired: 'Pradžios taškas yra būtinas',
        toRequired: 'Vieta yra būtina',
        timeRequired: 'Laikas yra būtinas',
        
        // === API MESSAGES ===
        apiError: 'Įvyko API klaida',
        networkError: 'Tinklo klaida, patikrinkite prisijungimą',
        serverError: 'Serverio klaida, bandykite vėliau',
        timeoutError: 'Susijungimo laikas baigėsi',
        
        // === WEATHER ===
        weather: 'Orai',
        temperature: 'Temperatūra',
        forecast: 'Orų prognozė',
        sunny: 'Saulėta',
        cloudy: 'Debesuota',
        rainy: 'Lyja',
        snowy: 'Sninga',
        windy: 'Vėjuota',
        
        // === EXTERNAL LINKS ===
        openInMaps: 'Atidaryti Google Maps',
        callRestaurant: 'Skambinti restoranui',
        visitWebsite: 'Apsilankyti svetainėje',
        getDirections: 'Gauti directions',
        share: 'Dalintis',
        bookmark: 'Išsaugoti žymą',
        
        // === USER FEEDBACK ===
        thankYou: 'Ačiū!',
        reviewAdded: 'Atsiliepimas pridėtas',
        savedToFavorites: 'Išsaugota mėgstamiausiuose',
        removedFromFavorites: 'Pašalinta iš mėgstamiausių',
        
        // === PRIVACY & LEGAL ===
        privacy: 'Privatumo politika',
        terms: 'Sąlygos',
        about: 'Apie',
        contact: 'Kontaktai',
        
        // === ACCESSIBILITY ===
        skipToContent: 'Pereiti prie turinio',
        menuToggle: 'Meniu perjungimas',
        closeMenu: 'Uždaryti meniu',
        openMenu: 'Atidaryti meniu',
        
        // === TIME & DATE FORMATS ===
        today: 'Šiandien',
        tomorrow: 'Rytoj',
        yesterday: 'Vakar',
        minutes: 'minutės',
        hours: 'valandos',
        days: 'dienos',
        week: 'savaitė',
        month: 'mėnuo',
        year: 'metai',
        
        // === COMMON PHRASES ===
        yes: 'Taip',
        no: 'Ne',
        ok: 'GERAI',
        thankYou: 'Ačiū',
        please: 'Prašau',
        welcome: 'Sveiki atvykę',
        goodbye: 'Atsisveikinimas',
        
        // === LOCATIONS ===
        currentLocation: 'Dabartinė vieta',
        useCurrentLocation: 'Naudoti dabartinę vietą',
        nearMe: 'Netoli manęs',
        
        // === RATINGS ===
        starRating: 'Žvaigždučių įvertinimas',
        excellent: 'Puikus',
        good: 'Geras',
        average: 'Vidutinis',
        poor: 'Blogas',
        
        // === PRICES ===
        free: 'Nemokamai',
        paid: 'Mokama',
        priceRange: 'Kainų diapazonas',
        currencyDKK: 'DKK',
        currencyEUR: 'EUR',
        currencyUSD: 'USD',
        
        // === MOBILE SPECIFIC ===
        swipeLeft: 'Braukti kairėn',
        swipeRight: 'Braukti dešinėn',
        tapToSelect: 'Paliesti kad pasirinkti',
        longPress: 'Ilgas paspaudimas',
        pullToRefresh: 'Tempkite kad atnaujinti'
    }
};

// =============================================================================
// 7. TRANSLATION HELPER FUNCTIONS (MAINTENANCE TOOLS)
// =============================================================================

// === Get all available languages ===
const getAvailableLanguages = () => {
    return Object.keys(translations);
};

// === Get translation count per language ===
const getTranslationStats = () => {
    const stats = {};
    Object.keys(translations).forEach(lang => {
        stats[lang] = Object.keys(translations[lang]).length;
    });
    return stats;
};

// === Validate complete translation coverage ===
const validateTranslations = () => {
    const languages = getAvailableLanguages();
    const firstLang = languages[0];
    const baseKeys = Object.keys(translations[firstLang]);
    const issues = [];
    
    languages.forEach(lang => {
        const langKeys = Object.keys(translations[lang]);
        const missing = baseKeys.filter(key => !langKeys.includes(key));
        const extra = langKeys.filter(key => !baseKeys.includes(key));
        
        if (missing.length > 0) {
            issues.push(`${lang} missing keys: ${missing.join(', ')}`);
        }
        if (extra.length > 0) {
            issues.push(`${lang} extra keys: ${extra.join(', ')}`);
        }
    });
    
    return issues;
};

// === Missing translation placeholder ===
const getMissingText = (key, language = 'en') => {
    return `[Missing: ${key} (${language})]`;
};

// =============================================================================
// 8. EXPORT FOR USE IN OTHER FILES
// =============================================================================

// === Main export ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}

// === Global availability ===
if (typeof window !== 'undefined') {
    window.translations = translations;
    window.translationHelpers = {
        getAvailableLanguages,
        getTranslationStats,
        validateTranslations,
        getMissingText
    };
}

// =============================================================================
// 9. CONSOLE LOG TRANSLATION STATUS (DEVELOPMENT)
// =============================================================================
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('🌐 Translation System Loaded:', {
        languages: getAvailableLanguages(),
        stats: getTranslationStats(),
        issues: validateTranslations()
    });
}
