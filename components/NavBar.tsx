import { NavLink } from "./Links";

export default function NavBar() {
  return (
    <nav className="flex flex-row text-center gap-4 sm:gap-8 md:gap-12 lg:gap-20 text-[16px] sm:text-[18px] md:text-[20px]">
      <NavLink href={"/"} >About</NavLink>
      <NavLink href={"/project"} >Projects</NavLink>
      <NavLink href={"/update"} >Updates</NavLink>
    </nav>
  );
}
