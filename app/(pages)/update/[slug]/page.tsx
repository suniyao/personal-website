'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogPost from '@/components/BlogPost';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      // Adjust path as needed
      const mdPath = `@/posts/${slug}.md`;
      const dataResponse = await fetch('/lib/posts/data.json');
      const postsData = await dataResponse.json();
      const postMeta = postsData.find(p => p.file_link.includes(`${slug}.md`));
      const contentResponse = await fetch(mdPath);
      const markdownContent = await contentResponse.text();

      setPost({
        ...postMeta,
        content: markdownContent,
        slug,
      });
    }
    fetchPost();
  }, [slug]);

  if (!post) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <BlogPost post={post} isExpanded={true} onBack={() => window.history.back()} />
      </div>
    </div>
  );
}