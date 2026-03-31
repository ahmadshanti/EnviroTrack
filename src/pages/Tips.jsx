import { useState } from "react";
import Navbar from "../components/Navbar";

const tipsData = {
  byStatus: {
    safe: {
      icon: "✅",
      color: "#22c55e",
      bg: "rgba(34,197,94,0.08)",
      border: "rgba(34,197,94,0.25)",
      title: "Environment is Safe",
      tips: [
        "Continue monitoring readings regularly to maintain safe conditions.",
        "Keep records of safe readings to identify patterns over time.",
        "Ensure ventilation systems are working properly.",
        "Educate community members about environmental awareness.",
        "Perform routine maintenance on monitoring equipment.",
      ],
    },
    warning: {
      icon: "⚠️",
      color: "#facc15",
      bg: "rgba(250,204,21,0.08)",
      border: "rgba(250,204,21,0.25)",
      title: "Warning — Take Precautions",
      tips: [
        "Increase monitoring frequency to every 30 minutes.",
        "Notify relevant authorities about the warning conditions.",
        "Reduce outdoor activities especially for vulnerable groups.",
        "Check and improve ventilation in indoor areas.",
        "Prepare emergency response plan in case conditions worsen.",
        "Avoid exposing children and elderly to outdoor environments.",
      ],
    },
    danger: {
      icon: "🚨",
      color: "#ef4444",
      bg: "rgba(239,68,68,0.08)",
      border: "rgba(239,68,68,0.25)",
      title: "Danger — Immediate Action Required",
      tips: [
        "Evacuate the affected area immediately if conditions are extreme.",
        "Contact emergency services and environmental authorities right away.",
        "Seal windows and doors to prevent outdoor air from entering.",
        "Avoid all unnecessary outdoor exposure.",
        "Provide first aid to anyone showing symptoms of heat stress.",
        "Document all readings and report to local health authorities.",
        "Activate emergency response protocols immediately.",
      ],
    },
  },
  byProblem: {
    temperature: {
      icon: "🌡️",
      color: "#f87171",
      title: "High Temperature Tips",
      tips: [
        "Stay hydrated — drink at least 2-3 liters of water daily.",
        "Wear lightweight, light-colored, and loose-fitting clothing.",
        "Avoid outdoor activities between 11 AM and 3 PM.",
        "Use fans or air conditioning to cool indoor spaces.",
        "Apply cool, wet cloths to skin to reduce body temperature.",
        "Never leave children or animals in parked vehicles.",
        "Check on elderly neighbors and vulnerable individuals regularly.",
      ],
    },
    humidity: {
      icon: "💧",
      color: "#38bdf8",
      title: "High Humidity Tips",
      tips: [
        "Use dehumidifiers to reduce indoor moisture levels.",
        "Ensure proper ventilation in kitchens and bathrooms.",
        "Fix any water leaks or damp areas immediately.",
        "Avoid drying clothes indoors as it increases humidity.",
        "Use exhaust fans when cooking or showering.",
        "Monitor for mold growth in corners and walls.",
        "Keep indoor plants minimal as they release moisture.",
      ],
    },
  },
  emergency: [
    { icon: "1️⃣", step: "Assess the Situation", desc: "Quickly evaluate the severity of the environmental hazard and identify affected areas." },
    { icon: "2️⃣", step: "Alert & Notify", desc: "Immediately inform local authorities, emergency services, and community members." },
    { icon: "3️⃣", step: "Evacuate if Needed", desc: "Guide people away from the danger zone following established evacuation routes." },
    { icon: "4️⃣", step: "Provide First Aid", desc: "Assist anyone showing symptoms of heat stroke, dehydration, or respiratory issues." },
    { icon: "5️⃣", step: "Document Everything", desc: "Record all readings, times, and actions taken for official reporting." },
    { icon: "6️⃣", step: "Follow Up", desc: "Continue monitoring after the incident and prevent recurrence through regular checks." },
  ],
  personal: [
    { icon: "🧴", title: "Skin Protection", desc: "Use sunscreen SPF 30+ when outdoors in high temperature conditions." },
    { icon: "👓", title: "Eye Protection", desc: "Wear UV-protective sunglasses to protect eyes from environmental hazards." },
    { icon: "😷", title: "Respiratory Protection", desc: "Use masks in areas with high humidity or poor air quality." },
    { icon: "🥤", title: "Stay Hydrated", desc: "Carry water at all times and drink regularly even if not thirsty." },
    { icon: "🏠", title: "Safe Shelter", desc: "Stay indoors during extreme conditions and keep spaces well-ventilated." },
    { icon: "📱", title: "Stay Informed", desc: "Keep monitoring the system for updates and follow official guidance." },
  ],
};

function Tips() {
  const [activeStatus, setActiveStatus] = useState("safe");
  const [activeProblem, setActiveProblem] = useState("temperature");

  const cardStyle = {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "22px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.09)",
    marginBottom: "20px",
  };

  const currentStatus = tipsData.byStatus[activeStatus];
  const currentProblem = tipsData.byProblem[activeProblem];

  return (
    <div className="app">
      <Navbar />

      {/* Hero */}
      <div className="page-hero card" style={{ marginBottom: "24px", padding: "28px 34px" }}>
        <span className="section-label">🌿 Safety Guide</span>
        <h1 style={{ fontSize: "2rem", color: "#fff", margin: "10px 0 8px" }}>Environmental Tips & Guidelines</h1>
        <p style={{ color: "#b9c9de", lineHeight: 1.8 }}>
          Practical tips and emergency guidelines to help you respond to environmental conditions safely and effectively.
        </p>
      </div>

      {/* Tips by Status */}
      <div style={cardStyle}>
        <div className="section-heading">
          <span className="section-label">📊 By Status</span>
          <h2>Tips Based on Environmental Status</h2>
          <p style={{ color: "#b9c9de" }}>Select the current status to view relevant tips.</p>
        </div>

        {/* Status Tabs */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          {Object.entries(tipsData.byStatus).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActiveStatus(key)}
              style={{
                width: "auto",
                padding: "10px 20px",
                borderRadius: "12px",
                fontSize: "0.95rem",
                background: activeStatus === key ? val.bg : "rgba(255,255,255,0.05)",
                border: `1px solid ${activeStatus === key ? val.border : "rgba(255,255,255,0.1)"}`,
                color: activeStatus === key ? val.color : "#7d8fa8",
                fontWeight: activeStatus === key ? 700 : 400,
                cursor: "pointer",
                transition: "0.2s ease",
              }}
            >
              {val.icon} {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Status Tips */}
        <div style={{
          background: currentStatus.bg,
          border: `1px solid ${currentStatus.border}`,
          borderRadius: "18px",
          padding: "20px 24px",
        }}>
          <h3 style={{ color: currentStatus.color, marginBottom: "16px", fontSize: "1.1rem" }}>
            {currentStatus.icon} {currentStatus.title}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {currentStatus.tips.map((tip, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{
                  minWidth: "26px", height: "26px", borderRadius: "50%",
                  background: currentStatus.color, color: "#000",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.8rem", fontWeight: 800, flexShrink: 0,
                }}>{i + 1}</span>
                <p style={{ margin: 0, color: "#e5eefc", lineHeight: 1.7, fontSize: "0.95rem" }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips by Problem */}
      <div style={cardStyle}>
        <div className="section-heading">
          <span className="section-label">🔍 By Problem Type</span>
          <h2>Tips Based on Environmental Issue</h2>
        </div>

        {/* Problem Tabs */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          {Object.entries(tipsData.byProblem).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActiveProblem(key)}
              style={{
                width: "auto",
                padding: "10px 20px",
                borderRadius: "12px",
                fontSize: "0.95rem",
                background: activeProblem === key ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${activeProblem === key ? val.color : "rgba(255,255,255,0.1)"}`,
                color: activeProblem === key ? val.color : "#7d8fa8",
                fontWeight: activeProblem === key ? 700 : 400,
                cursor: "pointer",
                transition: "0.2s ease",
              }}
            >
              {val.icon} {val.title.split(" ")[0]} {val.title.split(" ")[1]}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
          {currentProblem.tips.map((tip, i) => (
            <div key={i} style={{
              background: "rgba(15,23,42,0.8)",
              borderRadius: "14px",
              padding: "14px 16px",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "flex-start", gap: "10px",
            }}>
              <span style={{ color: currentProblem.color, fontSize: "1.2rem", flexShrink: 0 }}>•</span>
              <p style={{ margin: 0, color: "#c8d6ec", fontSize: "0.92rem", lineHeight: 1.7 }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Steps */}
      <div style={cardStyle}>
        <div className="section-heading">
          <span className="section-label">🚨 Emergency</span>
          <h2>Environmental Emergency Steps</h2>
          <p style={{ color: "#b9c9de" }}>Follow these steps immediately during an environmental crisis.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {tipsData.emergency.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "16px",
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.15)",
              borderRadius: "16px", padding: "16px 20px",
            }}>
              <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p style={{ margin: "0 0 4px", color: "#fff", fontWeight: 700, fontSize: "1rem" }}>{item.step}</p>
                <p style={{ margin: 0, color: "#b9c9de", fontSize: "0.9rem", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Protection */}
      <div style={cardStyle}>
        <div className="section-heading">
          <span className="section-label">🛡️ Personal Safety</span>
          <h2>Personal Protection Guidelines</h2>
          <p style={{ color: "#b9c9de" }}>Essential personal safety measures during environmental hazards.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {tipsData.personal.map((item, i) => (
            <div key={i} style={{
              background: "rgba(15,23,42,0.8)",
              borderRadius: "18px", padding: "20px",
              border: "1px solid rgba(96,165,250,0.15)",
              transition: "transform 0.25s ease",
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "10px" }}>{item.icon}</span>
              <h3 style={{ color: "#fff", fontSize: "1rem", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ margin: 0, color: "#b9c9de", fontSize: "0.9rem", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Tips;