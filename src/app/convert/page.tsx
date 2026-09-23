import { permanentRedirect } from 'next/navigation';

export default function ConvertLegacyPage() {
  permanentRedirect('/converter');
}
