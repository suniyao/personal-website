import { NavLink } from "./Links";

export default function NavBar() {
  return (
    <nav className="flex flex-row text-center gap-20 text-[20px]">
      <NavLink href={"/"} > About </NavLink>
      <NavLink href={"/resume.pdf"} > Resume </NavLink>
      <NavLink href={"/update"} > Updates </NavLink>
      <NavLink href={"/project"} > Projects </NavLink>
    </nav>
  );
}
