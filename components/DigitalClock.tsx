'use client';

import { useEffect, useState } from 'react';

import { formatTime } from '@/utils/formatTime';

import styles from './DigitalClock.module.css';

export default function DigitalClock() {
    const [time, setTime] = useState(() => formatTime(new Date()));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatTime(new Date()));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <div className={styles.clock}>{time}</div>;
}
