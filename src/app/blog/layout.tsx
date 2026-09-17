import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "TimeNumbers Chronometry Insights & Engineering Blog",
  "Articles and technical guides exploring time zone standards, leap seconds, NTP network protocol, and global scheduling.",
  "/blog"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
