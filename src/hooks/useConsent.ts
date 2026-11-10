'use client';
import { useCallback, useEffect, useState } from 'react';
import { getSourceConsentMode } from '@/services/consent';
import { IS_DEMO } from '@/configs/env';
import {
  captureVisitSource,
  isSourceAllowed,
  readSourceChoice,
  recordSourceChoice,
  type SourceChoice,
} from '@/utils/visitSource';
import { readStored, writeStored } from '@/utils/storage';

const NOTICE_KEY = 'sk_consent_ack';
const SHOW_DELAY_MS = 600;

type Stage = 'none' | 'source' | 'notice';

/** Two banners in order: first the source choice (only where the server says it is required), then the data notice. */
export function useConsent() {
  const [stage, setStage] = useState<Stage>('none');

  useEffect(() => {
    let live = true;
    const showNotice = () =>
      readStored(NOTICE_KEY) !== '1' &&
      live &&
      setTimeout(() => live && setStage('notice'), SHOW_DELAY_MS);
    (async () => {
      if (IS_DEMO) return showNotice();
      const mode = await getSourceConsentMode();
      const choice = readSourceChoice();
      if (mode === 'required' && !choice) {
        if (live) setTimeout(() => live && setStage('source'), SHOW_DELAY_MS);
        return;
      }
      if (isSourceAllowed(mode, choice)) captureVisitSource(true);
      showNotice();
    })();
    return () => {
      live = false;
    };
  }, []);

  const chooseSource = useCallback((choice: SourceChoice) => {
    recordSourceChoice(choice);
    setStage('none');
    if (readStored(NOTICE_KEY) !== '1') setTimeout(() => setStage('notice'), SHOW_DELAY_MS);
  }, []);

  const accept = useCallback(() => {
    writeStored(NOTICE_KEY, '1');
    setStage('none');
  }, []);

  return {
    sourceVisible: stage === 'source',
    noticeVisible: stage === 'notice',
    chooseSource,
    accept,
  };
}
