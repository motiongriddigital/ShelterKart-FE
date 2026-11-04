'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { adminErrorMessage } from '@/app/_api/adminPeople';
import { useConsoleData } from '@/store/consoleData';
import { SegTabs } from '@/app/(admin)/admin/components/SegTabs';
import { btn, input } from '../kit/Panel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type Kind = 'account' | 'ip';
const IP_RE = /^(\d{1,3}\.){3}\d{1,3}(\/(\d|[12]\d|3[0-2]))?$/;
const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DURATIONS = [
  { v: '1', l: '24 hours' },
  { v: '7', l: '7 days' },
  { v: '30', l: '30 days' },
  { v: '0', l: 'Until lifted' },
];

export function BanDialog({
  open,
  onOpenChange,
  kind: initialKind = 'ip',
  target: initialTarget = '',
  sessionId,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  kind?: Kind;
  target?: string;
  sessionId?: string;
}) {
  const banAccount = useConsoleData((s) => s.banAccount);
  const banIp = useConsoleData((s) => s.banIp);
  const banSessionIp = useConsoleData((s) => s.banSessionIp);
  const live = useConsoleData((s) => s.live);
  const viaSession = Boolean(sessionId) && live;
  const [busy, setBusy] = useState(false);
  const [kind, setKind] = useState<Kind>(initialKind);
  const [target, setTarget] = useState(initialTarget);
  const [reason, setReason] = useState('');
  const [days, setDays] = useState('30');
  const [error, setError] = useState('');

  const submit = async () => {
    const t = target.trim();
    if (kind === 'ip' && !viaSession && !IP_RE.test(t))
      return setError('Enter an IPv4 address or a range such as 185.220.101.0/24.');
    if (kind === 'account' && !MAIL_RE.test(t))
      return setError('Enter the account’s e-mail address.');
    if (reason.trim().length < 8)
      return setError('Say why, in at least a few words. It is kept in the audit trail.');
    const d = days === '0' ? null : Number(days);
    setBusy(true);
    try {
      if (viaSession && sessionId) await banSessionIp(sessionId, reason.trim(), d);
      else if (kind === 'ip') await banIp(t, reason.trim(), d);
      else await banAccount(t.toLowerCase(), reason.trim(), d);
      toast.success(kind === 'ip' ? `Banned ${t}` : `Banned ${t}; its sessions ended`);
      setError('');
      setReason('');
      onOpenChange(false);
    } catch (e) {
      setError(adminErrorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add a ban</DialogTitle>
          <DialogDescription>
            A banned account cannot sign in and its sessions end at once. A banned address is
            refused on every route.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <SegTabs
            label="What to ban"
            value={kind}
            onChange={(k) => {
              setKind(k);
              setError('');
            }}
            tabs={[
              { id: 'ip', label: 'IP address' },
              { id: 'account', label: 'Account' },
            ]}
          />
          <div>
            <label htmlFor="ban-target" className="label-quiet mb-1 block">
              {viaSession
                ? 'Address of this session (shown as a short code)'
                : kind === 'ip'
                  ? 'IP address or range'
                  : 'Account e-mail'}
            </label>
            <Input
              variant="plain"
              id="ban-target"
              className={input}
              value={target}
              readOnly={viaSession}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={kind === 'ip' ? '185.220.101.0/24' : 'name@example.com'}
            />
          </div>
          <div>
            <label htmlFor="ban-reason" className="label-quiet mb-1 block">
              Reason
            </label>
            <textarea
              id="ban-reason"
              className={`${input} h-20 py-2`}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ban-days" className="label-quiet mb-1 block">
              For how long
            </label>
            <select
              id="ban-days"
              className={input}
              value={days}
              onChange={(e) => setDays(e.target.value)}
            >
              {DURATIONS.map((d) => (
                <option key={d.v} value={d.v}>
                  {d.l}
                </option>
              ))}
            </select>
          </div>
          <p role="alert" className="min-h-5 text-ui text-status-down-text">
            {error}
          </p>
        </div>
        <DialogFooter>
          <Button variant="plain" className={btn} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="plain"
            className="pressable inline-flex h-8 items-center rounded-md bg-status-down px-3 text-ui font-medium text-white transition-opacity hover:opacity-90"
            disabled={busy}
            onClick={() => void submit()}
          >
            Ban
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
