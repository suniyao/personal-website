import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex flex-row text-center lg:flex-col gap-2 text-gray-300 text-sm lg:text-base font-medium px-4 py-2">
      <Link 
        href="/" 
        className="link"
      >
        home
      </Link>
      <Link 
        href="/writings"   
        className="link"
      >
        writings
      </Link>
      <Link 
        href="/resources" 
        className="link"
      >
        resources
      </Link>
    </nav>
  );
}
