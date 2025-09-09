'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { formatDate } from '@/lib/formatDate'
import 'katex/dist/katex.min.css';
import style from '@/ui/styles/markdown-styles.module.css';
import rehypeRaw from 'rehype-raw';
import { components } from '@/components/MdStyle';


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
            {meta.subtitle && (
              <div className="text-gray-400 italic text-[20px]">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  children={meta.subtitle}
                  components={{
                    p: ({ children }) => <span>{children}</span>
                  }}
                />
              </div>
            )}
            <div className="text-gray-400 mt-5">{formatDate(meta.date)}</div>
          </div>
        )}
        <article className={`prose prose-invert prose-lg max-w-none ${style.reactMarkDown}`}>
          <ReactMarkdown
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            remarkPlugins={[remarkMath, remarkGfm]}
            // components={components}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}