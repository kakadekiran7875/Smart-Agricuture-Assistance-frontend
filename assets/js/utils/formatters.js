/**
 * Smart Agriculture Assistant - Agricultural & Regional Formatters
 */

/**
 * Format currency in Indian Rupees (e.g. ₹ 2,450 / Qtl)
 */
export function formatINR(amount, perUnit = '') {
    if (isNaN(amount) || amount === null) return '₹ --';
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
    return perUnit ? `${formatted} / ${perUnit}` : formatted;
}

/**
 * Format temperature in Celsius
 */
export function formatTemperature(celsius) {
    if (isNaN(celsius) || celsius === null) return '--°C';
    return `${Math.round(celsius)}°C`;
}

/**
 * Format date in Indian localized format (DD MMM YYYY)
 */
export function formatDate(date = new Date()) {
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

