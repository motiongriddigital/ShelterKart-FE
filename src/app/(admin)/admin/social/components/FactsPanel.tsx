'use client';
import { useState } from 'react';
import { useFactsDesk } from '@/hooks/useFactsDesk';
import type { Loose, Market } from '@/types/desk';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/console/ui/input';
import { dk } from '@/app/(admin)/admin/styles/ui';
import { cn } from '@/utils/cn';

type Props = {
  markets: Market[];
  topics: { id: string; title: string }[];
  notify: (text: string, bad?: boolean) => void;
};

export function FactsPanel({ markets, topics, notify }: Props) {
  const f = useFactsDesk(notify);
  const [market, setMarket] = useState('');
  const [topic, setTopic] = useState('');
  const [url, setUrl] = useState('');
  const m = market || markets[0]?.code || '';
  const t = topic || topics[0]?.id || '';

  return (
    <section aria-labelledby="h-facts">
      <h2 id="h-facts">The facts behind the posts</h2>
      <p className={dk.muted}>{f.summary}</p>
      <p className={dk.muted}>
        Every post restates a verified fact word for word. Add an official page, the keeper reads it
        and drafts facts with the exact words from the page, and you verify or reject each one.
      </p>
      <div className={cn(dk.row, dk.end)}>
        <div className={dk.grow}>
          <label htmlFor="kMarket">Market</label>
          <select id="kMarket" value={m} onChange={(e) => setMarket(e.target.value)}>
            {markets.map((x) => (
              <option key={x.code} value={x.code}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
        <div className={cn(dk.grow, dk.growWide)}>
          <label htmlFor="kTopic">Topic</label>
          <select id="kTopic" value={t} onChange={(e) => setTopic(e.target.value)}>
            {topics.map((x) => (
              <option key={x.id} value={x.id}>
                {x.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label htmlFor="kUrl">Official page address (https)</label>
      <Input
        variant="plain"
        type="text"
        id="kUrl"
        placeholder="https://…"
        inputMode="url"
        autoComplete="off"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className={dk.row} style={{ marginTop: 10 }}>
        <Button
          variant="plain"
          className={dk.btn}
          type="button"
          onClick={async () => (await f.addAddress(m, t, url)) && setUrl('')}
        >
          Add this address and read it now
        </Button>
      </div>
      <p className={dk.muted} role="status" aria-live="polite">
        {f.message}
      </p>

      <h3 style={{ marginTop: 18 }}>Waiting for your check</h3>
      {!f.drafts.length && <p className={dk.muted}>Nothing is waiting.</p>}
      {f.drafts.map((i: Loose) => (
        <details className={dk.post} key={i.id}>
          <summary>
            <span className={dk.what}>
              <b>{i.market}</b> · {i.topic} <small dir="auto">{i.statement.slice(0, 110)}</small>
            </span>
          </summary>
          <div className={dk.postBody}>
            <div className={dk.text} dir="auto">
              {i.statement}
            </div>
            <div className={dk.meta}>
              <b>The words on the page:</b> <span dir="auto">{i.evidence?.quote ?? ''}</span>
            </div>
            <div className={dk.meta}>
              <b>Source:</b>{' '}
              <a href={i.source.url} target="_blank" rel="noopener noreferrer">
                {i.source.name}
              </a>
              , read {i.checkedOn}
            </div>
            <div className={dk.controls}>
              <Button
                variant="plain"
                className={cn(dk.btn, dk.gold, dk.small)}
                type="button"
                onClick={() => f.verify(i.id)}
              >
                Verify this fact
              </Button>
              <Button
                variant="plain"
                className={cn(dk.btn, dk.small)}
                type="button"
                onClick={() => f.reject(i.id)}
              >
                Reject
              </Button>
            </div>
          </div>
        </details>
      ))}

      <h3 style={{ marginTop: 18 }}>Translations waiting for a native speaker</h3>
      {!f.translations.length && <p className={dk.muted}>Nothing is waiting.</p>}
      {f.translations.map(({ fact, lang }) => (
        <details className={dk.post} key={`${fact.id}${lang}`}>
          <summary>
            <span className={dk.what}>
              <b>{fact.market}</b> · {lang}
            </span>
          </summary>
          <div className={dk.postBody}>
            <div className={dk.text} dir="auto">
              {fact.translations[lang].text}
            </div>
            <div className={dk.meta}>
              <b>Back in English:</b> {fact.translations[lang].backEn}
            </div>
            <div className={dk.controls}>
              <Button
                variant="plain"
                className={cn(dk.btn, dk.gold, dk.small)}
                type="button"
                onClick={() => f.approveTranslation(fact.id, lang)}
              >
                Approve this translation
              </Button>
            </div>
          </div>
        </details>
      ))}
    </section>
  );
}
