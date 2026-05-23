import Link from 'next/link';

import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
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
