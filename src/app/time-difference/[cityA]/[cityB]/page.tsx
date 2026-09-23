import { permanentRedirect, notFound } from 'next/navigation';
import { findCityByRootSlug, getCityRootSlug } from '@/lib/geo/city-lookup';

interface Props {
  params: Promise<{ cityA: string; cityB: string }>;
}

export default async function TimeDifferencePairLegacyPage({ params }: Props) {
  const { cityA: slugA, cityB: slugB } = await params;
  const cityA = findCityByRootSlug(slugA);
  const cityB = findCityByRootSlug(slugB);

  if (!cityA || !cityB) {
    notFound();
  }

  const cleanA = getCityRootSlug(cityA);
  const cleanB = getCityRootSlug(cityB);
  permanentRedirect(`/converter/difference/${cleanA}-to-${cleanB}`);
}
