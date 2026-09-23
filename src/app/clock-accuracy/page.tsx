import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { ClockAccuracyClient } from './ClockAccuracyClient';

const content = HUB_PAGES_CUSTOM_CONTENT['/clock-accuracy'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/clock-accuracy'
);

export default function ClockAccuracyPage() {
  return <ClockAccuracyClient content={content} />;
}
