import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { CalendarClient } from './CalendarClient';

const content = HUB_PAGES_CUSTOM_CONTENT['/calendar'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/calendar'
);

export default function CalendarPage() {
  return <CalendarClient content={content} />;
}
