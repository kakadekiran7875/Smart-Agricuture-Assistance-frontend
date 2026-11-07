/**
 * Smart Agriculture Assistant - Theme Engine
 * Manages Dark / Light mode switching, localStorage persistence & OS sync.
 */

const THEME_STORAGE_KEY = 'smart_agri_theme';

export class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }

        // Listen for OS scheme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem(THEME_STORAGE_KEY)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);

        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }

        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }

    toggle() {
        const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(nextTheme);
        return nextTheme;
    }
}

export const themeManager = new ThemeManager();

// Expose globally for legacy inline HTML onclick handlers
if (typeof window !== 'undefined') {
    window.toggleDarkMode = () => themeManager.toggle();
}

export default themeManager;

