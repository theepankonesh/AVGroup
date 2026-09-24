import React, { useMemo } from 'react';
import { marked } from 'marked';
import type { BlogPost } from '../data/blog';
import { BLOG_POSTS } from '../data/blog';
import { SERVICE_BY_ID } from '../data/services';
import { Link, useApp } from '../lib/router';
import { Breadcrumbs, CtaBanner } from '../components/ui';

const proseCls = [
  'text-slate-700 text-base sm:text-[17px] leading-relaxed space-y-5',
  '[&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:font-montserrat [&_h2]:text-[#0B1A2E] [&_h2]:pt-6',
  '[&_h3]:text-xl [&_h3]:font-bold [&_h3]:font-montserrat [&_h3]:text-[#0B1A2E] [&_h3]:pt-2',
  '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:marker:text-[#0A6FE0]',
  '[&_strong]:text-[#0B1A2E] [&_a]:text-[#0A6FE0] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2',
  '[&_table]:w-full [&_table]:text-sm [&_table]:border [&_table]:border-slate-200 [&_th]:bg-[#F4F6F9] [&_th]:text-left [&_th]:p-3 [&_td]:p-3 [&_td]:border-t [&_td]:border-slate-200',
].join(' ');

export const BlogPostPage: React.FC<{ post: BlogPost; path: string }> = ({ post, path }) => {
  const { navigate } = useApp();
  const html = useMemo(() => marked.parse(post.content.trim(), { async: false }) as string, [post.content]);
  const svc = SERVICE_BY_ID[post.serviceId];
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).sort((a, b) => Number(b.serviceId === post.serviceId) - Number(a.serviceId === post.serviceId)).slice(0, 3);

  // Internal links inside the article navigate without a full page reload.
  const onArticleClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a');
    const href = a?.getAttribute('href');
    if (!a || !href || !href.startsWith('/') || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <>
      <section className="bg-[#0B1A2E] text-white py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Breadcrumbs path={path} />
          <p className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <span className="font-semibold text-[#1E9BFF]">{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.datePublished}>{post.dateLabel}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat leading-tight">{post.title}</h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      <article className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className={proseCls} onClick={onArticleClick} dangerouslySetInnerHTML={{ __html: html }} />

          <aside className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#F4F6F9] border border-slate-200 space-y-3">
            <p className="text-sm font-bold uppercase tracking-wider text-[#0A6FE0]">Written by AV Group</p>
            <p className="text-base text-slate-700">
              AV Group provides <Link href={svc.path} className="font-semibold text-[#0A6FE0] underline">{svc.name.toLowerCase()} in Ottawa</Link>{' '}
              and three other property services for homes and businesses across the city.
            </p>
          </aside>
        </div>
      </article>

      <section className="py-14 bg-[#F4F6F9] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-montserrat text-[#0B1A2E] mb-6">More Guides</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="block h-full bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md group">
                  <span className="text-xs font-semibold text-[#0A6FE0]">{p.category}</span>
                  <span className="block mt-1 font-bold font-montserrat text-[#0B1A2E] group-hover:text-[#0A6FE0]">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        source={`blog-${post.slug}`}
        services={[post.serviceId]}
        title={`Need ${svc.id === 'cleaning' ? 'cleaning' : svc.name.toLowerCase()} in Ottawa?`}
        text="Get a free, fixed-price quote from AV Group."
      />
    </>
  );
};

export default BlogPostPage;
