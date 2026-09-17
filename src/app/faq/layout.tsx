import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Frequently Asked Questions — Help & FAQ",
  "Answers to common questions about atomic clock synchronization, IANA time zones, UTC offsets, daylight saving time, and API usage.",
  "/faq"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
