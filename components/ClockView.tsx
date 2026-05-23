'use client';

import { useState } from 'react';

import AnalogClock from './AnalogClock';
import Clock from './Clock';
import styles from './ClockView.module.css';

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
            {mode === 'digital' ? <Clock /> : <AnalogClock />}
        </>
    );
}
