import type { Metadata } from 'next';
import { ThemeApplier } from '@/components/console/ThemeApplier';
import { BASE_METADATA } from '@/configs/metadata';
import '@/styles/tokens.scss';
import './admin/styles/console.css';
import './admin/styles/admin.scss';

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: 'ShelterKart — Admin',
  robots: { index: false, follow: false },
};

const BEFORE_PAINT = `try{var m=localStorage.getItem('sk-admin-theme');var d=m==='dark'||(m!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark'}}catch(e){}`;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BEFORE_PAINT }} />
      </head>
      <body suppressHydrationWarning>
        <ThemeApplier />
        {children}
      </body>
    </html>
  );
}
