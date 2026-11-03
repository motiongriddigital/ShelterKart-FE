import type { Metadata } from 'next';
import { MarketingDesk } from './components/MarketingDesk';

export const metadata: Metadata = { title: 'Marketing dashboard' };

export default function MarketingPage() {
  return <MarketingDesk />;
}
