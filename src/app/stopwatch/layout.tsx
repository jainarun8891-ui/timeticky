import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Online Stopwatch — Millisecond Precision Lap & Split Timer (Free)",
  "Free online stopwatch with millisecond precision, split lap recorder, keyboard shortcuts (Space/L/R), and background tab resilience.",
  "/stopwatch"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
