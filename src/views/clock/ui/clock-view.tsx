import { Clock } from '@/widgets/clock';

import styles from './clock-view.module.css';

export function ClockView() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.label}>Текущее время</span>
                </div>
                <div className={styles.body}>
                    <Clock />
                </div>
            </div>
        </div>
    );
}
