/**
 * Calculator - Global helper object for CO2 emission calculations
 * Contains methods to compute emissions, comparisons, savings and carbon credit estimates.
 */

const Calculator = {
    /**
     * Calculate emissions in kilograms of CO2 for a given distance and transport mode.
     * @param {number} distanceKm - Distance traveled in kilometers
     * @param {string} transportMode - Mode of transport key matching CONFIG.EMISSION_FACTORS
     * @returns {number} Emission value rounded to 2 decimal places
     */
    calculateEmission: function (distanceKm, transportMode) {
        const factor = CONFIG.EMISSION_FACTORS[transportMode] ?? 0;
        const emission = distanceKm * factor;
        return Number(emission.toFixed(2));
    },

    /**
     * Calculate emissions for all transport modes and compare them against car emission.
     * Returns an array sorted by emission ascending.
     * @param {number} distanceKm - Distance traveled in kilometers
     * @returns {Array<object>} Array of results for each transport mode
     */
    calculateAllModes: function (distanceKm) {
        const results = [];
        const carEmission = this.calculateEmission(distanceKm, "car");

        for (const mode in CONFIG.EMISSION_FACTORS) {
            const emission = this.calculateEmission(distanceKm, mode);
            const percentageVsCar = carEmission > 0 ? Number(((emission / carEmission) * 100).toFixed(2)) : 0;

            results.push({
                mode,
                emission,
                percentageVsCar
            });
        }

        return results.sort((a, b) => a.emission - b.emission);
    },

    /**
     * Calculate the amount of emissions saved versus a baseline mode.
     * @param {number} emission - Emission for the selected mode
     * @param {number} baselineEmission - Baseline emission to compare against
     * @returns {{savedKg: number, percentage: number}}
     */
    calculateSavings: function (emission, baselineEmission) {
        const savedKg = baselineEmission - emission;
        const percentage = baselineEmission > 0 ? Number(((savedKg / baselineEmission) * 100).toFixed(2)) : 0;

        return {
            savedKg: Number(savedKg.toFixed(2)),
            percentage
        };
    },

    /**
     * Calculate how many carbon credits are required for a given emission volume.
     * @param {number} emissionKg - Total emissions in kilograms
     * @returns {number} Number of carbon credits rounded to 4 decimal places
     */
    calculateCarbonCredits: function (emissionKg) {
        const credits = emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
        return Number(credits.toFixed(4));
    },

    /**
     * Estimate the price range for a number of carbon credits.
     * @param {number} credits - Number of carbon credits
     * @returns {{min: number, max: number, average: number}}
     */
    estimateCreditPrice: function (credits) {
        const min = credits * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
        const max = credits * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
        const average = (min + max) / 2;

        return {
            min: Number(min.toFixed(2)),
            max: Number(max.toFixed(2)),
            average: Number(average.toFixed(2))
        };
    }
};
