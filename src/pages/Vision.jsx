import Navbar from "../components/Navbar";

function Vision() {
  const pillars = [
    {
      icon: "🤖",
      label: "AI Integration",
      title: "AI-Powered Predictions",
      description:
        "Leveraging artificial intelligence to analyze environmental patterns and predict future conditions — enabling smarter, faster responses to environmental changes before they escalate.",
    },
    {
      icon: "🚨",
      label: "Early Warning",
      title: "Early Warning Systems",
      description:
        "Automated alerts triggered by abnormal sensor readings, giving communities and decision-makers the ability to act before environmental risks become critical.",
    },
    {
      icon: "🧠",
      label: "Smart Management",
      title: "Smart Management Techniques",
      description:
        "Applying intelligent data management to optimize how environmental information is collected, processed, and acted upon — reducing human error and improving response time.",
    },
    {
      icon: "📱",
      label: "Social Media & Community",
      title: "Individuals & Institutions",
      description:
        "Connecting environmental data with social media platforms to raise awareness, involve communities, and encourage both individuals and organizations to take part in sustainability efforts.",
    },
    {
      icon: "🌐",
      label: "Global SDGs",
      title: "Aligned with Global Sustainability",
      description:
        "All developments are directly tied to the United Nations Sustainable Development Goals — ensuring that every feature added contributes to a larger global mission.",
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <div className="page-hero card" style={{ marginBottom: "24px", padding: "28px 34px" }}>
        <span className="section-label">🔭 Vision</span>
        <h1 style={{ fontSize: "2rem", color: "#fff", margin: "10px 0 8px" }}>
          Where EnviroTrack Is Headed
        </h1>
        <p style={{ color: "#b9c9de", maxWidth: "700px", lineHeight: 1.8 }}>
          From 2026 to 2035, EnviroTrack aims to evolve from a monitoring tool into a comprehensive
          environmental intelligence platform — powered by AI, connected to communities, and aligned
          with global sustainable development goals.
        </p>
      </div>

      <section style={{ marginBottom: "32px" }}>
        <span className="section-label">📅 Timeline</span>
        <h2 style={{ color: "#fff", fontSize: "1.6rem", margin: "12px 0 8px" }}>2026 → 2035 Roadmap</h2>
        <p style={{ color: "#b9c9de", marginBottom: "24px", lineHeight: 1.8 }}>
          A focused development period to transform how environmental data is collected, understood, and acted upon.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {pillars.map((item, i) => (
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

export default Vision;