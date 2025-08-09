import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex flex-row text-center gap-10">
      <Link 
        href="/" 
        className="link"
      >
        about
      </Link>
      <Link 
        href="/writings"   
        className="link"
      >
        updates
      </Link>
      <Link 
        href="/resources" 
        className="link"
      >
        projects
      </Link>
    </nav>
  );
}
