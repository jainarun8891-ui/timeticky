import { permanentRedirect } from 'next/navigation';

interface Props {
  params: Promise<{
    combo: string;
  }>;
}

export default async function ConvertComboLegacyPage({ params }: Props) {
  const { combo } = await params;
  permanentRedirect(`/converter/${combo}`);
}
