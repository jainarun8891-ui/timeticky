import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Clock Accuracy Test — Browser Drift Check",
  "Check if your computer clock is accurate with millisecond precision against official atomic time. Diagnose clock drift, NTP synchronization, and fast or slow system time.",
  "/clock-accuracy"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
