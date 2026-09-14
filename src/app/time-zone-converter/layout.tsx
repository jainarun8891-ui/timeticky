import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Time Zone Converter — Convert Times Between Global Zones",
  "Interactive 24-hour slider time zone converter with automatic day-shift detection and multi-city synchronization.",
  "/time-zone-converter"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
