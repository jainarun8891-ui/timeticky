import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, Bookmark, CheckCircle2 } from 'lucide-react';
import { BLOG_ARTICLES, Article } from '@/lib/blog/articles';
import { JsonLd } from '@/components/seo/JsonLd';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} - TimeNumbers Insights`,
    description: article.excerpt,
    keywords: article.keywords,
    alternates: {
      canonical: `https://www.timenumbers.com/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.datePublished,
      authors: [article.author],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = BLOG_ARTICLES.filter(a => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-12">
      <JsonLd type="article" data={article} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: article.title, url: `/blog/${article.slug}` }
        ]}
      />

      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto space-y-5 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs font-bold">
          <span>{article.category}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author & Date metadata bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-slate-800 dark:text-slate-200">{article.author}</span>
            <span className="text-slate-400">({article.authorRole})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Published {article.dateFormatted}</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Fact-checked & Chronometry Verified</span>
          </div>
        </div>
      </div>

      {/* Main Article Body */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-12 space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
        {article.content.map((paragraph, index) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <li key={index} className="ml-5 list-disc text-slate-700 dark:text-slate-300">
                {paragraph.replace('- ', '')}
              </li>
            );
          }
          return (
            <p key={index} className="font-normal text-slate-700 dark:text-slate-300">
              {paragraph}
            </p>
          );
        })}

        {/* Tag Keywords for SEO */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Topic Keywords:
          </span>
          {article.keywords.map((kw) => (
            <span
              key={kw}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-medium"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Related Reading */}
      <div className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-xl font-black text-slate-900 dark:text-white">
          Related Articles & Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/blog/${r.slug}`}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 shadow-xs transition-all block group"
            >
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 block mb-1">
                {r.category} • {r.readTime}
              </span>
              <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-blue-600 leading-snug">
                {r.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Ubiquitous Related Links */}
      <RelatedLinksHub />
    </div>
  );
}
