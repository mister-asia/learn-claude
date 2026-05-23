import Link from 'next/link';

import { Clock } from '@/widgets/clock';

import styles from './page.module.css';

export default function ClockPage() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.label}>Текущее время</span>
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
