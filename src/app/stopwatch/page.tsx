import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { StopwatchClient } from './StopwatchClient';

const content = HUB_PAGES_CUSTOM_CONTENT['/stopwatch'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/stopwatch'
);

export default function StopwatchPage() {
  return <StopwatchClient content={content} />;
}
