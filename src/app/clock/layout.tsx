import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Online Digital Clock with Seconds: Exact Time Now (Fullscreen & 24h)",
  "Exact time now with seconds synchronized with atomic clock standards. High-contrast fullscreen online digital clock with 12/24 hour toggle, dark mode, and zero drift.",
  "/clock"
);

export default function ClockLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
