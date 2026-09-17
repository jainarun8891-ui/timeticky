import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  "Embeddable World Clock Widgets",
  "Customizable iframe and HTML widgets for embedding live digital, analog, and multi-city world clocks on your website or blog.",
  "/widgets"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
