import { BsSubstack } from "react-icons/bs";
import { FaGithub, FaInstagram, FaLinkedin, FaSpotify } from "react-icons/fa";

export default function Socials() {
  return (
    <div className="flex flex-row gap-4 sm:gap-5">
      <a href="https://github.com/suniyao">
        <FaGithub size={22} className="sm:w-6 sm:h-6"/>
      </a>

      <a href="https://linkedin.com/in/stephanieysn">
        <FaLinkedin size={22} className="sm:w-6 sm:h-6"/>
      </a>

      <a href="https://open.spotify.com/user/314yf5erg4j27vjml64wotdvoj3q">
        <FaSpotify size={22} className="sm:w-6 sm:h-6"/>
      </a>

      <a href="https://www.instagram.com/stephanie_also_ysn">
        <FaInstagram size={22} className="sm:w-6 sm:h-6"/>
      </a>

      <a href="https://stepyao.substack.com">
        <BsSubstack size={22} className="sm:w-6 sm:h-6"/>
      </a>
    </div>
  );
}
