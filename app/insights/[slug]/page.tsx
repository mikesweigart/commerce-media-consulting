import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { articles, getArticleBySlug, getRelatedArticles } from "@/data/insights";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/insights/${slug}`,
      publishedTime: article.publishedAt,
      authors: ["Don Knapp"],
      tags: article.tags,
    },
  };
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

const categoryColors: Record<string, string> = {
  "Go-to-Market Strategy": "bg-blue-100 text-blue-700",
  "GTM Strategy": "bg-violet-100 text-violet-700",
  "Positioning": "bg-emerald-100 text-emerald-700",
  "Pipeline Management": "bg-orange-100 text-orange-700",
  "Commercial System": "bg-red-100 text-red-700",
  "Pricing Strategy": "bg-gold-100 text-gold-700",
  "Marketing": "bg-pink-100 text-pink-700",
  "Implementation": "bg-teal-100 text-teal-700",
  "Operations": "bg-indigo-100 text-indigo-700",
  "Leadership": "bg-gray-100 text-gray-700",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    articleSection: article.category,
    keywords: article.tags.join(", "),
    wordCount: article.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length,
    author: {
      "@type": "Person",
      name: "Don Knapp",
      jobTitle: "Managing Partner",
      url: "https://www.cmcgco.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Commerce Media Consulting Group",
      url: "https://www.cmcgco.com",
    },
    mainEntityOfPage: `https://www.cmcgco.com/insights/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Header */}
      <section className="bg-navy-900 pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-medium transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            All Insights
          </Link>
          <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-5 ${categoryColors[article.category] || "bg-gray-100 text-gray-700"}`}>
            {article.category}
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {article.title}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-5 text-white/35 text-sm">
            <span className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-gold-500/40">
                <Image src="/donimage.png" alt="Don Knapp" width={28} height={28} className="w-full h-full object-cover object-top" />
              </div>
              Don Knapp
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {article.readTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
            {/* Article body */}
            <article
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-navy-900 prose-a:text-gold-600 hover:prose-a:text-gold-700"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Sidebar */}
            <aside className="hidden lg:block sticky top-28">
              {/* Author card */}
              <div className="bg-cream-50 rounded-2xl border border-cream-200 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-200">
                    <Image src="/donimage.png" alt="Don Knapp" width={48} height={48} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-navy-900 text-sm">Don Knapp</div>
                    <div className="text-gray-400 text-xs">Managing Partner</div>
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-4">
                  B2B go-to-market advisor with 20+ years of experience building GTM systems for CEOs and CROs at companies from $2M to $40M in revenue.
                </p>
                <Link
                  href="/about"
                  className="text-xs font-semibold text-gold-600 hover:text-gold-700 transition-colors"
                >
                  Learn more about Don →
                </Link>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Tag size={11} />
                  Topics
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium bg-navy-50 text-navy-700 px-3 py-1.5 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-navy-900 rounded-2xl p-6">
                <p className="font-heading font-bold text-white text-sm mb-2 leading-snug">
                  Apply this framework to your business.
                </p>
                <p className="text-white/50 text-xs leading-relaxed mb-4">
                  Book a strategy session with Don and map your GTM gaps to the Revenue Architecture.
                </p>
                <Link
                  href="/book-a-call"
                  className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-2.5 px-5 rounded-xl transition-colors text-xs w-full"
                >
                  Book a Session
                  <ArrowRight size={13} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related articles */}
      <section className="py-16 bg-cream-50 border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-navy-900 mb-8">Related Insights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/insights/${a.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-gold-200 hover:shadow-lg transition-all duration-300 flex flex-col gap-3"
              >
                <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full self-start ${categoryColors[a.category] || "bg-gray-100 text-gray-700"}`}>
                  {a.category}
                </span>
                <h3 className="font-heading font-bold text-navy-900 text-sm leading-snug group-hover:text-gold-600 transition-colors">
                  {a.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-auto">
                  <Clock size={11} />
                  {a.readTime} min read
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
