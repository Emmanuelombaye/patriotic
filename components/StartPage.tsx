'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import IntakeQuiz from '@/components/IntakeQuiz';
import type { Locale } from '@/lib/types';

type StartPageProps = {
  locale: Locale;
};

export default function StartPage({ locale }: StartPageProps) {
  const router = useRouter();
  const finishQuiz = useCallback(() => router.push('/'), [router]);

  return (
    <div className="start-page-container">
      <IntakeQuiz
        isOpen
        onClose={finishQuiz}
        locale={locale}
        dismissible={false}
      />
    </div>
  );
}
