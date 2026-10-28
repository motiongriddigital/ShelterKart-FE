import { RequireAdminSession } from '@/guards/RequireAdminSession';
import { Dashboard } from './components/Dashboard';
import { LoginScreen } from './components/LoginScreen';

export default function AdminPage() {
  return (
    <RequireAdminSession fallback={<LoginScreen />}>
      <Dashboard />
    </RequireAdminSession>
  );
}
