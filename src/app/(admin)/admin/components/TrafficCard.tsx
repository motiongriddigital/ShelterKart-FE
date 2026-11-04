'use client';
import { useState } from 'react';
import { COUNTRY } from '@/constants/admin';
import type { Analytics } from '@/types/admin';
import { Panel } from '@/components/console/kit/Panel';
import { BarList } from './BarList';
import { SegTabs } from './SegTabs';

type Tab = 'channels' | 'countries' | 'devices';

export function TrafficCard({ a }: { a: Analytics }) {
  const [tab, setTab] = useState<Tab>('channels');
  return (
    <Panel
      className="h-full"
      title="Where visitors are"
      sub="By page views. Countries come from the hosting network."
    >
      <div className="mb-3">
        <SegTabs
          label="Traffic breakdown"
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'channels', label: 'Sources' },
            { id: 'countries', label: 'Countries' },
            { id: 'devices', label: 'Devices' },
          ]}
        />
      </div>
      {tab === 'channels' && <BarList items={a.channels} />}
      {tab === 'countries' && (
        <BarList items={a.countries.slice(0, 8)} label={(x) => COUNTRY[x.key] ?? x.key} />
      )}
      {tab === 'devices' && <BarList items={a.devices} />}
    </Panel>
  );
}
