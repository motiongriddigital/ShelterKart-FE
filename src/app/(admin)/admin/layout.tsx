import { AdminShell } from '@/components/console/AdminShell';
import { RequireAdminSession } from '@/guards/RequireAdminSession';
import { LoginScreen } from './components/LoginScreen';

export default function AdminSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAdminSession fallback={<LoginScreen />}>
      <AdminShell>{children}</AdminShell>
    </RequireAdminSession>
  );
}
