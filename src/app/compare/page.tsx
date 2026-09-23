import { permanentRedirect } from 'next/navigation';

export default function CompareLegacyPage() {
  permanentRedirect('/converter/compare');
}
