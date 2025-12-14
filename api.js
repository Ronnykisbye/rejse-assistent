const API_CONFIG = {
    nominatim: 'https://nominatim.openstreetmap.org/search',
    overpass: 'https://overpass-api.de/api/interpreter',
    wiki: 'https://en.wikipedia.org/api/rest_v1',
    weather: 'https://api.openweathermap.org/data/2.5',
    wikiCommons: 'https://commons.wikimedia.org/w/api.php'
};

const API_KEYS = {
    openweather:4fc6c7d240e78becfd0de558b6202af4 
};

async function geocodeCity(city) {
    try {
        const response = await fetch(`${API_CONFIG.nominatim}?q=${encodeURIComponent(city)}&format=json&limit=1`);
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: data[0].lat,
                lon: data[0].lon,
                display_name: data[0].display_name
            };
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

async function findRestaurants(lat, lon, radius = 2000) {
    const query = `[out:json][timeout:25];(node["amenity"="restaurant"](around:${radius},${lat},${lon});way["amenity"="restaurant"](around:${radius},${lat},${lon});relation["amenity"="restaurant"](around:${radius},${lat},${lon}););out geom;`;
    
    try {
        const response = await fetch(API_CONFIG.overpass, {
            method: 'POST',
            body: query
        });
        const data = await response.json();
        return formatPlaces(data.elements);
    } catch (error) {
        console.error('Restaurant search error:', error);
        return [];
    }
}

function formatPlaces(elements) {
    return elements.map(element => ({
        name: element.tags?.name || 'Uden navn',
        type: element.tags?.amenity || element.tags?.tourism || element.tags?.historic || 'Sted',
        lat: element.lat || element.center?.lat,
        lon: element.lon || element.center?.lon,
        tags: element.tags || {},
        id: element.id
    })).filter(place => place.lat && place.lon);
}

window.TravelAPI = {
    geocodeCity,
    findRestaurants
};
