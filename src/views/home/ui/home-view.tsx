import Link from 'next/link';

import { ROUTES } from '@/shared/config';

import styles from './home-view.module.css';

export function HomeView() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <p className={styles.description}>Учебный проект на Next.js + TypeScript</p>
                <hr className={styles.divider} />
                <Link href={ROUTES.clock} className={styles.button}>
                    Открыть часы
                </Link>
            </div>
        </div>
    );
}
