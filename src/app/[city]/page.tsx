import { notFound, permanentRedirect } from 'next/navigation';
import { findCityByRootSlug, getCityRootSlug } from '@/lib/geo/city-lookup';
import { getAllCities } from '@/lib/geo/cities';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllCities().map((c) => ({ city: getCityRootSlug(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);
  if (!city) return buildPageMetadata('City Not Found', 'City not found.', `/time/${rawSlug}`);

  const cleanSlug = getCityRootSlug(city);
  return buildPageMetadata(
    `What Time is it in ${city.name}? Exact Local Time Now`,
    `What time is it in ${city.name}, ${city.country} right now? Live digital clock with seconds, ${city.timezone} time zone, UTC offset.`,
    `/time/${cleanSlug}`
  );
}

export default async function RootCityRedirectPage({ params }: Props) {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);

  if (!city) {
    notFound();
  }

  const cleanSlug = getCityRootSlug(city);
  permanentRedirect(`/time/${cleanSlug}`);
}
