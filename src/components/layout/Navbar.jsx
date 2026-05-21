import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Radio, ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "../../data/siteData";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
        <span className="brandIcon">
          <Radio size={16} strokeWidth={3.5} />
        </span>
        <span className="brandText">VistechBot</span>
      </NavLink>

      <nav className={`navLinks ${open ? "show" : ""}`}>
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}

        <div className="mobileBtns">
          <button className="btn ghost">Login</button>
          <button className="btn primary">
            Start Free Trial <ArrowRight size={17} />
          </button>
        </div>
      </nav>

      <div className="navBtns">
        <button className="btn ghost">Login</button>
        <button className="btn primary">
          Start Free Trial <ArrowRight size={17} />
        </button>
      </div>

      <button
        className="menuBtn"
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X size={25} /> : <Menu size={25} />}
      </button>
    </header>
  );
}
