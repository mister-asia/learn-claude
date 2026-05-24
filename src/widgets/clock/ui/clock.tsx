'use client';

import { useState } from 'react';

import AnalogClock from './analog-clock';
import styles from './clock.module.css';
import DigitalClock from './digital-clock';

type Mode = 'digital' | 'analog';

export function Clock() {
    const [mode, setMode] = useState<Mode>('digital');

    return (
        <>
            <div className={styles.toggle}>
                <button
                    className={`${styles.toggleBtn} ${mode === 'digital' ? styles.toggleBtnActive : ''}`}
                    onClick={() => setMode('digital')}
                >
                    Цифровой
                </button>
                <button
                    className={`${styles.toggleBtn} ${mode === 'analog' ? styles.toggleBtnActive : ''}`}
                    onClick={() => setMode('analog')}
                >
                    Аналоговый
                </button>
            </div>
            <div className={styles.display}>
                {mode === 'digital' ? <DigitalClock /> : <AnalogClock />}
            </div>
        </>
    );
}
