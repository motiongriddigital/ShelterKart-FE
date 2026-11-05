import { MethodologyContent } from '@/components/content/MethodologyContent';
import { PrinciplesContent } from '@/components/content/PrinciplesContent';
import { PrivacyContent } from '@/components/content/PrivacyContent';
import { TermsContent } from '@/components/content/TermsContent';
import { Modal } from '@/components/ui/Modal';
import { DEFAULT_LANG } from '@/i18n/languages';
import { getLang, getT } from '@/i18n/server';
import { GuideModal } from './GuideModal';
import { DisputeModal } from './DisputeModal';
import { PayModal } from './PayModal';
import { ReplyModal } from './ReplyModal';
import { RestoreModal } from './RestoreModal';

// Long-form text styles for the legal dialogs: the content components render plain tags.
const PROSE =
  'text-sm leading-relaxed text-slate-700 [&_a]:text-blue-700 [&_a]:underline [&_h4]:mb-1 [&_h4]:mt-5 [&_h4]:font-bold [&_h4]:text-slate-900 [&_li]:mb-1 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:ps-5 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:ps-5';

/** The static dialogs. Their text is server-rendered; only the open/close behaviour is client-side. */
export async function SiteModals() {
  const t = await getT();
  const lang = await getLang();
  // Said only when the page is not in English.
  const note = lang !== DEFAULT_LANG && (
    <p className="mb-3 rounded-md bg-amber-50 p-2 text-xs text-amber-900">
      {t('This text is available in English only. The English version governs.')}
    </p>
  );
  const legal = (id: Parameters<typeof Modal>[0]['id'], title: string, body: React.ReactNode) => (
    <Modal id={id} title={title} wide>
      <div className={PROSE}>
        {note}
        {body}
      </div>
    </Modal>
  );
  return (
    <>
      <GuideModal />
      <PayModal />
      <RestoreModal />
      <DisputeModal />
      <ReplyModal />
      {legal('principlesModal', t('Our Principles'), <PrinciplesContent />)}
      {legal('tncModal', t('Terms & Conditions'), <TermsContent />)}
      {legal('privacyModal', t('Privacy Policy'), <PrivacyContent />)}
      {legal('methodModal', t('How a report is built'), <MethodologyContent />)}
    </>
  );
}
