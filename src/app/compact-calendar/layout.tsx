import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Compact Year-at-a-Glance Calendar — Full 12 Months on One Screen",
  "View all 365 days of the year on a single, high-density screen. Our compact calendar grid is perfect for 90-day sprints, quarterly planning, and fast date tracking.",
  "/compact-calendar"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
