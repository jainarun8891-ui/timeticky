import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Online Stopwatch — Precision Split Timer",
  "High-precision browser stopwatch with split lap tracking, pause and resume, background tab resilience, and zero drift.",
  "/stopwatch"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
