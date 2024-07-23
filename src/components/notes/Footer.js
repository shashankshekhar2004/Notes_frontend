import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer class="footer bg-dark py-3 mt-auto mb-0">
      <div class="container text-center">
        <span class="text-muted">
          Made by &copy;SHASHANK SHEKHAR{" "}
          <a href="https://github.com/shashankshekhar2004">
            <FaGithub />
          </a>{" "}
          <a href="https://www.linkedin.com/in/shashank-shekhar-3b029024b/">
            <FaLinkedin />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
