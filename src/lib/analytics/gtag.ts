import { siteConfig } from '@/lib/config/site.config';

export const GA_TRACKING_ID = siteConfig.googleAnalyticsId || 'G-P2PKYW5TRP';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Checks if Google Analytics gtag is loaded and ready
 */
export const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Log standard pageview with optional custom title and content group
 */
export const trackPageView = (url: string, title?: string, contentGroup?: string) => {
  if (!isGAAvailable()) return;

  const params: Record<string, any> = {
    page_path: url,
    page_location: window.location.href,
  };

  if (title) params.page_title = title;
  if (contentGroup) params.content_group = contentGroup;

  window.gtag!('config', GA_TRACKING_ID, params);
};

/**
 * Generic custom event tracker
 */
export const trackEvent = (action: string, params: Record<string, any> = {}) => {
  if (!isGAAvailable()) return;
  window.gtag!('event', action, params);
};

/**
 * KEY EVENT: Search
 * Powers GA4 standard "Search Terms" report
 */
export const trackSearch = (searchTerm: string, resultCount?: number) => {
  if (!searchTerm.trim()) return;
  trackEvent('search', {
    search_term: searchTerm.trim(),
    results_found: resultCount,
  });
};

/**
 * KEY EVENT: Search item selection
 */
export const trackSearchResultClick = (item: {
  title: string;
  type: string;
  slug: string;
}) => {
  trackEvent('select_content', {
    content_type: item.type,
    item_id: item.slug,
    item_name: item.title,
  });
};

/**
 * KEY EVENT: City page view (Trending Cities analysis)
 */
export const trackCityView = (city: {
  name: string;
  country: string;
  timezone: string;
  slug: string;
}) => {
  trackEvent('view_item', {
    item_id: city.slug,
    item_name: city.name,
    item_category: 'city_time',
    country: city.country,
    timezone: city.timezone,
  });
};

/**
 * KEY EVENT: Timezone page view
 */
export const trackTimezoneView = (tz: {
  name: string;
  shortName: string;
  offset: string;
}) => {
  trackEvent('view_item', {
    item_id: tz.shortName.toLowerCase(),
    item_name: tz.name,
    item_category: 'timezone',
    utc_offset: tz.offset,
  });
};

/**
 * KEY EVENT: Interactive Tool Usage (Meeting calculator, Alarm, Sleep calculator, etc.)
 */
export const trackToolUse = (toolName: string, action: string, metadata: Record<string, any> = {}) => {
  trackEvent('tool_interaction', {
    tool_name: toolName,
    tool_action: action,
    ...metadata,
  });
};

/**
 * KEY EVENT: Time conversion / difference lookup
 */
export const trackTimeConversion = (from: string, to: string, context: string = 'converter') => {
  trackEvent('time_conversion', {
    from_location: from,
    to_location: to,
    pair_slug: `${from}-to-${to}`,
    context,
  });
};

/**
 * KEY EVENT: Meeting planner calculation
 */
export const trackMeetingPlan = (participantCount: number, hasOverlap: boolean) => {
  trackEvent('meeting_plan', {
    participants: participantCount,
    has_overlap: hasOverlap,
  });
};

/**
 * KEY EVENT: Social & clipboard share / copy
 */
export const trackShare = (method: string, contentType: string, itemId?: string) => {
  trackEvent('share', {
    method, // 'copy_link' | 'copy_slack_receipt' | 'copy_embed' | etc.
    content_type: contentType,
    item_id: itemId,
  });
};

/**
 * Helper to deduce Content Group from pathname for GA4 content categorization
 */
export const resolveContentGroup = (pathname: string): string => {
  if (pathname === '/') return 'Home';
  if (pathname.startsWith('/time/') || pathname.startsWith('/cities')) return 'City Time';
  if (pathname.startsWith('/converter') || pathname.startsWith('/time-difference') || pathname.startsWith('/compare')) return 'Time Converters';
  if (pathname.startsWith('/meeting-planner') || pathname.startsWith('/meeting-cost-calculator') || pathname.startsWith('/overlap-calculator')) return 'Meeting Tools';
  if (pathname.startsWith('/alarm') || pathname.startsWith('/stopwatch') || pathname.startsWith('/timer') || pathname.startsWith('/pomodoro')) return 'Clock & Timer Tools';
  if (pathname.startsWith('/sleep-calculator') || pathname.startsWith('/life-in-weeks') || pathname.startsWith('/birthday-calculator') || pathname.startsWith('/countdown')) return 'Calculators & Viral';
  if (pathname.startsWith('/sun') || pathname.startsWith('/moon') || pathname.startsWith('/astronomy')) return 'Astronomy & Solar';
  if (pathname.startsWith('/timezone')) return 'Time Zones';
  if (pathname.startsWith('/country') || pathname.startsWith('/countries')) return 'Countries';
  if (pathname.startsWith('/blog') || pathname.startsWith('/learn')) return 'Articles & Guides';
  return 'Other';
};
