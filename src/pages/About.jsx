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
    {
      id: 3,
      name: "Ayoub Guidara",
      role: "Data & Research Analyst",
      image: "team/Ayoub.jpg",
      emoji: "📊",
      description: "Assisting in data collection and analysis, supporting research activities, and contributing to documentation and initial testing phases of the platform.",
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

  const impacts = [
    {
      icon: "🌿",
      label: "Environmental Impact",
      title: "Monitoring Our Environment",
      description:
        "EnviroTrack helps keep an eye on basic but important environmental factors like temperature and humidity in real time. This makes it easier to notice unusual changes early and raises awareness about how our environment is evolving.",
    },
    {
      icon: "💰",
      label: "Economic Impact",
      title: "Reducing Unnecessary Costs",
      description:
        "By providing timely environmental data, the platform can help reduce costs linked to damage or poor planning — like heat-related risks, infrastructure stress, or energy inefficiency. Better information leads to better decisions.",
    },
    {
      icon: "🏛️",
      label: "Policy & Governance Impact",
      title: "Supporting Decision-Makers",
      description:
        "The data collected by EnviroTrack gives decision-makers a clearer picture of local environmental conditions — useful for planning, regulations, and managing environmental issues in a more evidence-based way.",
    },
    {
      icon: "🤝",
      label: "Social Impact",
      title: "Raising Community Awareness",
      description:
        "When data is easy to access and understand, it encourages communities to care more about environmental changes and act more responsibly. EnviroTrack makes environmental data approachable for everyone.",
    },
    {
      icon: "📚",
      label: "Educational & Research Impact",
      title: "A Real Learning Tool",
      description:
        "EnviroTrack is useful for students and researchers to work with real data, connect theory to practice, and better understand how environmental monitoring systems work in real life.",
    },
    {
      icon: "💻",
      label: "Technological Impact",
      title: "Modern Tech for Real Solutions",
      description:
        "The project shows how modern web tools like React and Firebase can be used to build practical, real-world solutions — a small but clear example of how digital technology can support sustainability.",
    },
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

      {/* ===== IMPACT SECTION ===== */}
      <section style={{ marginTop: "40px" }}>
        <span className="section-label">🌍 Impact</span>
        <h2 style={{ color: "#fff", fontSize: "1.6rem", margin: "12px 0 8px" }}>
          The Real-World Impact of EnviroTrack
        </h2>
        <p style={{ color: "#b9c9de", marginBottom: "24px", lineHeight: 1.8 }}>
          Beyond tracking data, EnviroTrack creates meaningful value across multiple areas of life.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {impacts.map((item, i) => (
            <div key={i} className="card" style={{ padding: "24px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{item.icon}</div>
              <span className="section-label" style={{ marginBottom: "6px", display: "inline-block" }}>
                {item.label}
              </span>
              <h3 style={{ color: "#fff", fontSize: "1.1rem", margin: "6px 0 10px" }}>{item.title}</h3>
              <p style={{ color: "#b9c9de", lineHeight: 1.8, fontSize: "0.92rem" }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default About;