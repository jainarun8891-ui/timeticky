export interface SiteConfig {
  name: string;
  tagline: string;
  secondaryTagline: string;
  url: string;
  ogImage: string;
  description: string;
  links: {
    github: string;
    twitter: string;
  };
  defaultLocale: string;
  locales: string[];
}

export const siteConfig: SiteConfig = {
  name: "TimeNumbers",
  tagline: "A more connected world",
  secondaryTagline: "The world's time, clearly.",
  url: "https://www.timenumbers.com",
  ogImage: "https://www.timenumbers.com/og.png",
  description: "Accurate, lightweight, and modern global time platform. Live synchronized world clocks, timezone converter, meeting planner, sunrise & sunset tracking, and calendar tools.",
  links: {
    github: "https://github.com/timenumbers",
    twitter: "https://twitter.com/timenumbers"
  },
  defaultLocale: "en",
  locales: ["en", "hi", "es", "fr", "de", "ja"]
};
