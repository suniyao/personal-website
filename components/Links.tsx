'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'

type LinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function CustomLink({ href, className, children }: LinkProps) {
  return (
    <Link href={href} className={className + "relative group cursor-pointer underline decoration-dotted hover:decoration-wavy transition-decoration"}>
      {children}
    </Link>
  );
}

export function NavLink({ href, className, children }: LinkProps) {
  const pathname = usePathname()
  return (
    <Link href={href} className={`link ${pathname === href && 'underline'} ${className || ''} relative group`}>
      {children}
    </Link>
  );
}