import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li><Link to="/posts/categories/News">News</Link></li>
        <li><Link to="/posts/categories/Mercato">Mercato</Link></li>
        <li><Link to="/posts/categories/Video">Video</Link></li>
        <li><Link to="/posts/categories/SerieB">SerieB</Link></li>
        <li><Link to="/posts/categories/Primavera">Primavera</Link></li>
        <li><Link to="/posts/categories/Femminile">Femminile</Link></li>
        <li><Link to="/posts/categories/SerieA">Serie A</Link></li>
        <li><Link to="/posts/categories/Altro">Altro</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>Tutti i diritti sono riservati &copy; Copyright, </small>
      </div>
    </footer>
  );
};

export default Footer;
