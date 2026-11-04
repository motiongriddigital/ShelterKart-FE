'use client';
import { useState } from 'react';
import { INCIDENT_KINDS, PAUSE_SCOPES, PLATFORMS, platformName } from '@/constants/social';
import type { Loose, Market } from '@/types/desk';
import { utc } from '@/utils/social';
import styles from '../../styles/desk.module.scss';
import { Button } from '@/components/console/ui/button';
import { Input } from '@/components/console/ui/input';

type Props = {
  markets: Market[];
  pauses: Loose[];
  onPause: (scope: string, key: string, reason: string) => void;
  onResume: (p: Loose) => void;
  onIncident: (kind: string, key: string, detail: string) => void;
};

const platformOptions = PLATFORMS.map((p) => ({ code: p, name: platformName(p) }));

export function PausePanel({ markets, pauses, onPause, onResume, onIncident }: Props) {
  const [scope, setScope] = useState('market');
  const [key, setKey] = useState('');
  const [why, setWhy] = useState('');
  const [kind, setKind] = useState('sensitivity');
  const [iKey, setIKey] = useState('');
  const [detail, setDetail] = useState('');
  const pauseKeys = scope === 'market' ? markets : platformOptions;
  const incidentKeys = kind === 'platform_warning' ? platformOptions : markets;

  return (
    <section aria-labelledby="h-pause">
      <h2 id="h-pause">Pause and incidents</h2>
      <p className={styles.muted}>
        A pause stops only what it names. Posts wait and publish after you resume if still inside
        their window.
      </p>
      <ul className={styles.list}>
        {!pauses.length && (
          <li>
            <span className="what">Nothing is paused.</span>
          </li>
        )}
        {pauses.map((p) => (
          <li key={`${p.scope}${p.key}`}>
            <span className="what">
              <b>{p.scope === 'global' ? 'Everything' : `${p.scope} ${p.key}`}</b>
              {p.auto && <span className={`${styles.chip} ${styles.warn}`}> paused by itself</span>}
              <small>
                {p.reason}
                {p.expiresAt ? ` · lifts ${utc(p.expiresAt)}` : ''}
              </small>
            </span>
            <Button
              variant="plain"
              className={`${styles.btn} ${styles.small}`}
              type="button"
              onClick={() => onResume(p)}
            >
              Resume
            </Button>
          </li>
        ))}
      </ul>
      <div className={`${styles.row} ${styles.end}`}>
        <div className={styles.grow}>
          <label htmlFor="pScope">Pause</label>
          <select
            id="pScope"
            value={scope}
            onChange={(e) => (setScope(e.target.value), setKey(''))}
          >
            {PAUSE_SCOPES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.grow} hidden={scope === 'global'}>
          <label htmlFor="pKey">Which one</label>
          <select
            id="pKey"
            value={key || pauseKeys[0]?.code}
            onChange={(e) => setKey(e.target.value)}
          >
            {pauseKeys.map((x) => (
              <option key={x.code} value={x.code}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
        <div className={`${styles.grow} ${styles.wide}`}>
          <label htmlFor="pWhy">Reason</label>
          <Input
            variant="plain"
            type="text"
            id="pWhy"
            placeholder="Why, in a few words"
            value={why}
            onChange={(e) => setWhy(e.target.value)}
          />
        </div>
        <Button
          variant="plain"
          className={styles.btn}
          type="button"
          onClick={() => (onPause(scope, key || pauseKeys[0]?.code, why), setWhy(''))}
        >
          Pause
        </Button>
      </div>

      <h3 style={{ marginTop: 22 }}>Report something that happened</h3>
      <div className={`${styles.row} ${styles.end}`}>
        <div className={styles.grow} style={{ flexBasis: 170 }}>
          <label htmlFor="iKind">What happened</label>
          <select id="iKind" value={kind} onChange={(e) => (setKind(e.target.value), setIKey(''))}>
            {INCIDENT_KINDS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.grow} hidden={kind === 'security_alert'}>
          <label htmlFor="iKey">Market or platform</label>
          <select
            id="iKey"
            value={iKey || incidentKeys[0]?.code}
            onChange={(e) => setIKey(e.target.value)}
          >
            {incidentKeys.map((x) => (
              <option key={x.code} value={x.code}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
        <div className={`${styles.grow} ${styles.wide}`}>
          <label htmlFor="iWhy">Details</label>
          <Input
            variant="plain"
            type="text"
            id="iWhy"
            placeholder="What happened"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <Button
          variant="plain"
          className={styles.btn}
          type="button"
          onClick={() => (onIncident(kind, iKey || incidentKeys[0]?.code, detail), setDetail(''))}
        >
          Report
        </Button>
      </div>
    </section>
  );
}
