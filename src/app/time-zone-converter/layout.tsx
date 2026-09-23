import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Time Zone Converter: Convert Time Zones & Meeting Planner (Live 24h Table)",
  "Free multi-city time zone converter. Convert time between world zones with live 24-hour visual slider, automatic daylight saving time (DST), and meeting overlap.",
  "/time-zone-converter"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
