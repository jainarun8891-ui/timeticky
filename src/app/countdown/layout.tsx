import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Online Event Countdown Timer",
  "Create custom precision event countdowns with live seconds, shareable links, and full-screen presentation mode for holidays and milestones.",
  "/countdown"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
