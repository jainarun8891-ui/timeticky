import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { FaqClient } from '@/app/faq/FaqClient';

const content = HUB_PAGES_ES_CONTENT['/faq'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/faq',
  'es'
);

export default function MasterFaqPageEs() {
  return <FaqClient content={content} locale="es" />;
}
