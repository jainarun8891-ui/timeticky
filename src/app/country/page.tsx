import { permanentRedirect } from 'next/navigation';

export default function LegacyCountryDirectoryPage() {
  permanentRedirect('/countries');
}
