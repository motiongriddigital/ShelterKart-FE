'use client';
import { useState } from 'react';
import type { DashboardData } from '@/types/admin';
import { DisputesQueue, HeldQueue, ResponsesQueue } from './ReviewQueues';
import { Panel } from '@/components/console/kit/Panel';
import { SegTabs } from './SegTabs';

type Tab = 'disputes' | 'held' | 'replies';

export function NeedsAPerson({
  data,
  onResolve,
  onRelease,
  onReview,
}: {
  data: DashboardData;
  onResolve: (id: string) => void;
  onRelease: (ref: string) => void;
  onReview: (id: string, action: 'approve' | 'reject') => void;
}) {
  const counts = {
    disputes: data.disputes.length,
    held: data.held?.held.length ?? 0,
    replies: data.responses.length,
  };
  const first = (['disputes', 'held', 'replies'] as Tab[]).find((t) => counts[t] > 0) ?? 'disputes';
  const [tab, setTab] = useState<Tab>(first);
  const total = counts.disputes + counts.held + counts.replies;
  return (
    <Panel
      className="h-full"
      title="Needs a person"
      sub={total ? `${total} waiting for a decision.` : 'Nothing is waiting for a decision.'}
    >
      <div className="mb-3">
        <SegTabs
          label="Review queues"
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'disputes', label: 'Inaccuracies', count: counts.disputes },
            { id: 'held', label: 'Held', count: counts.held },
            { id: 'replies', label: 'Replies', count: counts.replies },
          ]}
        />
      </div>
      <div className="max-h-[170px] overflow-y-auto pr-1">
        {tab === 'disputes' && <DisputesQueue rows={data.disputes} onResolve={onResolve} />}
        {tab === 'held' && <HeldQueue held={data.held} onRelease={onRelease} />}
        {tab === 'replies' && <ResponsesQueue rows={data.responses} onReview={onReview} />}
      </div>
    </Panel>
  );
}
