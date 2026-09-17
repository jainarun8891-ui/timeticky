import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Compact Calendar — Year Overview",
  "High-density 12-month calendar grid with day-of-week alignment, quarterly milestones, and ISO-8601 week number tracking.",
  "/compact-calendar"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
