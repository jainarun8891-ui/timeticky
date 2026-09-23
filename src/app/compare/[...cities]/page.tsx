import { permanentRedirect } from 'next/navigation';

interface Props {
  params: Promise<{
    cities: string[];
  }>;
}

export default async function CompareCitiesLegacyPage({ params }: Props) {
  const { cities } = await params;
  const path = cities && cities.length > 0 ? cities.join('/') : '';
  permanentRedirect(path ? `/converter/compare/${path}` : '/converter/compare');
}
