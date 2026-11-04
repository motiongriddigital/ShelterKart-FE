import type { Metadata } from 'next';
import { BASE_METADATA } from '@/configs/metadata';
import '@/styles/tokens.scss';
import './admin/styles/console.css';
import './admin/styles/admin.scss';

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: 'ShelterKart — Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
