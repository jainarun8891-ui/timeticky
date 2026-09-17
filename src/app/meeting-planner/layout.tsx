import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "World Meeting Planner — Time Overlap",
  "Find the best time for international video calls and meetings across multiple time zones with business-hour overlap visualization.",
  "/meeting-planner"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
