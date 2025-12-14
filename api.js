// === API KONFIGURATION SEKTION ===
const API_CONFIG = {
    nominatim: 'https://nominatim.openstreetmap.org/search',
    overpass: 'https://overpass-api.de/api/interpreter',
    wiki: 'https://en.wikipedia.org/api/rest_v1',
    weather: 'https://api.openweathermap.org/data/2.5',
    wikiCommons: 'https://commons.wikimedia.org/w/api.php'
};

// === API NØGLES SEKTION ===
const API_KEYS = {
    openweather: '4fc6c7d240e78becfd0de558b6202af4'
};

// === GEOKODNING FUNKTIONER SEKTION ===
async function geocodeCity(city) {
    try {
        const response = await fetch(
            `${API_CONFIG.nominatim}?q=${encodeURIComponent(city)}&format=json&limit=1`
        );
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

// === RESTAURANT SØGNING SEKTION ===
async function findRestaurants(lat, lon, radius = 2000) {
    const query = `
        [out:json][timeout:25];
        (
          node["amenity"="restaurant"](around:${radius},${lat},${lon});
          way["amenity"="restaurant"](around:${radius},${lat},${lon});
          relation["amenity"="restaurant"](around:${radius},${lat},${lon});
        );
        out geom;
    `;
    
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

// === OVERNATNING SØGNING SEKTION (forbedret med fejlhåndtering) ===
async function findAccommodation(lat, lon, radius = 3000) {
    const query = `
        [out:json][timeout:25];
        (
          node["tourism"="hotel"](around:${radius},${lat},${lon});
          node["tourism"="hostel"](around:${radius},${lat},${lon});
          node["tourism"="guest_house"](around:${radius},${lat},${lon});
          way["tourism"="hotel"](around:${radius},${lat},${lon});
        );
        out geom;
    `;
    
    try {
        const response = await fetch(API_CONFIG.overpass, {
            method: 'POST',
            body: query,
            headers: {
                'Content-Type': 'text/plain'
            }
        });
        
        // Tjek om response er gyldig JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            // Hvis det ikke er JSON, prøv at parse som tekst for at se fejlen
            const errorText = await response.text();
            console.error('API returned non-JSON response:', errorText);
            throw new Error('API returned invalid response format');
        }
        
        const data = await response.json();
        return formatPlaces(data.elements);
        
    } catch (error) {
        console.error('Accommodation search error:', error);
        
        // Fallback: Prøv en anden Overpass server
        try {
            const fallbackResponse = await fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                body: query,
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            
            if (fallbackResponse.ok) {
                const data = await fallbackResponse.json();
                return formatPlaces(data.elements);
            }
        } catch (fallbackError) {
            console.error('Fallback accommodation search also failed:', fallbackError);
        }
        
        return [];
    }
}

// === SEVÆRDIGHED SØGNING SEKTION ===
async function findSights(lat, lon, radius = 5000) {
    const query = `
        [out:json][timeout:25];
        (
          node["tourism"="attraction"](around:${radius},${lat},${lon});
          node["tourism"="museum"](around:${radius},${lat},${lon});
          node["historic"~".*"](around:${radius},${lat},${lon});
          node["leisure"="park"](around:${radius},${lat},${lon});
        );
        out geom;
    `;
    
    try {
        const response = await fetch(API_CONFIG.overpass, {
            method: 'POST',
            body: query
        });
        const data = await response.json();
        return formatPlaces(data.elements);
    } catch (error) {
        console.error('Sights search error:', error);
        return [];
    }
}

// === HEMMELIGE STEDER SØGNING SEKTION ===
async function findSecretPlaces(lat, lon, radius = 6000) {
    const query = `
        [out:json][timeout:25];
        (
          node["tourism"="artwork"](around:${radius},${lat},${lon});
          node["amenity"="community_centre"](around:${radius},${lat},${lon});
          node["leisure"="garden"](around:${radius},${lat},${lon});
          node["historic"="memorial"](around:${radius},${lat},${lon});
        );
        out geom;
    `;
    
    try {
        const response = await fetch(API_CONFIG.overpass, {
            method: 'POST',
            body: query
        });
        const data = await response.json();
        return formatPlaces(data.elements).slice(0, 5);
    } catch (error) {
        console.error('Secret places error:', error);
        return [];
    }
}

// === FORMATERING FUNKTIONER SEKTION ===
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

// === WIKIPEDIA FUNKTIONER SEKTION ===
async function getWikipediaInfo(city) {
    try {
        const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    } catch (error) {
        console.error('Wikipedia error:', error);
        return null;
    }
}

// === BILLEDE SØGNING SEKTION ===
async function getCityImages(city) {
    try {
        const params = new URLSearchParams({
            action: 'query',
            format: 'json',
            generator: 'search',
            gsrsearch: `${city} cityscape`,
            gsrlimit: '10',
            prop: 'imageinfo',
            iiprop: 'url|dimensions',
            iiurlwidth: '400'
        });

        const response = await fetch(
            `${API_CONFIG.wikiCommons}?${params}&origin=*`
        );
        const data = await response.json();
        
        if (data.query && data.query.pages) {
            return Object.values(data.query.pages)
                .filter(page => page.imageinfo && page.imageinfo.length > 0)
                .map(page => ({
                    url: page.imageinfo[0].url,
                    title: page.title,
                    width: page.imageinfo[0].width
                }));
        }
        return [];
    } catch (error) {
        console.error('Image search error:', error);
        return [];
    }
}

// === VEJR FUNKTIONER SEKTION ===
async function getWeather(lat, lon) {
    if (!API_KEYS.openweather) {
        return null;
    }
    
    try {
        const response = await fetch(
            `${API_CONFIG.weather}/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS.openweather}&units=metric`
        );
        if (response.ok) {
            const data = await response.json();
            return {
                temp: data.main.temp,
                description: data.weather[0].description,
                icon: data.weather[0].icon
            };
        }
        return null;
    } catch (error) {
        console.error('Weather error:', error);
        return null;
    }
}

// === RUTE PLANLÆGNING SEKTION ===
async function planRoute(from, to) {
    try {
        // Konverter adresser til koordinater
        const fromCoords = await geocodeCity(from);
        const toCoords = await geocodeCity(to);
        
        if (!fromCoords || !toCoords) {
            return { error: 'Kunne ikke finde lokationer' };
        }
        
        // Brug OSRM server (gratis)
        const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${fromCoords.lon},${fromCoords.lat};${toCoords.lon},${toCoords.lat}?overview=full&geometries=geojson`
        );
        
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
            return {
                distance: (data.routes[0].distance / 1000).toFixed(1) + ' km',
                duration: Math.round(data.routes[0].duration / 60) + ' min',
                coords: data.routes[0].geometry
            };
        }
        
        return { error: 'Ingen rute fundet' };
    } catch (error) {
        console.error('Route planning error:', error);
        return { error: 'Rute planlægning fejlede' };
    }
}

// === EKSPORT SEKTION ===
window.TravelAPI = {
    geocodeCity,
    findRestaurants,
    findAccommodation,
    findSights,
    findSecretPlaces,
    getWikipediaInfo,
    getCityImages,
    getWeather,
    planRoute
};
