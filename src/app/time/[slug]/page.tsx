import { permanentRedirect, notFound } from 'next/navigation';
import { getCityBySlug, getAllCities } from '@/lib/geo/cities';
import { findCityByRootSlug, getCityRootSlug } from '@/lib/geo/city-lookup';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateStaticParams() {
  return getAllCities().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug) || findCityByRootSlug(slug);
  if (!city) return { title: 'Location Not Found' };
  const rootSlug = getCityRootSlug(city);
  const title = `Time in ${city.name}, ${city.country} Now`;
  const desc = `Current local time in ${city.name}, ${city.country}. Timezone: ${city.timezone}, UTC offset, sunrise, sunset, and daylight hours.`;
  return buildPageMetadata(title, desc, `/${rootSlug}`);
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug) || findCityByRootSlug(slug);
  if (!city) notFound();

  permanentRedirect(`/${getCityRootSlug(city)}`);
}

