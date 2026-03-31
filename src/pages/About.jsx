import Navbar from "../components/Navbar";


function About() {
  const teamMembers = [
    {
      id: 1,
      name: "Ahmad Shanti",
      role: "General Project Coordinator",
      image: "team/ahmad shanti.jpg",
      emoji: "👨‍💻",
      description: "Supporting the development of practical solutions, building and programming the platform, coordinating between team members, and ensuring smooth workflow and communication.",
    },
    {
      id: 2,
      name: "Rima Djelloul",
      role: "General Supervisor",
      image: "team/rima.jpg",
      emoji: "👩‍🔬",
      description: "Defining the project scope, monitoring quality, ensuring coordination of technologies, preparing periodic reports, and evaluating performance quality.",
    },
  ];

  const technologies = [
    { icon: "⚛️", name: "React" },
    { icon: "⚡", name: "Vite" },
    { icon: "🔀", name: "React Router" },
    { icon: "🎨", name: "CSS3" },
    { icon: "🟨", name: "JavaScript" },
    { icon: "🗺️", name: "Leaflet Maps" },
    { icon: "🔥", name: "Firebase" },
  ];

  return (
    <div className="app">
      <Navbar />

      <div className="page-hero card" style={{ marginBottom: "24px", padding: "28px 34px" }}>
        <span className="section-label">🌿 About</span>
        <h1 style={{ fontSize: "2rem", color: "#fff", margin: "10px 0 8px" }}>Environmental Tracking System</h1>
        <p style={{ color: "#b9c9de", maxWidth: "700px", lineHeight: 1.8 }}>
          A smart web-based platform designed to monitor temperature and humidity across different locations,
          supporting environmental awareness and sustainable development.
        </p>
      </div>

      <section className="about-grid" style={{ marginBottom: "24px" }}>
        <div className="card about-card">
          <div className="section-heading">
            <span className="section-label">🎯 Goal</span>
            <h2>Why This Project Matters</h2>
          </div>
          <p className="about-text">
            This project demonstrates how digital systems can support environmental awareness and sustainable
            development. By tracking environmental data across different locations, the system helps detect
            potential risks, monitor changes, and support better decision-making for healthier communities.
          </p>
        </div>

        <div className="card about-card">
          <div className="section-heading">
            <span className="section-label">🛠️ Technologies</span>
            <h2>Tools Used</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "8px" }}>
            {technologies.map((tech, i) => (
              <span key={i} style={{
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(96,165,250,0.2)",
                borderRadius: "999px",
                padding: "8px 14px",
                color: "#93c5fd",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}>
                {tech.icon} {tech.name}
              </span>
            ))}
          </div>
        </div>

        <div className="card about-card">
          <div className="section-heading">
            <span className="section-label">🌱 Sustainability</span>
            <h2>Supporting Sustainable Development</h2>
          </div>
          <p className="about-text">
            The system contributes to sustainable development goals by enabling real-time environmental monitoring,
            reducing risks through early detection, and empowering communities with data-driven insights to make
            better environmental decisions.
          </p>
        </div>
      </section>

      <section className="team-section">
        <span className="section-label">👥 Team</span>
        <h2 style={{ color: "#fff", fontSize: "1.6rem", margin: "12px 0 8px" }}>Project Team</h2>
        <p className="team-intro">This project was developed through the efforts of the following team members.</p>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div className="team-card" key={member.id}>
  <img
    src={member.image}
    alt={member.name}
    className="team-image"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
  <h3>{member.name}</h3>
  <span className="team-role">{member.role}</span>
  <p>{member.description}</p>
</div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;