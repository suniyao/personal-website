import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex flex-row text-center gap-20 text-[20px]">
      <Link href="/" className="link" > About </Link>
      <Link href={"/resume.pdf"} className="link" > Resume </Link>
      <Link href="/update" className="link" > Updates </Link>
      <Link href="/project" className="link" > Projects </Link>
    </nav>
  );
}
