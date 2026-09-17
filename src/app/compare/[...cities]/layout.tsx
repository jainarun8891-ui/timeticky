import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  'Multi-City Time Comparison — Compare Live Hours & Time Zones | TimeNumbers',
  'Compare live current times across multiple world cities simultaneously. View side-by-side time difference, day/night status, and overlapping business hours.',
  '/compare'
);

export default function CompareCitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
