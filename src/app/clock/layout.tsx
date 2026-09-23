import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Full Screen Digital Clock — Live Online Atomic Time with Seconds",
  "View our ultra-clean, full-screen digital clock with live running seconds. Features atomic accuracy, dark mode, date display, and easy 12/24-hour toggles. Perfect for your desk, study session, or nightstand.",
  "/clock"
);

export default function ClockLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
