import Link from 'next/link';

import { Clock } from '@/widgets/clock';

import { ThemeToggleButton } from '@/features/theme-toggle';

import styles from './clock-view.module.css';

export function ClockView() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.label}>Текущее время</span>
                    <ThemeToggleButton />
                    <Link href="/" className={styles.back}>
                        ← Назад
                    </Link>
                </div>
                <div className={styles.body}>
                    <Clock />
                </div>
            </div>
        </div>
    );
}
