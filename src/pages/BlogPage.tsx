import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';
import { Link } from '../lib/router';
import { Breadcrumbs, CtaBanner } from '../components/ui';

export const BlogPage: React.FC<{ path: string }> = ({ path }) => (
  <>
    <section className="bg-[#0B1A2E] text-white py-14 px-4">
      <div className="max-w-3xl mx-auto space-y-4 text-center">
        <div className="flex justify-center">
          <Breadcrumbs path={path} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-montserrat">Ottawa Property Care Guides</h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Practical advice on lawn mowing, power washing, window cleaning, and cleaning, written for Ottawa’s climate.
        </p>
      </div>
    </section>

    <section className="py-16 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <article className="relative h-full bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-3 group">
                <p className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  <span className="font-semibold text-[#0A6FE0]">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </p>
                <h2 className="text-lg font-bold font-montserrat text-[#0B1A2E] leading-snug">
                  <Link href={`/blog/${post.slug}`} className="group-hover:text-[#0A6FE0] after:absolute after:inset-0">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{post.excerpt}</p>
                <span className="mt-auto pt-2 text-sm font-bold text-[#0A6FE0] inline-flex items-center gap-1">
                  Read the guide <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <CtaBanner source="blog-index" title="Rather Leave It to the Pros?" text="Get a free quote for grass cutting, power washing, window cleaning, or cleaning." />
  </>
);

export default BlogPage;
