'use client'
import { useEffect, useRef, useState } from 'react';
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
import { remarkImageCaption } from '@/lib/remark-image-caption';

function collectFootnotes(markdown: string) {
  const lines = markdown.split('\n');
  const footnotes = new Map<string, string>();

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^\[\^([^\]]+)\]:\s*(.*)$/);
    if (!match) continue;

    const id = match[1];
    const chunks = [match[2]];
    let j = i + 1;

    while (j < lines.length) {
      const nextLine = lines[j];
      if (/^( {4}|\t)/.test(nextLine)) {
        chunks.push(nextLine.replace(/^( {4}|\t)/, ''));
        j += 1;
        continue;
      }

      if (nextLine.trim() === '' && j + 1 < lines.length && /^( {4}|\t)/.test(lines[j + 1])) {
        chunks.push('');
        j += 1;
        continue;
      }

      break;
    }

    const normalized = chunks.join(' ').replace(/\s+/g, ' ').trim();
    if (normalized) {
      footnotes.set(id, normalized);
    }
  }

  return footnotes;
}


export default function BlogPostPage() {
  const { slug } = useParams();
  const useBalancedLayout = true;
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState(null);
  const [footnotes, setFootnotes] = useState<Map<string, string>>(new Map());
  const [hoveredFootnoteId, setHoveredFootnoteId] = useState<string | null>(null);
  const [noteTopById, setNoteTopById] = useState<Record<string, number>>({});
  const [noteTrackHeight, setNoteTrackHeight] = useState(0);
  const articleRef = useRef<HTMLElement | null>(null);
  const noteTrackRef = useRef<HTMLDivElement | null>(null);
  const postColumnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchPost() {
      // Fetch markdown content from public folder
      const contentResponse = await fetch(`/posts/${slug}.md`);
      const markdownContent = await contentResponse.text();

      // Parse frontmatter using gray-matter
      const { data: frontmatter, content: markdownBody } = matter(markdownContent);
      setMeta(frontmatter);
      setFootnotes(collectFootnotes(markdownBody));
      setContent(markdownBody);
    }
    fetchPost();
  }, [slug]);

  useEffect(() => {
    const articleEl = articleRef.current;
    if (!articleEl) return;

    const refs = Array.from(articleEl.querySelectorAll<HTMLElement>('[data-footnote-ref]'));
    const cleanupFns: Array<() => void> = [];

    for (const ref of refs) {
      const href = ref.getAttribute('href') || '';
      const match = href.match(/^#user-content-fn-(.+)$/);
      if (!match) continue;

      const id = decodeURIComponent(match[1]);
      const onEnter = () => setHoveredFootnoteId(id);
      const onLeave = () => setHoveredFootnoteId((prev) => (prev === id ? null : prev));

      ref.addEventListener('mouseenter', onEnter);
      ref.addEventListener('mouseleave', onLeave);
      ref.addEventListener('focus', onEnter);
      ref.addEventListener('blur', onLeave);

      cleanupFns.push(() => {
        ref.removeEventListener('mouseenter', onEnter);
        ref.removeEventListener('mouseleave', onLeave);
        ref.removeEventListener('focus', onEnter);
        ref.removeEventListener('blur', onLeave);
      });
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
      setHoveredFootnoteId(null);
    };
  }, [content]);

  useEffect(() => {
    function updateDesktopNotePositions() {
      const articleEl = articleRef.current;
      const postColumnEl = postColumnRef.current;
      if (!articleEl || !postColumnEl) return;

      const isDesktop = window.innerWidth >= 1025;
      if (!isDesktop) {
        setNoteTopById({});
        setNoteTrackHeight(0);
        return;
      }

      const articleRect = articleEl.getBoundingClientRect();
      const postColumnRect = postColumnEl.getBoundingClientRect();
      const refs = Array.from(articleEl.querySelectorAll('[data-footnote-ref]'));
      const desiredTopById: Record<string, number> = {};
      const orderedIds: string[] = [];

      for (const ref of refs) {
        const href = ref.getAttribute('href') || '';
        const match = href.match(/^#user-content-fn-(.+)$/);
        if (!match) continue;

        const id = decodeURIComponent(match[1]);
        if (desiredTopById[id] !== undefined) continue;

        const refRect = ref.getBoundingClientRect();
        desiredTopById[id] = Math.max(0, refRect.top - postColumnRect.top - 6);
        orderedIds.push(id);
      }

      const articleTopInColumn = Math.max(0, articleRect.top - postColumnRect.top);
      const trackHeight = articleTopInColumn + articleEl.scrollHeight;
      const gap = 8;

      const heightById: Record<string, number> = {};
      const noteEls = noteTrackRef.current?.querySelectorAll('[data-footnote-id]') || [];
      for (const node of noteEls) {
        const id = node.getAttribute('data-footnote-id');
        if (!id) continue;
        heightById[id] = node.getBoundingClientRect().height;
      }

      const heights = orderedIds.map((id) => heightById[id] || 120);
      const desired = orderedIds.map((id) => desiredTopById[id]);
      const placed = new Array(orderedIds.length).fill(0);

      if (!hoveredFootnoteId || !orderedIds.includes(hoveredFootnoteId)) {
        let cursor = 0;
        for (let i = 0; i < orderedIds.length; i += 1) {
          placed[i] = Math.max(desired[i], cursor);
          cursor = placed[i] + heights[i] + gap;
        }
      } else {
        const focusIndex = orderedIds.indexOf(hoveredFootnoteId);
        placed[focusIndex] = desired[focusIndex];

        for (let i = focusIndex - 1; i >= 0; i -= 1) {
          const maxTop = placed[i + 1] - heights[i] - gap;
          placed[i] = Math.min(desired[i], maxTop);
        }

        for (let i = focusIndex + 1; i < orderedIds.length; i += 1) {
          const minTop = placed[i - 1] + heights[i - 1] + gap;
          placed[i] = Math.max(desired[i], minTop);
        }

        if (placed[0] < 0) {
          const shift = -placed[0];
          for (let i = 0; i < placed.length; i += 1) {
            placed[i] += shift;
          }
        }
      }

      const placedTopById: Record<string, number> = {};
      let cursor = 0;
      for (let i = 0; i < orderedIds.length; i += 1) {
        const id = orderedIds[i];
        placedTopById[id] = placed[i];
        cursor = Math.max(cursor, placed[i] + heights[i] + gap);
      }

      setNoteTopById(placedTopById);
      setNoteTrackHeight(Math.max(trackHeight, cursor));
    }

    updateDesktopNotePositions();
    requestAnimationFrame(updateDesktopNotePositions);

    const articleEl = articleRef.current;
    const trackEl = noteTrackRef.current;
    const resizeObserver = new ResizeObserver(() => {
      updateDesktopNotePositions();
    });

    if (articleEl) resizeObserver.observe(articleEl);
    if (trackEl) resizeObserver.observe(trackEl);

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(() => {
      updateDesktopNotePositions();
    });

    window.addEventListener('resize', updateDesktopNotePositions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDesktopNotePositions);
    };
  }, [content, footnotes, hoveredFootnoteId]);

  if (!content) return <div className="text-center py-12">Loading...</div>;

  const articleShellClass = useBalancedLayout
    ? `${style.articleShell} ${style.articleShellBalanced}`
    : style.articleShell;

  return (
    <div className="min-h-screen py-4 sm:py-8">
      <div className={`w-full mx-auto px-3 sm:px-4 lg:px-0 ${style.desktopBleed} ${articleShellClass}`}>
        <div className={style.leftRailSpacer} aria-hidden="true" />

        <div ref={postColumnRef} className={style.postColumn}>
          {meta && (
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">{meta.title}</h1>
              {meta.subtitle && (
                <div className="text-gray-400 italic text-[16px] sm:text-[18px] md:text-[20px]">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      p: ({ children }) => <span>{children}</span>
                    }}
                  >{meta.subtitle}
                  </ReactMarkdown>
                </div>
              )}
              <div className="text-gray-400 mt-3 sm:mt-5 date text-sm sm:text-base">{formatDate(meta.date)}</div>
            </div>
          )}
          <article ref={articleRef} className={style.reactMarkDown}>
            <ReactMarkdown
              rehypePlugins={[rehypeKatex, rehypeRaw]}
              remarkPlugins={[remarkMath, remarkGfm, remarkImageCaption]}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>

        <aside className={style.footnoteRail} aria-label="Desktop footnotes">
          <div ref={noteTrackRef} className={style.footnoteTrack} style={{ height: noteTrackHeight > 0 ? `${noteTrackHeight}px` : undefined }}>
            {Array.from(footnotes.entries()).map(([id, text]) => {
              const top = noteTopById[id];
              if (top === undefined) return null;

              return (
                <div
                  key={id}
                  className={`${style.quickSidenote} ${hoveredFootnoteId === id ? style.quickSidenoteActive : ''}`}
                  data-footnote-id={id}
                  style={{ top: `${top}px` }}
                >
                  <span className={style.footnoteLabel}>[{id}]</span>
                  <ReactMarkdown
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      p: ({ children }) => <span>{children}</span>,
                    }}
                  >
                    {text}
                  </ReactMarkdown>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}