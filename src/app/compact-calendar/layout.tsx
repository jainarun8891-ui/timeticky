import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Compact Calendar View — 12-Month Year-at-a-Glance Grid",
  "Ultra-lightweight, high-density 12-month calendar grid with day-of-week alignment and instant month navigation.",
  "/compact-calendar"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
