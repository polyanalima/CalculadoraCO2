/**
 * CONFIG - Global configuration object for the CO2 emissions calculator
 * Contains emission factors, transport metadata, carbon credit values, and UI setup helpers
 */

const CONFIG = {
    EMISSION_FACTORS: {
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    },

    TRANSPORT_MODES: {
        bicycle: {
            label: "Bicicleta",
            icon: "🚲",
            color: "#10b981"
        },
        car: {
            label: "Carro",
            icon: "🚗",
            color: "#059669"
        },
        bus: {
            label: "Ônibus",
            icon: "🚌",
            color: "#3b82f6"
        },
        truck: {
            label: "Caminhão",
            icon: "🚚",
            color: "#ef4444"
        }
    },

    CARBON_CREDIT: {
        KG_PER_CREDIT: 1000,
        PRICE_MIN_BRL: 50,
        PRICE_MAX_BRL: 150
    },

    /**
     * Populate the city datalist with options derived from RoutesDB
     */
    populateDataList: function () {
        const cities = RoutesDB.getAllCities();
        const datalist = document.getElementById("cities-list");

        if (!datalist) {
            return;
        }

        datalist.innerHTML = "";

        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            datalist.appendChild(option);
        });
    },

    /**
     * Setup automatic distance autofill based on selected origin and destination
     */
    setupDistanceAutofill: function () {
        const originInput = document.getElementById("origin");
        const destinationInput = document.getElementById("destination");
        const distanceInput = document.getElementById("distance");
        const manualDistanceCheckbox = document.getElementById("manual-distance");
        const helperText = document.querySelector(".calculator-form__helper");

        if (!originInput || !destinationInput || !distanceInput || !manualDistanceCheckbox || !helperText) {
            return;
        }

        const updateDistance = function () {
            const originValue = originInput.value.trim();
            const destinationValue = destinationInput.value.trim();

            if (!originValue || !destinationValue) {
                distanceInput.value = "";
                helperText.textContent = "A distância será preenchida automaticamente";
                helperText.style.color = "";
                distanceInput.readOnly = true;
                return;
            }

            const distance = RoutesDB.findDistance(originValue, destinationValue);

            if (distance !== null && !manualDistanceCheckbox.checked) {
                distanceInput.value = distance;
                distanceInput.readOnly = true;
                helperText.textContent = "Distância encontrada com sucesso.";
                helperText.style.color = "#10b981";
            } else if (!manualDistanceCheckbox.checked) {
                distanceInput.value = "";
                distanceInput.readOnly = true;
                helperText.textContent = "Rota não encontrada. Marque a opção para inserir manualmente.";
                helperText.style.color = "#ef4444";
            }
        };

        originInput.addEventListener("change", updateDistance);
        destinationInput.addEventListener("change", updateDistance);

        manualDistanceCheckbox.addEventListener("change", function () {
            if (manualDistanceCheckbox.checked) {
                distanceInput.readOnly = false;
                helperText.textContent = "Agora você pode inserir a distância manualmente.";
                helperText.style.color = "";
            } else {
                updateDistance();
            }
        });
    }
};
