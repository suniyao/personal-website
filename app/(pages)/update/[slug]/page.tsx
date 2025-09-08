'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import 'katex/dist/katex.min.css';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      // Fetch markdown content from public folder
      const contentResponse = await fetch(`/posts/${slug}.md`);
      const markdownContent = await contentResponse.text();

      // Parse frontmatter using gray-matter
      const { data: frontmatter, content: markdownBody } = matter(markdownContent);
      setMeta(frontmatter);
      setContent(markdownBody);
    }
    fetchPost();
  }, [slug]);

  if (!content) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {meta && (
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-white mb-4">{meta.title}</h1>
            <div className="text-gray-400 mb-2">{meta.date}</div>
            {meta.subtitle && (
              <div className="text-gray-400 italic mb-4">{meta.subtitle}</div>
            )}
          </div>
        )}
        <article className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}