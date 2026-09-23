import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Check Clock Accuracy — Test Device Time Drift & Sync",
  "Is your computer or phone clock fast or slow? Check your exact device time drift against official atomic time down to the millisecond, and learn how to fix it.",
  "/clock-accuracy"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
