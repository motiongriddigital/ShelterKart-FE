'use client';
import { BookOpen, Download, Share2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/Button';
import { useGuide } from '@/hooks/useGuide';
import { useT } from '@/hooks/useT';

export function GuideCard() {
  const t = useT();
  const { openGuide, downloadGuide, shareHref, trackShare } = useGuide();

  return (
    <section className="px-4 pb-10 md:px-8">
      <div className="mx-auto grid max-w-3xl gap-5 rounded-xl border border-slate-200 border-s-4 border-s-blue-700 bg-white p-5 shadow-md md:grid-cols-[1fr_auto] md:items-center md:p-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700">
            {t('Free public edition')}
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {t('The ShelterKart Home Buying Guide')}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {t(
              'What to check, what to ask, and what a good answer sounds like. 12 comprehensive chapters with zero marketing fluff, free for any property market.',
            )}
          </p>
          <p className="mt-3 text-[11px] text-slate-400">{t('The guide is in English.')}</p>
        </div>

        <div className="flex flex-col gap-2 md:w-48">
          <Button onClick={() => openGuide()}>
            <BookOpen className="size-4" aria-hidden="true" />
            {t('Read the guide')}
          </Button>
          <Button variant="outline" onClick={downloadGuide}>
            <Download className="size-4" aria-hidden="true" />
            {t('Download PDF')}
          </Button>
          <a
            className={buttonVariants({ variant: 'outline' })}
            href="https://wa.me/?text="
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.currentTarget.href = shareHref(); // the address is only known in the browser
              trackShare('home');
            }}
          >
            <Share2 className="size-4" aria-hidden="true" />
            {t('Share the question card')}
          </a>
        </div>
      </div>
    </section>
  );
}
