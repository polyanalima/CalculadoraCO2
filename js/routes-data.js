/**
 * RoutesDB - Global database of Brazilian routes
 * Contains a collection of popular routes with distances between major Brazilian cities
 * Provides methods to query cities and calculate distances between locations
 */

const RoutesDB = {
    /**
     * Array of route objects
     * Each route contains:
     * - origin: string (city name with state abbreviation, e.g., "São Paulo, SP")
     * - destination: string (city name with state abbreviation)
     * - distanceKm: number (distance in kilometers between cities)
     */
    routes: [
        // Capital to Capital Connections
        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
        { origin: "Salvador, BA", destination: "Brasília, DF", distanceKm: 1616 },
        { origin: "Curitiba, PR", destination: "Brasília, DF", distanceKm: 1358 },
        { origin: "Porto Alegre, RS", destination: "Brasília, DF", distanceKm: 2050 },
        { origin: "Fortaleza, CE", destination: "Brasília, DF", distanceKm: 2207 },
        { origin: "Belém, PA", destination: "Brasília, DF", distanceKm: 2100 },
        { origin: "Recife, PE", destination: "Brasília, DF", distanceKm: 1982 },

        // São Paulo Region
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 71 },
        { origin: "São Paulo, SP", destination: "Sorocaba, SP", distanceKm: 108 },
        { origin: "São Paulo, SP", destination: "Jundiaí, SP", distanceKm: 60 },
        { origin: "São Paulo, SP", destination: "Itu, SP", distanceKm: 99 },
        { origin: "São Paulo, SP", destination: "Guarulhos, SP", distanceKm: 25 },
        { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 315 },
        { origin: "Campinas, SP", destination: "Ribeirão Preto, SP", distanceKm: 260 },

        // Rio de Janeiro Region
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Rio de Janeiro, RJ", destination: "Angra dos Reis, RJ", distanceKm: 168 },
        { origin: "Rio de Janeiro, RJ", destination: "Nova Iguaçu, RJ", distanceKm: 51 },
        { origin: "Rio de Janeiro, RJ", destination: "Duque de Caxias, RJ", distanceKm: 40 },
        { origin: "Rio de Janeiro, RJ", destination: "Petrópolis, RJ", distanceKm: 65 },

        // Minas Gerais Region
        { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
        { origin: "Belo Horizonte, MG", destination: "Contagem, MG", distanceKm: 30 },
        { origin: "Belo Horizonte, MG", destination: "Montes Claros, MG", distanceKm: 420 },

        // Bahia Region
        { origin: "Salvador, BA", destination: "Feira de Santana, BA", distanceKm: 116 },
        { origin: "Salvador, BA", destination: "Lauro de Freitas, BA", distanceKm: 30 },
        { origin: "Salvador, BA", destination: "Santo Estêvão, BA", distanceKm: 285 },

        // Pernambuco Region
        { origin: "Recife, PE", destination: "Olinda, PE", distanceKm: 8 },
        { origin: "Recife, PE", destination: "Jaboatão dos Guararapes, PE", distanceKm: 22 },
        { origin: "Recife, PE", destination: "Caruaru, PE", distanceKm: 135 },

        // Ceará Region
        { origin: "Fortaleza, CE", destination: "Maranguape, CE", distanceKm: 24 },
        { origin: "Fortaleza, CE", destination: "Caucaia, CE", distanceKm: 32 },
        { origin: "Fortaleza, CE", destination: "Sobral, CE", distanceKm: 240 },

        // Paraná Region
        { origin: "Curitiba, PR", destination: "São Paulo, SP", distanceKm: 405 },
        { origin: "Curitiba, PR", destination: "Ponta Grossa, PR", distanceKm: 120 },
        { origin: "Curitiba, PR", destination: "Colombo, PR", distanceKm: 30 },

        // Rio Grande do Sul Region
        { origin: "Porto Alegre, RS", destination: "Viamão, RS", distanceKm: 35 },
        { origin: "Porto Alegre, RS", destination: "Canoas, RS", distanceKm: 28 },

        // Goiás Region
        { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
        { origin: "Goiânia, GO", destination: "Anápolis, GO", distanceKm: 55 },
        { origin: "Goiânia, GO", destination: "Jataí, GO", distanceKm: 290 },

        // Amazon Region
        { origin: "Manaus, AM", destination: "Itacoatiara, AM", distanceKm: 176 },
        { origin: "Manaus, AM", destination: "Novo Airão, AM", distanceKm: 155 },
        { origin: "Belém, PA", destination: "Ananindeua, PA", distanceKm: 25 },
        { origin: "Belém, PA", destination: "Marabá, PA", distanceKm: 560 },
    ],

    /**
     * Get all unique city names from the routes database
     * @returns {Array<string>} Sorted array of all cities with state abbreviations
     */
    getAllCities: function () {
        const cities = new Set();

        // Extract all cities from both origin and destination
        this.routes.forEach(route => {
            cities.add(route.origin);
            cities.add(route.destination);
        });

        // Convert to array, sort alphabetically, and return
        return Array.from(cities).sort((a, b) => a.localeCompare(b, 'pt-BR'));
    },

    /**
     * Find the distance between two cities
     * @param {string} origin - Origin city name (with or without state)
     * @param {string} destination - Destination city name (with or without state)
     * @returns {number|null} Distance in kilometers if route found, null otherwise
     */
    findDistance: function (origin, destination) {
        // Normalize inputs: trim whitespace and convert to lowercase
        const normalizedOrigin = origin.trim().toLowerCase();
        const normalizedDestination = destination.trim().toLowerCase();

        // Search through routes in both directions
        for (const route of this.routes) {
            const routeOrigin = route.origin.toLowerCase();
            const routeDestination = route.destination.toLowerCase();

            // Check if origin matches and destination matches (forward direction)
            if (routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) {
                return route.distanceKm;
            }

            // Check reverse direction (destination to origin)
            if (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin) {
                return route.distanceKm;
            }
        }

        // No matching route found
        return null;
    }
};
