import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { ClockAccuracyClient } from '@/app/clock-accuracy/ClockAccuracyClient';

const content = HUB_PAGES_ES_CONTENT['/clock-accuracy'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/clock-accuracy'
);

export default function SpanishClockAccuracyPage() {
  return <ClockAccuracyClient content={content} locale="es" />;
}
