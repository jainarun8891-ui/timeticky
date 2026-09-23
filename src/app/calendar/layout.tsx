import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Printable Yearly Calendars — 2025 to 2030 with Holidays & Week Numbers",
  "Browse our interactive multi-year calendar directory. View full 12-month grids, track ISO week numbers, toggle public holidays, and print clean, ink-friendly calendars.",
  "/calendar"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
