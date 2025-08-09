import Link from "next/link";

type LinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function CustomLink({ href, className, children }: LinkProps) {
  return (
    <Link href={href} className={className + "relative group cursor-pointer underline decoration-dotted hover:decoration-wavy transition-decoration"}>
      {children}
    </Link>
  );
}