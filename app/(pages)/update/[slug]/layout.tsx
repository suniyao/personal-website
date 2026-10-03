import { getSortedPostsData } from '@/lib/posts';

export function generateStaticParams() {
  return getSortedPostsData().map(({ id }: { id: string }) => ({ slug: id }));
}

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
