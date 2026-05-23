'use client';

import { useState, useEffect } from 'react';
import { formatTime } from '@/utils/formatTime';
import styles from './Clock.module.css';

export default function Clock() {
    const [time, setTime] = useState(() => formatTime(new Date()));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatTime(new Date()));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <div className={styles.clock}>{time}</div>;
}
