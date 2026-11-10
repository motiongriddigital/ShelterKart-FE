'use client';
import { useEffect } from 'react';
import { track } from '@/services/track';

/** Counts the visit once per page load (first-party; nothing is sent in demo mode). */
export function PageViewTracker() {
  useEffect(() => track('page_view'), []);
  return null;
}
