import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "World Calendar & Gregorian Yearly Overview — TimeNumbers",
  "Interactive yearly calendar with month overview, leap year calculations, week numbers, and printable schedule grid.",
  "/calendar"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
