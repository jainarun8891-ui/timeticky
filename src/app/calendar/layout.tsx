import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Calendar 2026: Printable Monthly & Yearly Calendar with Holidays",
  "Free online and printable 2026 calendar with national holidays, ISO week numbers, monthly overview, and leap year calculations. Clean, ad-free desk planner.",
  "/calendar"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
