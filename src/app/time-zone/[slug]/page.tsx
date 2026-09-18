import { permanentRedirect, notFound } from 'next/navigation';
import { TIMEZONES, getTimeZoneBySlug } from '@/lib/time/timezones';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateStaticParams() {
  return TIMEZONES.map(t => ({ slug: t.shortName.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tz = getTimeZoneBySlug(slug);
  if (!tz) return { title: 'Time Zone Not Found' };
  return buildPageMetadata(
    `${tz.name} (${tz.shortName}) Now`,
    `Current time in ${tz.name} (${tz.shortName}), UTC offset ${tz.formattedOffset}, countries using it, and DST rules.`,
    `/timezone/${tz.shortName.toLowerCase()}`
  );
}

export default async function TimeZoneDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tz = getTimeZoneBySlug(slug);
  if (!tz) notFound();

  permanentRedirect(`/timezone/${tz.shortName.toLowerCase()}`);
}

