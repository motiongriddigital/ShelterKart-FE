import { MethodologyContent } from '@/components/content/MethodologyContent';
import { PrinciplesContent } from '@/components/content/PrinciplesContent';
import { PrivacyContent } from '@/components/content/PrivacyContent';
import { TermsContent } from '@/components/content/TermsContent';
import { Modal } from '@/components/ui/Modal';
import { getT } from '@/i18n/server';
import { DisputeModal } from './DisputeModal';
import { GuideModal } from './GuideModal';
import { PayModal } from './PayModal';
import { ReplyModal } from './ReplyModal';
import { RestoreModal } from './RestoreModal';

/** The static dialogs. Their text is server-rendered; only the open/close behaviour is client-side. */
export async function HomeModals() {
  const t = await getT();
  // Shown only when the page is not in English (see .lang-en-only in the home styles).
  const note = (
    <p className="lang-en-only">
      {t('This text is available in English only. The English version governs.')}
    </p>
  );
  return (
    <>
      <GuideModal />
      <PayModal />
      <RestoreModal />
      <DisputeModal />
      <ReplyModal />
      <Modal id="principlesModal" title={t('Our Principles')} wide>
        <div className="tnc-body">
          {note}
          <PrinciplesContent />
        </div>
      </Modal>
      <Modal id="tncModal" title={t('Terms & Conditions')} wide>
        <div className="tnc-body">
          {note}
          <TermsContent />
        </div>
      </Modal>
      <Modal id="privacyModal" title={t('Privacy Policy')} wide>
        <div className="tnc-body">
          {note}
          <PrivacyContent />
        </div>
      </Modal>
      <Modal id="methodModal" title={t('How a report is built')} wide>
        <div className="tnc-body">
          {note}
          <MethodologyContent />
        </div>
      </Modal>
    </>
  );
}
