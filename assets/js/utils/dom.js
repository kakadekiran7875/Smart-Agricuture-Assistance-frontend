/**
 * Smart Agriculture Assistant - DOM & Event Utilities
 */

export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export function on(target, event, handler, options = {}) {
    if (!target) return;
    target.addEventListener(event, handler, options);
}

export function debounce(fn, delay = 250) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

export function createElement(tag, className = '', attributes = {}) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    Object.keys(attributes).forEach(attr => el.setAttribute(attr, attributes[attr]));
    return el;
}

