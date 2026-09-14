import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Time Zone Science & Horology Knowledge Hub — GlobalTime",
  "In-depth guides on atomic timekeeping, UTC vs GMT differences, daylight saving history, and circadian travel science.",
  "/learn"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
