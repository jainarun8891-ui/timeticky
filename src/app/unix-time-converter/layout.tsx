import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Unix Timestamp Converter — Epoch to Human Date & ISO 8601",
  "Convert Unix timestamps in seconds or milliseconds to human-readable local time, UTC, and ISO 8601 format instantly.",
  "/unix-time-converter"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
