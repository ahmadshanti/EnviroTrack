import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-dot"></div>
        <span>EnviroTrack</span>
      </div>

      <div className="nav-links">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;