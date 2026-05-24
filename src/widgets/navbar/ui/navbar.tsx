'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeToggleButton } from '@/features/theme-toggle';

import { ROUTES } from '@/shared/config';

import styles from './navbar.module.css';

const links = [
    { href: ROUTES.home, label: 'Главная' },
    { href: ROUTES.clock, label: 'Часы' },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={styles.nav}>
            <ul className={styles.links}>
                {links.map(({ href, label }) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className={`${styles.link} ${pathname === href ? styles.active : ''}`}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className={styles.actions}>
                <ThemeToggleButton />
            </div>
        </nav>
    );
}
