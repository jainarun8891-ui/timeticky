import { permanentRedirect } from 'next/navigation';

export default function LegacySunriseSunsetPage() {
  permanentRedirect('/sun');
}
