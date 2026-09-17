import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Time Zone Converter — Global Zones",
  "Interactive multi-city time zone converter with automatic daylight saving time computation, 24-hour sliders, and meeting overlap calculation.",
  "/time-zone-converter"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
