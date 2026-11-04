'use client';
import type { FormEvent, ReactNode } from 'react';
import type { Loose } from '@/types/desk';
import styles from '../../styles/desk.module.scss';
import { Button } from '@/components/console/ui/button';
import { Input } from '@/components/console/ui/input';

type Saved = { ok: boolean; text: string } | null;
type Props = {
  data: Loose;
  saved: Saved;
  onSpend: (f: Loose) => void;
  onCitation: (f: Loose) => void;
  onEffort: (f: Loose) => void;
  onSettings: (body: Loose, okText: string) => void;
};

/** A form that hands its fields to `onValues` as a plain object. */
function DeskForm({
  onValues,
  button,
  children,
}: {
  onValues: (f: Loose) => void;
  button: string;
  children: ReactNode;
}) {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onValues(Object.fromEntries(new FormData(e.currentTarget).entries()));
  };
  return (
    <form className={styles.formGrid} onSubmit={submit}>
      {children}
      <Button variant="plain" className={`${styles.btn} ${styles.gold}`}>
        {button}
      </Button>
    </form>
  );
}

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label>
    {label}
    {children}
  </label>
);

export function InputsPanel({ data: d, saved, onSpend, onCitation, onEffort, onSettings }: Props) {
  const markets = (any: boolean) => (
    <>
      {any && <option value="">All markets</option>}
      {d.allMarkets.map((m: Loose) => (
        <option key={m.market} value={m.market}>
          {m.name}
        </option>
      ))}
    </>
  );
  const notices: Loose[] = d.inputs.settings.legalNotices ?? [];

  return (
    <section aria-labelledby="h-in">
      <h2 id="h-in">Your inputs</h2>
      <p className={styles.muted}>
        {d.durable
          ? "Saved in the marketing desk's durable store."
          : 'Saved in memory only: the marketing desk is not running, so inputs are lost on restart.'}
      </p>

      <h3>Ad spend (Phase 1 onward)</h3>
      <DeskForm onValues={onSpend} button="Save spend">
        <Field label="Market">
          <select name="market">{markets(false)}</select>
        </Field>
        <Field label="Week starting (Monday)">
          <Input variant="plain" name="week" type="date" required />
        </Field>
        <Field label="Channel">
          <select name="channel">
            {d.channels.map((c: string) => (
              <option key={c}>{c}</option>
            ))}
            <option value="whole market">Whole market (not one channel)</option>
          </select>
        </Field>
        <Field label="Amount">
          <Input variant="plain" name="amount" type="number" min="0" step="any" required />
        </Field>
        <Field label="Currency">
          <Input variant="plain" name="currency" defaultValue="INR" maxLength={3} required />
        </Field>
      </DeskForm>

      <h3>AI-answer check (monthly)</h3>
      <DeskForm onValues={onCitation} button="Save check">
        <Field label="Month">
          <Input variant="plain" name="month" type="month" required />
        </Field>
        <Field label="Market">
          <select name="market">{markets(true)}</select>
        </Field>
        <Field label="Question asked">
          <Input variant="plain" name="query" required />
        </Field>
        <Field label="AI service">
          <Input variant="plain" name="engine" placeholder="ChatGPT" required />
        </Field>
        <Field label="Was ShelterKart cited?">
          <select name="cited">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </Field>
        <Field label="Where">
          <Input variant="plain" name="where" placeholder="Second source listed" />
        </Field>
      </DeskForm>

      <h3>Hours of effort</h3>
      <DeskForm onValues={onEffort} button="Save hours">
        <Field label="Month">
          <Input variant="plain" name="month" type="month" required />
        </Field>
        <Field label="Market">
          <select name="market">{markets(false)}</select>
        </Field>
        <Field label="Hours">
          <Input variant="plain" name="hours" type="number" min="0" max="744" step="any" required />
        </Field>
      </DeskForm>

      <details>
        <summary>
          Settings: phase, AI cost, ceilings, exchange rates, counsel, legal notices
        </summary>
        <DeskForm
          onValues={(f) => onSettings({ phase: Number(f.phase) }, 'Phase saved.')}
          button="Save phase"
        >
          <Field label="Phase">
            <select name="phase" defaultValue={d.phase}>
              <option value="0">Phase 0, organic</option>
              <option value="1">Phase 1, reinvest</option>
              <option value="2">Phase 2, compound</option>
            </select>
          </Field>
        </DeskForm>
        <DeskForm
          onValues={(f) =>
            onSettings({ aiCostMeasuredUsd: f.ai === '' ? null : Number(f.ai) }, 'AI cost saved.')
          }
          button="Save AI cost"
        >
          <Field label="Measured AI cost per paid report (US$)">
            <Input variant="plain" name="ai" type="number" min="0" step="any" />
          </Field>
        </DeskForm>
        <DeskForm
          onValues={(f) =>
            onSettings(
              {
                ceiling: {
                  market: f.market,
                  amount: Number(f.amount),
                  currency: f.currency.toUpperCase(),
                },
              },
              'Ceiling saved.',
            )
          }
          button="Save ceiling"
        >
          <Field label="Market">
            <select name="market">{markets(false)}</select>
          </Field>
          <Field label="Cost ceiling per paid report">
            <Input variant="plain" name="amount" type="number" min="0" step="any" required />
          </Field>
          <Field label="Currency">
            <Input variant="plain" name="currency" defaultValue="INR" maxLength={3} required />
          </Field>
        </DeskForm>
        <DeskForm
          onValues={(f) =>
            onSettings({ fx: { [f.cur.toUpperCase()]: Number(f.rate) } }, 'Rate saved.')
          }
          button="Save rate"
        >
          <Field label="Currency">
            <Input variant="plain" name="cur" defaultValue="USD" maxLength={3} required />
          </Field>
          <Field label="Rupees per unit">
            <Input variant="plain" name="rate" type="number" min="0" step="any" required />
          </Field>
        </DeskForm>
        <DeskForm
          onValues={(f) =>
            onSettings(
              {
                paidMarkets: f.list
                  .split(',')
                  .map((s: string) => s.trim().toUpperCase())
                  .filter(Boolean),
              },
              'List saved.',
            )
          }
          button="Save list"
        >
          <Field label="Markets you plan to pay in (codes, comma-separated)">
            <Input variant="plain" name="list" placeholder="IN, AE" />
          </Field>
        </DeskForm>
        <DeskForm
          onValues={(f) =>
            onSettings(
              { counsel: { market: f.market, decided: f.decided === 'true', note: f.note } },
              'Decision saved.',
            )
          }
          button="Save decision"
        >
          <Field label="Market">
            <select name="market">{markets(false)}</select>
          </Field>
          <Field label="Counsel's decision on the Housing ad category">
            <select name="decided">
              <option value="true">Decided</option>
              <option value="false">Not yet</option>
            </select>
          </Field>
          <Field label="Note">
            <Input variant="plain" name="note" />
          </Field>
        </DeskForm>
        <DeskForm
          onValues={(f) =>
            onSettings({ legalNotice: { note: f.note, market: f.market } }, 'Notice recorded.')
          }
          button="Record notice"
        >
          <Field label="Open a legal notice">
            <Input
              variant="plain"
              name="note"
              placeholder="Letter from a developer's lawyers about report X"
              required
            />
          </Field>
          <Field label="Market">
            <select name="market">{markets(true)}</select>
          </Field>
        </DeskForm>
        {notices.length > 0 && (
          <table>
            <tbody>
              <tr>
                <th>Legal notice</th>
                <th>Status</th>
                <th></th>
              </tr>
              {notices.map((x) => (
                <tr key={x.id}>
                  <td>{x.note}</td>
                  <td>{x.closed ? 'Closed' : 'Open'}</td>
                  <td>
                    {!x.closed && (
                      <Button
                        variant="plain"
                        className={styles.btn}
                        onClick={() =>
                          onSettings({ legalNotice: { close: x.id } }, 'Notice closed.')
                        }
                      >
                        Close notice
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </details>
      <p
        className={`${styles.msg} ${saved ? (saved.ok ? styles.okk : styles.err) : ''}`}
        role="status"
        aria-live="polite"
      >
        {saved?.text}
      </p>
    </section>
  );
}
