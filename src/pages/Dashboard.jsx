import Navbar from "../components/Navbar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import DataForm from "../components/DataForm";
import ReadingsTable from "../components/ReadingsTable";
import AlertBox from "../components/AlertBox";
import SmartMap from "../components/SmartMap";
import { useRef, useEffect } from "react";

function Dashboard({ readings, onAddReading }) {
  if (readings.length === 0) {
    return (
      <div className="app">
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: "100vh", color: "#60a5fa", fontSize: "1.2rem"
        }}>
          Loading...
        </div>
      </div>
    );
  }

  const latestReading = readings[readings.length - 1];
  const prevReading = readings.length >= 2 ? readings[readings.length - 2] : null;
  const prevReadingRef = useRef(null);

  // إحصائيات
  const today = new Date().toLocaleDateString();
  const todayReadings = readings.filter((r) => new Date(r.date).toLocaleDateString() === today).length;
  const safeCount = readings.filter((r) => r.status === "safe").length;
  const safePercentage = ((safeCount / readings.length) * 100).toFixed(0);
  const lastUpdate = latestReading.date;
  const maxTemp = Math.max(...readings.map((r) => r.temperature));
  const minHumidity = Math.min(...readings.map((r) => r.humidity));
  const warningsTodayCount = readings.filter((r) => r.status !== "safe").length;

  // أخطر موقع
  const locationDanger = {};
  readings.forEach((r) => {
    if (!locationDanger[r.location]) locationDanger[r.location] = { danger: 0, warning: 0, total: 0 };
    if (r.status === "danger") locationDanger[r.location].danger++;
    if (r.status === "warning") locationDanger[r.location].warning++;
    locationDanger[r.location].total++;
  });
  const mostDangerous = Object.entries(locationDanger)
    .sort((a, b) => b[1].danger - a[1].danger || b[1].warning - a[1].warning)[0];

  // Trend Indicators
  const tempTrend = prevReading ? latestReading.temperature - prevReading.temperature : 0;
  const humidityTrend = prevReading ? latestReading.humidity - prevReading.humidity : 0;

  useEffect(() => {
    if (!latestReading) return;
    if (
      prevReadingRef.current &&
      prevReadingRef.current.id !== latestReading.id &&
      latestReading.status === "danger"
    ) {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playBeep = (freq, start, duration) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.frequency.value = freq;
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime + start);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + start + duration);
        oscillator.start(audioCtx.currentTime + start);
        oscillator.stop(audioCtx.currentTime + start + duration);
      };
      playBeep(880, 0, 0.3);
      playBeep(660, 0.35, 0.3);
      playBeep(880, 0.7, 0.3);
    }
    prevReadingRef.current = latestReading;
  }, [latestReading]);

  let alertMessage = "";
  let alertType = latestReading.status;
  if (latestReading.status === "danger") {
    alertMessage = `Environmental danger detected in ${latestReading.location}. Immediate attention may be required.`;
  } else if (latestReading.status === "warning") {
    alertMessage = `Warning: Environmental conditions in ${latestReading.location} should be monitored carefully.`;
  } else {
    alertMessage = `Conditions in ${latestReading.location} are currently stable and safe.`;
  }

  return (
    <div className="app">
      <Navbar />
      <Header />

      {/* ملاحظة البيانات اليدوية */}
      <div style={{
        display: "flex", alignItems: "flex-start", gap: "12px",
        padding: "14px 18px", borderRadius: "16px", marginBottom: "20px",
        background: "rgba(250, 204, 21, 0.08)",
        border: "1px solid rgba(250, 204, 21, 0.25)",
      }}>
        <span style={{ fontSize: "1.2rem" }}>🔬</span>
        <div>
          <strong style={{ color: "#fde68a", display: "block", marginBottom: "4px" }}>
            Manual Data Entry Mode
          </strong>
          <p style={{ margin: 0, color: "#fcd34d", fontSize: "0.88rem", lineHeight: 1.6 }}>
            Data is currently entered manually by the team. IoT sensors will be integrated in future versions for real-time automatic readings with higher accuracy.
          </p>
        </div>
      </div>

      {/* Summary Bar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "14px", marginBottom: "24px",
      }}>
        {[
          { icon: "📅", label: "Today's Readings", value: todayReadings, color: "#60a5fa" },
          { icon: "✅", label: "Safe Percentage", value: `${safePercentage}%`, color: "#22c55e" },
          { icon: "🕐", label: "Last Update", value: lastUpdate, color: "#a78bfa", small: true },
        ].map((item, i) => (
          <div key={i} className="card" style={{
            padding: "18px 20px",
            borderTop: `3px solid ${item.color}`,
            display: "flex", alignItems: "center", gap: "14px",
          }}>
            <span style={{ fontSize: "1.6rem" }}>{item.icon}</span>
            <div>
              <p style={{ margin: 0, color: "#7d8fa8", fontSize: "0.82rem" }}>{item.label}</p>
              <p style={{
                margin: 0, color: item.color, fontWeight: 800,
                fontSize: item.small ? "0.85rem" : "1.4rem",
              }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <AlertBox message={alertMessage} type={alertType} location={latestReading.location} />

      {/* Stats Grid مع Trend */}
      <section className="stats-grid">
        <StatsCard
          title="Latest Temperature" value={latestReading.temperature} unit="°C" type="temperature"
          trend={tempTrend}
        />
        <StatsCard
          title="Latest Humidity" value={latestReading.humidity} unit="%" type="humidity"
          trend={humidityTrend}
        />
        <StatsCard title="Current Status" value={latestReading.status} unit="" type="status" />
        <StatsCard title="Current Location" value={latestReading.location} unit="" type="location" />
      </section>

      {/* Quick Stats Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "14px", marginBottom: "24px",
      }}>
        {[
          { icon: "🔺", label: "Highest Temp Recorded", value: `${maxTemp}°C`, color: "#f87171" },
          { icon: "💧", label: "Lowest Humidity", value: `${minHumidity}%`, color: "#38bdf8" },
          { icon: "⚠️", label: "Total Alerts", value: warningsTodayCount, color: "#facc15" },
        ].map((item, i) => (
          <div key={i} className="card" style={{
            padding: "18px 20px",
            borderTop: `3px solid ${item.color}`,
            display: "flex", alignItems: "center", gap: "14px",
          }}>
            <span style={{ fontSize: "1.6rem" }}>{item.icon}</span>
            <div>
              <p style={{ margin: 0, color: "#7d8fa8", fontSize: "0.82rem" }}>{item.label}</p>
              <p style={{ margin: 0, color: item.color, fontWeight: 800, fontSize: "1.4rem" }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Most Dangerous Location */}
      {mostDangerous && mostDangerous[1].danger > 0 && (
        <div className="card" style={{
          marginBottom: "24px", padding: "20px 24px",
          borderLeft: "4px solid #ef4444",
          display: "flex", alignItems: "center", gap: "16px",
        }}>
          <span style={{ fontSize: "2rem" }}>🚨</span>
          <div>
            <p style={{ margin: 0, color: "#7d8fa8", fontSize: "0.85rem" }}>Most Dangerous Location</p>
            <p style={{ margin: "4px 0 0", color: "#fff", fontWeight: 800, fontSize: "1.2rem" }}>
              📍 {mostDangerous[0]}
            </p>
            <p style={{ margin: "4px 0 0", color: "#f87171", fontSize: "0.88rem" }}>
              {mostDangerous[1].danger} danger {mostDangerous[1].danger === 1 ? "reading" : "readings"} recorded
            </p>
          </div>
        </div>
      )}

      <SmartMap readings={readings} />

      <section className="dashboard-highlight card">
        <div className="section-heading">
          <span className="section-label">Live Monitoring</span>
          <h2>Location-Based Environmental Insight</h2>
        </div>
        <p className="about-text">
          The latest environmental reading was recorded in{" "}
          <strong>{latestReading.location}</strong>. This helps connect
          environmental conditions to real locations, making the system more
          useful for risk detection, environmental awareness, and sustainable decision-making.
        </p>
      </section>

      <section className="main-grid">
        <DataForm onAddReading={onAddReading} />
        <ReadingsTable readings={readings} />
      </section>
    </div>
  );
}

export default Dashboard;