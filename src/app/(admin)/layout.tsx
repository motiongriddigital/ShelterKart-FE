import type { Metadata } from 'next';
import { fontVariables } from '@/configs/fonts';
import '@/styles/tokens.scss';
import './admin/styles/admin.scss';

export const metadata: Metadata = {
  title: 'ShelterKart — Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
