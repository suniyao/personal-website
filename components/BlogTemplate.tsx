'use client'
import React, { useEffect, useState } from 'react';
import BlogPost from '@/components/BlogPost';
import Link from 'next/link';

// Main Blog Template Component
const BlogTemplate = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);

  // Load posts from your data.json and markdown files
  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Load the data.json file
        const dataResponse = await fetch('/lib/posts/data.json');
        const postsData = await dataResponse.json();
        
        // Load markdown content for each post
        const postsWithContent = await Promise.all(
          postsData.map(async (post, index) => {
            try {
              // Convert the file_link to the actual path
              const mdPath = post.file_link.replace('../posts/', '/lib/posts/');
              const contentResponse = await fetch(mdPath);
              const markdownContent = await contentResponse.text();
              
              // Parse date to a consistent format
              const parsedDate = new Date(post.date).toISOString().split('T')[0];
              
              return {
                id: index + 1,
                title: post.title,
                content: markdownContent,
                excerpt: post.subtitle,
                date: parsedDate,
                slug: mdPath.split('/').pop().replace('.md', ''),
                author: "stepyao", // You can modify this or extract from markdown frontmatter
                tags: [], // You can extract tags from markdown frontmatter if available
                originalUrl: post.html_link ? `/substack_html_pages/${post.html_link.split('/').slice(-2).join('/')}` : null,
                likeCount: parseInt(post.like_count) || 0,
                rawDate: post.date // Keep original date format for display
              };
            } catch (error) {
              console.error(`Error loading content for ${post.title}:`, error);
              // Return post without content if markdown file fails to load
              return {
                id: index + 1,
                title: post.title,
                content: '',
                excerpt: post.subtitle,
                date: new Date(post.date).toISOString().split('T')[0],
                author: "stepyao",
                tags: [],
                originalUrl: post.html_link ? `/substack_html_pages/${post.html_link.split('/').slice(-2).join('/')}` : null,
                likeCount: parseInt(post.like_count) || 0,
                rawDate: post.date
              };
            }
          })
        );
        
        // Sort posts by date (newest first)
        const sortedPosts = postsWithContent.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(sortedPosts);
        
      } catch (error) {
        console.error('Error loading posts:', error);
        // Fallback to empty array if data loading fails
        setPosts([]);
      }
    };

    loadPosts();
  }, []);

  const handlePostSelect = (post) => {
    setSelectedPost(post);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  return (
    <div className="">
      <div className="">

        <div className="">
          {posts.map((post) => (
            <Link
            key={post.slug}
            href={`/update/${post.slug}`}
            className="block cursor-pointer"
          >
            <div key={post.id} onClick={() => handlePostSelect(post)} className="cursor-pointer">
              <BlogPost post={post} onBack={() => setSelectedPost(null)} isExpanded={false} />
            </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTemplate;