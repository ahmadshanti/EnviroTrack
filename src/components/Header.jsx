function Header() {
  return (
    <header className="hero">
      <div className="hero-text">
        <span className="hero-badge">Live Environmental Dashboard</span>
        <h1>Environmental Tracking System</h1>
        <p>
          A smart and modern interface to monitor temperature and humidity,
          detect risky values, and review environmental readings in a clean and
          interactive way.
        </p>
      </div>

      <div className="hero-panel">
        <div className="hero-mini-card">
          <span>System Status</span>
          <strong>Active</strong>
        </div>
        <div className="hero-mini-card">
          <span>Monitoring Type</span>
          <strong>Indoor Environment</strong>
        </div>
      </div>
    </header>
  );
}

export default Header;