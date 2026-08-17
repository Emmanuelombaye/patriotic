import { redirect } from 'next/navigation';
import { isTreatmentId } from '@/lib/treatments';
import TreatmentPageClient from './TreatmentPageClient';

type TreatmentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TreatmentPage({ params }: TreatmentPageProps) {
  const { id } = await params;
  if (!isTreatmentId(id)) {
    redirect('/');
  }
  return <TreatmentPageClient />;
}
