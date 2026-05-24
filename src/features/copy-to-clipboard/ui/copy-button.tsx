'use client';

import { useCopyToClipboard } from '../lib/use-copy-to-clipboard';
import styles from './copy-button.module.css';

interface Props {
    getValue: () => string;
}

export function CopyButton({ getValue }: Props) {
    const { copy, copied } = useCopyToClipboard();

    return (
        <button className={styles.btn} onClick={() => copy(getValue())}>
            {copied ? 'Скопировано!' : 'Скопировать'}
        </button>
    );
}
