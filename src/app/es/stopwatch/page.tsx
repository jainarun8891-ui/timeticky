import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { StopwatchClient } from '@/app/stopwatch/StopwatchClient';

const content = HUB_PAGES_ES_CONTENT['/stopwatch'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/stopwatch'
);

export default function SpanishStopwatchPage() {
  return <StopwatchClient content={content} locale="es" />;
}
