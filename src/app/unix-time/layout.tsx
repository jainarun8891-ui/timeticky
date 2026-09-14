import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Live Unix Timestamp Clock — Current Epoch Time in Seconds",
  "Real-time ticking Unix epoch timestamp counter in seconds and milliseconds with copy-to-clipboard and atomic synchronization.",
  "/unix-time"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
