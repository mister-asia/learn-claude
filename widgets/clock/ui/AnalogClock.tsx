'use client';

import { useEffect, useState } from 'react';

export default function AnalogClock() {
    const [date, setDate] = useState(() => new Date());

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours() % 12;

    const secDeg = seconds * 6;
    const minDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = hours * 30 + minutes * 0.5;

    const markers = Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r = 88;
        const x = 100 + r * Math.sin(angle);
        const y = 100 - r * Math.cos(angle);
        return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3 : 1.5} fill="var(--text-muted)" />;
    });

    return (
        <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Аналоговые часы" role="img">
            {/* face */}
            <circle
                cx="100"
                cy="100"
                r="96"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="1.5"
            />
            {markers}

            {/* hour hand */}
            <line
                x1="100"
                y1="100"
                x2="100"
                y2="42"
                stroke="var(--text)"
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${hourDeg}, 100, 100)`}
            />
            {/* minute hand */}
            <line
                x1="100"
                y1="100"
                x2="100"
                y2="28"
                stroke="var(--text)"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform={`rotate(${minDeg}, 100, 100)`}
            />
            {/* second hand */}
            <line
                x1="100"
                y1="112"
                x2="100"
                y2="22"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                transform={`rotate(${secDeg}, 100, 100)`}
            />
            {/* center dot */}
            <circle cx="100" cy="100" r="3.5" fill="var(--accent)" />
        </svg>
    );
}
