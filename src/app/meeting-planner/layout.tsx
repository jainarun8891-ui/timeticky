import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "World Meeting Planner: International Meeting Time Zone Planner (Free)",
  "Find the optimal meeting time across multiple time zones. Interactive working hours overlap grid, automatic timezone conversions, and 1-click calendar export.",
  "/meeting-planner"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
