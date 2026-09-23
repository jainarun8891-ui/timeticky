import React from 'react';
import { siteConfig } from '@/lib/config/site.config';

interface JsonLdProps {
  type: 'website' | 'organization' | 'faq' | 'article' | 'breadcrumb' | 'application' | 'howto';
  data?: any;
}

export function JsonLd({ type, data }: JsonLdProps) {
  let schema: any = {};

  if (type === 'website') {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "description": siteConfig.description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": siteConfig.url + "/api/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };
  } else if (type === 'organization') {
    schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": siteConfig.url + "/favicon.ico",
      "sameAs": [
        siteConfig.links.twitter,
        siteConfig.links.github
      ]
    };
  } else if (type === 'application') {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": data?.name || siteConfig.name,
      "url": data?.url || siteConfig.url,
      "description": data?.description || siteConfig.description,
      "applicationCategory": data?.category || "UtilitiesApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires modern web browser with JavaScript enabled",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
  } else if (type === 'howto' && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": data.name,
      "description": data.description,
      "step": (data.steps || []).map((step: any, index: number) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text
      }))
    };
  } else if (type === 'article' && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "description": data.excerpt,
      "image": data.image || (siteConfig.url + "/images/paris_hero.jpg"),
      "datePublished": data.datePublished || "2026-01-15T08:00:00+00:00",
      "dateModified": data.dateModified || "2026-03-25T10:00:00+00:00",
      "author": {
        "@type": "Person",
        "name": data.author || "TimeNumbers Horology Lab"
      },
      "publisher": {
        "@type": "Organization",
        "name": siteConfig.name,
        "logo": {
          "@type": "ImageObject",
          "url": siteConfig.url + "/favicon.ico"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": siteConfig.url + "/blog/" + data.slug
      }
    };
  } else if (type === 'faq' && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.map((item: any) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  } else if (type === 'breadcrumb') {
    // Schema.org BreadcrumbList is canonically emitted by <Breadcrumbs /> to prevent duplicate schema tags
    return null;
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
