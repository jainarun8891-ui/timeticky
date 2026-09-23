import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Compare Cities Time Difference: Multi-City World Clock & Overlap",
  "Side-by-side time difference calculator for global cities. Compare local times, working business hours overlap, and daylight saving status for up to 10 cities.",
  "/compare"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
