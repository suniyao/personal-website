import { BsSubstack } from "react-icons/bs";
import { FaGithub, FaInstagram, FaLinkedin, FaSpotify } from "react-icons/fa";

export default function Socials() {
  return (
    <div className="flex flex-row gap-5">
      <a href="https://github.com/suniyao">
        <FaGithub size={25}/>
      </a>

      <a href="https://linkedin.com/in/stephanieysn">
        <FaLinkedin size={25}/>
      </a>

      <a href="https://open.spotify.com/user/314yf5erg4j27vjml64wotdvoj3q">
        <FaSpotify size={25}/>
      </a>

      <a href="https://www.instagram.com/stephanie_also_ysn">
        <FaInstagram size={25}/>
      </a>

      <a href="https://stepyao.substack.com">
        <BsSubstack size={25}/>
      </a>
    </div>
  );
}
