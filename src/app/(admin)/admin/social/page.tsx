import type { Metadata } from 'next';
import { SocialDesk } from './components/SocialDesk';

export const metadata: Metadata = { title: 'Marketing desk' };

export default function SocialPage() {
  return <SocialDesk />;
}
