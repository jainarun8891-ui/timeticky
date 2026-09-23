import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { ClockClient } from './ClockClient';

const content = HUB_PAGES_CUSTOM_CONTENT['/clock'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/clock'
);

export default function ClockPage() {
  return <ClockClient content={content} />;
}
