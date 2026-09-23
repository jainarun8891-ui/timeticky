import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Embeddable TimeNumbers Widget',
  robots: {
    index: false,
    follow: true,
  },
};

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
