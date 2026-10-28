'use client';
import { useCallback, useEffect, useState } from 'react';
import { readStored, writeStored } from '@/utils/storage';

const CONSENT_KEY = 'sk_consent_ack';

export function useConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readStored(CONSENT_KEY) === '1') return;
    const id = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(id);
  }, []);

  const accept = useCallback(() => {
    writeStored(CONSENT_KEY, '1');
    setVisible(false);
  }, []);

  return { visible, accept };
}
