import { IS_DEMO } from '@/configs/env';
import { getT } from '@/i18n/server';

/** Without a live backend every report is a fictional sample. Say so on every screen. */
export async function DemoBanner() {
  const t = await getT();
  if (!IS_DEMO) return null;
  return (
    <div className="demo-banner" id="demoBanner" role="status">
      <strong>{t('Demo.')}</strong>{' '}
      <span id="demoBannerText">
        {t(
          'Three real projects, investigated from public sources and dated as shown. Payment is simulated: no money is taken.',
        )}
      </span>
    </div>
  );
}
