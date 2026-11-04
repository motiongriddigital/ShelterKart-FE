'use client';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { useSocialDesk } from '@/hooks/useSocialDesk';
import { DeskShell } from '../../components/DeskShell';
import { AuditPanel } from './AuditPanel';
import { FactsPanel } from './FactsPanel';
import { PackPanel } from './PackPanel';
import { PausePanel } from './PausePanel';
import { QueuePanel } from './QueuePanel';
import { StatusPanel } from './StatusPanel';
import { Button } from '@/components/console/ui/button';
import { dk, tone } from '@/app/(admin)/admin/styles/ui';
import { cn } from '@/utils/cn';

export function SocialDesk() {
  const { toast, show } = useToast();
  const desk = useSocialDesk(show);
  const live = desk.status?.desk.mode === 'live';
  const [week, setWeek] = useState('');

  return (
    <DeskShell
      title="ShelterKart · Marketing desk"
      toast={toast}
      actions={
        <>
          <span className={`${dk.pill}${live ? ` ${tone.ok}` : ''}`}>
            {desk.unavailable
              ? 'Unavailable'
              : !desk.status
                ? 'Loading…'
                : live
                  ? 'Live: posting for real'
                  : 'Dry run: nothing is posted'}
          </span>
          <Button
            variant="plain"
            className={cn(dk.btn, desk.paused ? dk.gold : dk.danger)}
            type="button"
            onClick={desk.togglePauseAll}
          >
            {desk.paused ? 'Resume everything' : 'Pause everything'}
          </Button>
        </>
      }
    >
      <StatusPanel status={desk.status} unavailable={desk.unavailable} paused={desk.paused} />
      <QueuePanel queue={desk.queue} onVeto={desk.veto} />
      <PackPanel
        nextWeek={desk.status?.nextWeek}
        week={week}
        onWeek={setWeek}
        onChanged={desk.refresh}
        notify={show}
        setBusy={desk.setBusy}
      />
      <FactsPanel markets={desk.markets} topics={desk.status?.topicList ?? []} notify={show} />
      <PausePanel
        markets={desk.markets}
        pauses={desk.status?.desk.pauses ?? []}
        onPause={desk.pause}
        onResume={desk.resume}
        onIncident={desk.reportIncident}
      />
      <AuditPanel audit={desk.audit} />
    </DeskShell>
  );
}
