import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { FaqClient } from './FaqClient';

const content = HUB_PAGES_CUSTOM_CONTENT['/faq'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/faq'
);

export default function MasterFaqPage() {
  return <FaqClient content={content} />;
}
