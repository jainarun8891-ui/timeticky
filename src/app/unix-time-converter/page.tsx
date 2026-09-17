import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { UnixConverterClient } from './UnixConverterClient';

export const metadata: Metadata = buildPageMetadata(
  "Unix Timestamp Converter — Epoch to Readable Date & Live Milliseconds | TimeNumbers",
  "Convert Unix timestamp seconds to readable human date, parse ISO 8601 strings, and copy live epoch milliseconds. Understand UTC vs GMT and the Year 2038 problem.",
  "/unix-time-converter"
);

export default function UnixTimeConverterPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{"name":"Unix Time","url":"/unix-time"},{"name":"Converter","url":"/unix-time-converter"}]} />
      <UnixConverterClient />
    </div>
  );
}
