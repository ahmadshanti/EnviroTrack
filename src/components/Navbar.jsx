import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const regNumber = localStorage.getItem("registrationNumber");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-dot"></div>
        <span>EnviroTrack</span>
      </div>

      <div className="nav-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/tips">Tips</NavLink>
      </div>

   <div className="nav-user">
  <div style={{
    width: "38px", height: "38px", borderRadius: "50%",
    background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: "15px", color: "#fff", flexShrink: 0,
  }}>
    {username?.charAt(0).toUpperCase()}
  </div>
  <div className="user-info">
    <span className="user-name">{username}</span>
    <span className="user-id">{regNumber}</span>
  </div>
  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>
    </nav>
  );
}

export default Navbar;