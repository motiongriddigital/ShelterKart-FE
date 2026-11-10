import { http } from './http';
import type { ConsentMode } from '@/utils/visitSource';

/** Whether the visitor must be asked before the visit's source is kept ("required") or only told ("notice"). */
export async function getSourceConsentMode(): Promise<ConsentMode> {
  try {
    const d = await http<{ mode?: string }>('/api/source-consent', { timeoutMs: 8000 });
    return d.mode === 'notice' ? 'notice' : 'required';
  } catch {
    return 'required'; // when unsure, ask
  }
}
