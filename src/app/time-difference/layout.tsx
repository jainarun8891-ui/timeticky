import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Time Difference Calculator & Matrix",
  "Calculate the exact hour and minute time difference between world cities with live side-by-side chronometers.",
  "/time-difference"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
