import React from 'react';
import { Metadata } from 'next';
import { FullscreenClockClient } from './FullscreenClockClient';

export const metadata: Metadata = {
  title: 'Full Screen Digital Clock — Distraction-Free Kiosk & Office Display',
  description: 'Full-screen precision online digital clock. Auto-hiding controls, high-contrast typography, millisecond precision, and keyboard shortcuts for meetings, classrooms, and kiosks.',
  alternates: {
    canonical: 'https://www.timenumbers.com/fullscreen-clock',
  },
  openGraph: {
    title: 'Full Screen Clock — TimeNumbers',
    description: 'Clean full screen clock display with auto-hiding controls and dark mode.',
    url: 'https://www.timenumbers.com/fullscreen-clock',
  },
};

export default function FullscreenClockPage() {
  return <FullscreenClockClient />;
}
