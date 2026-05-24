import Link from 'next/link';

import { ThemeToggleButton } from '@/features/theme-toggle';

import styles from './home-view.module.css';

export function HomeView() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.toolbar}>
                    <ThemeToggleButton />
                </div>
                <p className={styles.title}>learn-claude</p>
                <p className={styles.description}>Учебный проект на Next.js + TypeScript</p>
                <hr className={styles.divider} />
                <Link href="/clock" className={styles.button}>
                    Открыть часы
                </Link>
            </div>
        </div>
    );
}
