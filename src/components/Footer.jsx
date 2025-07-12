import "./Footer.css";

function Footer({t}) {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} {t.footerText}</p>
    </footer>
  );
}

export default Footer;