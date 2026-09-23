import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Time Difference Between Cities (Exact Hours & Overlap Calculator)",
  "Calculate the exact time difference between any two cities worldwide. Side-by-side live clocks, 24-hour comparative table, working hours overlap, and daylight saving time adjustments.",
  "/time-difference"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
