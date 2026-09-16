
import React from 'react';
import { siteConfig } from '@/lib/config/site.config';

interface JsonLdProps {
  type: 'website' | 'organization' | 'faq' | 'article' | 'breadcrumb';
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
        "https://twitter.com/globaltime",
        "https://github.com/globaltime"
      ]
    };
  } else if (type === 'article' && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "description": data.excerpt,
      "image": data.image || (siteConfig.url + "/images/paris_hero.jpg"),
      "datePublished": data.datePublished || "2025-01-15T08:00:00+00:00",
      "dateModified": data.dateModified || "2025-03-25T10:00:00+00:00",
      "author": {
        "@type": "Person",
        "name": data.author || "Dr. Julian Vance, Horology Lead"
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
  } else if (type === 'breadcrumb' && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": data.map((item: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": siteConfig.url + item.url
      }))
    };
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
