'use client';

import { useState } from 'react';

import styles from './ClockView.module.css';
import AnalogClock from './ui/AnalogClock';
import DigitalClock from './ui/DigitalClock';

type Mode = 'digital' | 'analog';

export default function ClockView() {
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
