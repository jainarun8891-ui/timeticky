import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Online Digital Clock with Seconds",
  "What time is it right now? Check exact time with seconds synchronized with atomic clock. Minimalist precision digital clock with 12/24 hour display and full screen mode.",
  "/clock"
);

export default function ClockLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
