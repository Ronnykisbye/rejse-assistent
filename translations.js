// === OVERSÆTTELSER SEKTION ===
const translations = {
    da: {
        appTitle: 'REJSE ASSISTENT',
        destination: 'Destination By',
        startDate: 'Start dato',
        days: 'Antal dage',
        selectLanguage: 'Vælg sprog:',
        startTravel: 'START REJSE',
        back: 'TILBAGE',
        restaurants: 'Restauranter',
        accommodation: 'Overnatning',
        sights: '10 Seværdigheder',
        secrets: '5 Hemmeligheder',
        images: 'Billeder',
        transport: 'Transport',
        transportPlanner: 'Transport Planlægger',
        from: 'Fra',
        to: 'Til',
        departureDate: 'Dato',
        departureTime: 'Tidspunkt',
        planRoute: 'PLANLÆG RUTE',
        distance: 'Afstand',
        duration: 'Varighed',
        loading: 'Indlæser...',
        noResults: 'Ingen resultater fundet',
        error: 'Der opstod en fejl',
        openInMaps: 'Åbn i Google Maps',
        website: 'Hjemmeside',
        phone: 'Telefon'
    },
    en: {
        appTitle: 'TRAVEL ASSISTANT',
        destination: 'Destination City',
        startDate: 'Start Date',
        days: 'Number of Days',
        selectLanguage: 'Select Language:',
        startTravel: 'START TRAVEL',
        back: 'BACK',
        restaurants: 'Restaurants',
        accommodation: 'Accommodation',
        sights: '10 Attractions',
        secrets: '5 Hidden Gems',
        images: 'Images',
        transport: 'Transport',
        transportPlanner: 'Transport Planner',
        from: 'From',
        to: 'To',
        departureDate: 'Date',
        departureTime: 'Time',
        planRoute: 'PLAN ROUTE',
        distance: 'Distance',
        duration: 'Duration',
        loading: 'Loading...',
        noResults: 'No results found',
        error: 'An error occurred',
        openInMaps: 'Open in Google Maps',
        website: 'Website',
        phone: 'Phone'
    },
    de: {
        appTitle: 'REISE ASSISTENT',
        destination: 'Ziel Stadt',
        startDate: 'Startdatum',
        days: 'Anzahl Tage',
        selectLanguage: 'Sprache wählen:',
        startTravel: 'REISE STARTEN',
        back: 'ZURÜCK',
        restaurants: 'Restaurants',
        accommodation: 'Unterkunft',
        sights: '10 Sehenswürdigkeiten',
        secrets: '5 Geheimtipps',
        images: 'Bilder',
        transport: 'Transport',
        transportPlanner: 'Transport Planer',
        from: 'Von',
        to: 'Nach',
        departureDate: 'Datum',
        departureTime: 'Zeit',
        planRoute: 'ROUTE PLANEN',
        distance: 'Entfernung',
        duration: 'Dauer',
        loading: 'Lädt...',
        noResults: 'Keine Ergebnisse gefunden',
        error: 'Ein Fehler ist aufgetreten',
        openInMaps: 'In Google Maps öffnen',
        website: 'Webseite',
        phone: 'Telefon'
    },
    pl: {
        appTitle: 'ASYSTENT PODRÓŻY',
        destination: 'Miasto docelowe',
        startDate: 'Data rozpoczęcia',
        days: 'Liczba dni',
        selectLanguage: 'Wybierz język:',
        startTravel: 'ROZPOCZNIJ PODRÓŻ',
        back: 'WRÓC',
        restaurants: 'Restauracje',
        accommodation: 'Noclegi',
        sights: '10 Atrakcji',
        secrets: '5 Sekretów',
        images: 'Zdjęcia',
        transport: 'Transport',
        transportPlanner: 'Planer Transportu',
        from: 'Z',
        to: 'Do',
        departureDate: 'Data',
        departureTime: 'Czas',
        planRoute: 'ZAPLANUJ TRASĘ',
        distance: 'Dystans',
        duration: 'Czas trwania',
        loading: 'Ładowanie...',
        noResults: 'Brak wyników',
        error: 'Wystąpił błąd',
        openInMaps: 'Otwórz w Google Maps',
        website: 'Strona internetowa',
        phone: 'Telefon'
    },
    lt: {
        appTitle: 'KELIONIŲ ASISTENTAS',
        destination: 'Miesto susisiekimas',
        startDate: 'Pradžios data',
        days: 'Dienų skaičius',
        selectLanguage: 'Pasirinkite kalbą:',
        startTravel: 'PRADĖTI KELIONĘ',
        back: 'ATGAL',
        restaurants: 'Restoranai',
        accommodation: 'Apgyvendinimas',
        sights: '10 Lankytinų vietų',
        secrets: '5 Paslapčių',
        images: 'Nuotraukos',
        transport: 'Transportas',
        transportPlanner: 'Transporto Planuoklis',
        from: 'Iš',
        to: 'Į',
        departureDate: 'Data',
        departureTime: 'Laikas',
        planRoute: 'PLANUOTI MARŠRUTĄ',
        distance: 'Atstumas',
        duration: 'Trukmė',
        loading: 'Kraunama...',
        noResults: 'Rezultatų nerasta',
        error: 'Įvyko klaida',
        openInMaps: 'Atidaryti Google Maps',
        website: 'Svetainė',
        phone: 'Telefonas'
    }
};

// === SPROG HÅNDTERING SEKTION ===
let currentLanguage = 'da';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('travelAppLanguage', lang);
    updateLanguage();
}

function updateLanguage() {
    const texts = translations[currentLanguage];
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (texts[key]) {
            if (element.tagName === 'INPUT' && element.type !== 'submit') {
                element.placeholder = texts[key];
            } else {
                element.textContent = texts[key];
            }
        }
    });
    
    const titleElement = document.querySelector('.neon-title');
    if (titleElement) {
        const emoji = titleElement.textContent.includes('🌍') ? '🌍 ' : '';
        titleElement.textContent = emoji + texts.appTitle;
    }
    
    document.querySelectorAll('.menu-btn').forEach((btn, index) => {
        const map = ['restaurants', 'accommodation', 'sights', 'secrets', 'images', 'transport', 'weather'];
        const key = map[index];
        if (texts[key] && btn.querySelector('span')) {
            btn.querySelector('span').textContent = texts[key];
        }
    });
    
    updateFormLabels(texts);
}

function updateFormLabels(texts) {
    const labelMap = {
        'destination': texts.destination,
        'startDate': texts.startDate,
        'days': texts.days,
        'fromLocation': texts.from,
        'toLocation': texts.to,
        'departureDate': texts.departureDate,
        'departureTime': texts.departureTime
    };
    
    Object.entries(labelMap).forEach(([id, text]) => {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) {
            label.textContent = text;
        }
    });
}

function t(key) {
    return translations[currentLanguage][key] || translations['da'][key] || key;
}

function initLanguage() {
    const savedLang = localStorage.getItem('travelAppLanguage') || 'da';
    currentLanguage = savedLang;
    
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = savedLang;
    }
    
    updateLanguage();
}

// === EKSPORT SEKTION ===
window.Translations = {
    setLanguage,
    updateLanguage,
    t,
    initLanguage,
    currentLanguage: () => currentLanguage
};
