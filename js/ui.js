/**
 * UI - Global helper object for rendering the calculator interface
 * Contains formatting utilities, show/hide helpers, and rendering methods for results, comparison, and carbon credits.
 */

const UI = {
    /**
     * Format a number with a fixed number of decimals and thousands separators.
     * @param {number} number - The number to format
     * @param {number} decimals - Number of decimal places
     * @returns {string} Formatted number string
     */
    formatNumber: function (number, decimals) {
        const value = Number(number).toFixed(decimals);
        return Number(value).toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    /**
     * Format a value as Brazilian Real currency.
     * @param {number} value - Numeric value to format
     * @returns {string} Currency string in pt-BR format
     */
    formatCurrency: function (value) {
        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * Show an element by removing the hidden utility class.
     * @param {string} elementId - Element ID to show
     */
    showElement: function (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hidden');
        }
    },

    /**
     * Hide an element by adding the hidden utility class.
     * @param {string} elementId - Element ID to hide
     */
    hideElement: function (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hidden');
        }
    },

    /**
     * Scroll smoothly to an element by ID.
     * @param {string} elementId - Element ID to scroll to
     */
    scrollToElement: function (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    /**
     * Render the main results section HTML.
     * @param {object} data - Route and emission details
     * @returns {string} HTML markup for the results section
     */
    renderResults: function (data) {
        const modeMeta = CONFIG.TRANSPORT_MODES[data.mode] || {};
        const savingsHtml = data.mode !== 'car' && data.savings
            ? `
                <div class="results__card results__card--savings">
                    <h3 class="results__card-title">Economia</h3>
                    <p class="results__card-value">${this.formatNumber(data.savings.savedKg, 2)} kg</p>
                    <p class="results__card-text">${this.formatNumber(data.savings.percentage, 2)}% menos CO2 vs Carro</p>
                </div>
            `
            : '';

        return `
            <div class="results__grid">
                <div class="results__card results__card--route">
                    <h3 class="results__card-title">Rota</h3>
                    <p class="results__card-text">${data.origin} → ${data.destination}</p>
                </div>

                <div class="results__card results__card--distance">
                    <h3 class="results__card-title">Distância</h3>
                    <p class="results__card-value">${this.formatNumber(data.distance, 0)} km</p>
                </div>

                <div class="results__card results__card--emission">
                    <h3 class="results__card-title">Emissão de CO2</h3>
                    <p class="results__card-value">${this.formatNumber(data.emission, 2)} kg</p>
                    <p class="results__card-text">🌿 Impacto estimado</p>
                </div>

                <div class="results__card results__card--transport">
                    <h3 class="results__card-title">Transporte</h3>
                    <p class="results__card-transport-icon">${modeMeta.icon || ''}</p>
                    <p class="results__card-value">${modeMeta.label || data.mode}</p>
                </div>

                ${savingsHtml}
            </div>
        `;
    },

    /**
     * Render comparison HTML for all transport modes.
     * @param {Array<object>} modesArray - Comparisons for each transport mode
     * @param {string} selectedMode - Currently selected transport mode
     * @returns {string} HTML markup for comparison cards
     */
    renderComparison: function (modesArray, selectedMode) {
        const maxEmission = Math.max(...modesArray.map(item => item.emission), 1);
        const itemsHtml = modesArray.map(item => {
            const modeMeta = CONFIG.TRANSPORT_MODES[item.mode] || {};
            const isSelected = item.mode === selectedMode;
            const progress = Math.min(100, (item.emission / maxEmission) * 100);
            let barColor = '#10b981';

            if (progress <= 25) {
                barColor = '#10b981';
            } else if (progress <= 75) {
                barColor = '#f59e0b';
            } else if (progress <= 100) {
                barColor = '#f97316';
            } else {
                barColor = '#ef4444';
            }

            return `
                <div class="comparison__item ${isSelected ? 'comparison__item--selected' : ''}">
                    <header class="comparison__item-header">
                        <span class="comparison__item-icon">${modeMeta.icon || ''}</span>
                        <div>
                            <h3 class="comparison__item-title">${modeMeta.label || item.mode}</h3>
                            <p class="comparison__item-subtitle">${this.formatNumber(item.emission, 2)} kg CO2</p>
                        </div>
                        ${isSelected ? '<span class="comparison__item-badge">Seleccionado</span>' : ''}
                    </header>
                    <div class="comparison__item-progress">
                        <div class="comparison__item-progress-bar" style="width: ${progress}%; background-color: ${barColor};"></div>
                    </div>
                    <p class="comparison__item-stats">${this.formatNumber(item.percentageVsCar, 2)}% do emissões do carro</p>
                </div>
            `;
        }).join('');

        return `
            <div class="comparison__list">
                ${itemsHtml}
            </div>
            <div class="comparison__tip-box">
                <p class="comparison__tip-title">Dica</p>
                <p class="comparison__tip-text">Escolher meios de transporte mais leves pode reduzir drasticamente suas emissões de CO2 ao longo do tempo.</p>
            </div>
        `;
    },

    /**
     * Render carbon credit estimation HTML.
     * @param {object} creditsData - Credits and price estimates
     * @returns {string} HTML markup for carbon credit details
     */
    renderCarbonCredits: function (creditsData) {
        return `
            <div class="carbon-credits__grid">
                <div class="carbon-credits__card">
                    <h3 class="carbon-credits__title">Créditos de Carbono</h3>
                    <p class="carbon-credits__value">${this.formatNumber(creditsData.credits, 4)}</p>
                    <p class="carbon-credits__text">1 crédito = 1000 kg CO2</p>
                </div>

                <div class="carbon-credits__card">
                    <h3 class="carbon-credits__title">Estimativa de Preço</h3>
                    <p class="carbon-credits__value">${this.formatCurrency(creditsData.average)}</p>
                    <p class="carbon-credits__text">Faixa: ${this.formatCurrency(creditsData.min)} - ${this.formatCurrency(creditsData.max)}</p>
                </div>
            </div>
            <div class="carbon-credits__info-box">
                <p class="carbon-credits__info-title">O que são créditos de carbono?</p>
                <p class="carbon-credits__info-text">Os créditos de carbono representam uma forma de compensar emissões apoiando projetos que removem ou evitam CO2.</p>
            </div>
            <button type="button" class="carbon-credits__button">🛒 Compesar Emissões</button>
        `;
    },

    /**
     * Show a loading state on the button while calculations are running.
     * @param {HTMLButtonElement} buttonElement - Button to update
     */
    showLoading: function (buttonElement) {
        if (!buttonElement) {
            return;
        }

        buttonElement.dataset.originalText = buttonElement.innerHTML;
        buttonElement.disabled = true;
        buttonElement.innerHTML = '<span class="spinner"></span> Calculando...';
    },

    /**
     * Hide the loading state and restore the button text.
     * @param {HTMLButtonElement} buttonElement - Button to restore
     */
    hideLoading: function (buttonElement) {
        if (!buttonElement) {
            return;
        }

        buttonElement.disabled = false;
        if (buttonElement.dataset.originalText) {
            buttonElement.innerHTML = buttonElement.dataset.originalText;
            delete buttonElement.dataset.originalText;
        }
    }
};
