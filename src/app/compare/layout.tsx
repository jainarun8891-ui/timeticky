import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Compare World Cities Time Difference",
  "Side-by-side time comparison matrix for global metropolitan centers with business meeting overlap windows.",
  "/compare"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
