'use client';

import { useThemeContext } from '@/shared/ui/theme-provider';

import styles from './theme-toggle-button.module.css';

export function ThemeToggleButton() {
    const { theme, toggleTheme } = useThemeContext();
    const isDark = theme === 'dark';

    return (
        <button
            suppressHydrationWarning
            className={styles.btn}
            onClick={toggleTheme}
            aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
            title={isDark ? 'Светлая тема' : 'Тёмная тема'}
        >
            {isDark ? '☀' : '☾'}
        </button>
    );
}
