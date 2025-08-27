'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, ArrowLeft, ExternalLink, Heart } from 'lucide-react';
import Link from 'next/link';

// Dark-mode aware markdown parser
const parseMarkdown = (content) => {
  if (!content) return '';

  return content
    // Headings
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-100 mt-6 mb-3 border-b border-gray-700 pb-1">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-50 mt-8 mb-4 border-b border-gray-700 pb-1">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold text-white mt-8 mb-6">$1</h1>')
    // Bold & Italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-100">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-300">$1</em>')
    // .replace(/\_(.*?)\_/g, '<em class="italic text-gray-300">$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto my-4 border border-gray-700"><code class="text-sm text-green-400 font-mono">$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-yellow-300">$1</code>')
    // Images
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<div class="my-6 flex justify-center"><img src="$2" alt="$1" class="rounded-lg shadow-lg max-w-full"/></div>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-5 leading-relaxed text-gray-200">')
    // Line breaks
    .replace(/\n/g, '<br>')
    // Blockquotes
    .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-cyan-500 pl-4 italic text-gray-400">$1</blockquote>')
    // Footnotes (basic style)
    .replace(/\[\^(\d+)\]/g, '<sup class="text-xs text-gray-400">[$1]</sup>');
};

const BlogPost = ({ post, onBack, isExpanded = false }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post.content) {
      setContent(parseMarkdown(post.content));
    }
  }, [post.content]);

  const formatDate = (dateString, rawDate = null) => {
    if (rawDate && rawDate !== dateString) {
      return rawDate;
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (isExpanded) {
    return (
      <article className="max-w-4xl mx-auto text-gray-200">
        <div className="mb-8">
          <Link
            href="/update"
            className="flex items-center text-gray-400 hover:text-gray-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </Link>
          
          <div className="mb-6">
            <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(post.date, post.rawDate)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {estimateReadTime(post.content || '')} min read
              </div>
              {post.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </div>
              )}
              {post.likeCount !== undefined && (
                <div className="flex items-center text-red-400">
                  <Heart size={15} className="mr-1" />
                  {post.likeCount}
                </div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-cyan-400 text-xs rounded-full border border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: `<p class="mb-5 leading-relaxed text-gray-200">${content}</p>` }}
        />

        {post.originalUrl && (
          <div className="mt-8 pt-6 border-t border-gray-700">
            <a
              href={post.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View original HTML version
            </a>
          </div>
        )}
      </article>
    );
  }

  // Card view
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold line-clamp-2 text-white">
            {post.title}
          </h3>
          <div className="flex items-center font-mono text-gray-500 text-sm">
            {formatDate(post.date, post.rawDate)}
          </div>
        </div>
        
        {post.excerpt && (
          <p className="text-gray-400 text-[15px] mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded border border-gray-700"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded border border-gray-700">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => {}} 
            className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors"
          >
            {estimateReadTime(post.content || '')} min reading →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
