import { permanentRedirect } from 'next/navigation';

export default async function LegacySunriseSunsetCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  permanentRedirect(`/sun/${city}`);
}
