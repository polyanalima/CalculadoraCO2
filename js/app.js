/**
 * App initialization and event handling for the CO2 emissions calculator.
 */

window.addEventListener('DOMContentLoaded', function () {
    const calculatorForm = document.getElementById('calculator-form');

    // Fill autocomplete city list and enable distance autofill behavior.
    CONFIG.populateDataList();
    CONFIG.setupDistanceAutofill();

    console.log(' 🟩 Calculadora inicializada!');

    if (!calculatorForm) {
        console.error('Formulário não encontrado: #calculator-form');
        return;
    }

    calculatorForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        const distanceInput = document.getElementById('distance');
        const selectedTransport = document.querySelector('input[name="transport"]:checked');
        const submitButton = calculatorForm.querySelector('button[type="submit"]');

        const originValue = originInput ? originInput.value.trim() : '';
        const destinationValue = destinationInput ? destinationInput.value.trim() : '';
        const distanceValue = distanceInput ? parseFloat(distanceInput.value) : NaN;
        const transportMode = selectedTransport ? selectedTransport.value : '';

        if (!originValue || !destinationValue) {
            alert('Por favor, preencha a origem e o destino.');
            return;
        }

        if (Number.isNaN(distanceValue) || distanceValue <= 0) {
            alert('Por favor, insira uma distância válida maior que zero.');
            return;
        }

        if (!transportMode) {
            alert('Por favor, selecione um modo de transporte.');
            return;
        }

        if (submitButton) {
            UI.showLoading(submitButton);
        }

        UI.hideElement('results');
        UI.hideElement('comparison');
        UI.hideElement('carbon-credits');

        setTimeout(function () {
            try {
                const emission = Calculator.calculateEmission(distanceValue, transportMode);
                const carEmission = Calculator.calculateEmission(distanceValue, 'car');
                const savings = Calculator.calculateSavings(emission, carEmission);
                const comparisonModes = Calculator.calculateAllModes(distanceValue);
                const credits = Calculator.calculateCarbonCredits(emission);
                const creditsPrice = Calculator.estimateCreditPrice(credits);

                const resultsData = {
                    origin: originValue,
                    destination: destinationValue,
                    distance: distanceValue,
                    emission,
                    mode: transportMode,
                    savings
                };

                const creditData = {
                    credits,
                    min: creditsPrice.min,
                    max: creditsPrice.max,
                    average: creditsPrice.average
                };

                const resultsContainer = document.getElementById('results-content');
                const comparisonContainer = document.getElementById('comparison-content');
                const carbonCreditsContainer = document.getElementById('carbon-credits-content');

                if (resultsContainer) {
                    resultsContainer.innerHTML = UI.renderResults(resultsData);
                }

                if (comparisonContainer) {
                    comparisonContainer.innerHTML = UI.renderComparison(comparisonModes, transportMode);
                }

                if (carbonCreditsContainer) {
                    carbonCreditsContainer.innerHTML = UI.renderCarbonCredits(creditData);
                }

                UI.showElement('results');
                UI.showElement('comparison');
                UI.showElement('carbon-credits');
                UI.scrollToElement('results');
            } catch (error) {
                console.error('Erro ao processar o cálculo:', error);
                alert('Ocorreu um problema ao calcular as emissões. Tente novamente.');
            } finally {
                if (submitButton) {
                    UI.hideLoading(submitButton);
                }
            }
        }, 1500);
    });
});
