import Link from 'next/link';

export default function Home() {
    return (
        <main>
            <h1>Привет это claude</h1>
            <Link href="/clock">Открыть часы</Link>
        </main>
    );
}
