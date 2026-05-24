'use client';

import { useEffect, useState } from 'react';

import { formatTime } from '@/widgets/clock/lib/format-time';

import styles from './digital-clock.module.css';

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
