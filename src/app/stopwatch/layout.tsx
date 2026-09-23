import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Online Stopwatch with Lap Times — Millisecond Precision",
  "Use our highly accurate online stopwatch with lap and split times. Features millisecond precision, exportable data, keyboard shortcuts, and zero time drift.",
  "/stopwatch"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
