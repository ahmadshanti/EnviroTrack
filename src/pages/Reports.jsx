import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";

const COLORS = {
  safe: "#22c55e",
  warning: "#facc15",
  danger: "#ef4444",
};

function Reports({ readings }) {
  if (readings.length === 0) return null;

  const totalReadings = readings.length;
  const dangerCount = readings.filter((r) => r.status === "danger").length;
  const warningCount = readings.filter((r) => r.status === "warning").length;
  const safeCount = readings.filter((r) => r.status === "safe").length;
  const avgTemperature = (readings.reduce((sum, r) => sum + r.temperature, 0) / totalReadings).toFixed(1);
  const avgHumidity = (readings.reduce((sum, r) => sum + r.humidity, 0) / totalReadings).toFixed(1);
  const maxTemperature = Math.max(...readings.map((r) => r.temperature));
  const maxHumidity = Math.max(...readings.map((r) => r.humidity));
  const minTemperature = Math.min(...readings.map((r) => r.temperature));

  // مقارنة المواقع
  const locationStats = {};
  readings.forEach((r) => {
    if (!locationStats[r.location]) {
      locationStats[r.location] = { location: r.location, temps: [], humidities: [], safe: 0, warning: 0, danger: 0, total: 0 };
    }
    locationStats[r.location].temps.push(r.temperature);
    locationStats[r.location].humidities.push(r.humidity);
    locationStats[r.location][r.status]++;
    locationStats[r.location].total++;
  });

  const locationData = Object.values(locationStats).map((loc) => ({
    name: loc.location.split(" ")[0],
    fullName: loc.location,
    avgTemp: (loc.temps.reduce((a, b) => a + b, 0) / loc.temps.length).toFixed(1),
    avgHumidity: (loc.humidities.reduce((a, b) => a + b, 0) / loc.humidities.length).toFixed(1),
    total: loc.total,
    safe: loc.safe,
    warning: loc.warning,
    danger: loc.danger,
    dominantStatus: loc.danger > 0 ? "danger" : loc.warning > 0 ? "warning" : "safe",
  }));

  const reportCards = [
    { icon: "📊", label: "Total Readings", value: totalReadings, color: "#60a5fa" },
    { icon: "✅", label: "Safe Readings", value: safeCount, color: "#22c55e" },
    { icon: "⚠️", label: "Warning Readings", value: warningCount, color: "#facc15" },
    { icon: "🚨", label: "Danger Readings", value: dangerCount, color: "#ef4444" },
    { icon: "🌡️", label: "Avg Temperature", value: `${avgTemperature}°C`, color: "#38bdf8" },
    { icon: "💧", label: "Avg Humidity", value: `${avgHumidity}%`, color: "#34d399" },
    { icon: "🔺", label: "Highest Temp", value: `${maxTemperature}°C`, color: "#f87171" },
    { icon: "🔻", label: "Lowest Temp", value: `${minTemperature}°C`, color: "#a78bfa" },
    { icon: "💦", label: "Highest Humidity", value: `${maxHumidity}%`, color: "#22d3ee" },
  ];

  const chartData = readings.map((r, i) => ({
    name: r.location ? r.location.split(" ")[0] : `#${i + 1}`,
    temperature: r.temperature,
    humidity: r.humidity,
  }));

  const pieData = [
    { name: "Safe", value: safeCount },
    { name: "Warning", value: warningCount },
    { name: "Danger", value: dangerCount },
  ].filter((d) => d.value > 0);

  const chartStyle = {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "22px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.09)",
    marginBottom: "20px",
  };

  const tooltipStyle = {
    contentStyle: {
      background: "#0f1c32",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      color: "#e5eefc",
    },
  };

  const exportExcel = () => {
    const summaryData = [
      { Metric: "Total Readings", Value: totalReadings },
      { Metric: "Safe Readings", Value: safeCount },
      { Metric: "Warning Readings", Value: warningCount },
      { Metric: "Danger Readings", Value: dangerCount },
      { Metric: "Avg Temperature (°C)", Value: avgTemperature },
      { Metric: "Avg Humidity (%)", Value: avgHumidity },
      { Metric: "Highest Temperature (°C)", Value: maxTemperature },
      { Metric: "Lowest Temperature (°C)", Value: minTemperature },
      { Metric: "Highest Humidity (%)", Value: maxHumidity },
    ];
    const readingsData = readings.map((r) => ({
      Temperature: `${r.temperature}°C`,
      Humidity: `${r.humidity}%`,
      Location: r.location,
      Status: r.status,
      Date: r.date,
    }));
    const locationExport = locationData.map((l) => ({
      Location: l.fullName,
      "Avg Temperature": `${l.avgTemp}°C`,
      "Avg Humidity": `${l.avgHumidity}%`,
      "Total Readings": l.total,
      Safe: l.safe,
      Warning: l.warning,
      Danger: l.danger,
      "Dominant Status": l.dominantStatus,
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summaryData), "Summary");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(readingsData), "All Readings");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(locationExport), "Location Comparison");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "environmental-report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);
    doc.text("Environmental Tracking System - Report", 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
    autoTable(doc, {
      startY: 35,
      head: [["Metric", "Value"]],
      body: [
        ["Total Readings", totalReadings],
        ["Safe Readings", safeCount],
        ["Warning Readings", warningCount],
        ["Danger Readings", dangerCount],
        ["Avg Temperature", `${avgTemperature}°C`],
        ["Avg Humidity", `${avgHumidity}%`],
        ["Highest Temperature", `${maxTemperature}°C`],
        ["Lowest Temperature", `${minTemperature}°C`],
        ["Highest Humidity", `${maxHumidity}%`],
      ],
      headStyles: { fillColor: [37, 99, 235] },
    });
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Temperature", "Humidity", "Location", "Status", "Date"]],
      body: readings.map((r) => [`${r.temperature}°C`, `${r.humidity}%`, r.location, r.status, r.date]),
      headStyles: { fillColor: [14, 165, 233] },
    });
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Location", "Avg Temp", "Avg Humidity", "Total", "Safe", "Warning", "Danger"]],
      body: locationData.map((l) => [l.fullName, `${l.avgTemp}°C`, `${l.avgHumidity}%`, l.total, l.safe, l.warning, l.danger]),
      headStyles: { fillColor: [16, 185, 129] },
    });
    doc.save("environmental-report.pdf");
  };

  return (
    <div className="app">
      <Navbar />

      {/* Hero */}
      <div className="page-hero card" style={{ marginBottom: "24px", padding: "28px 34px" }}>
        <span className="section-label">📈 Analysis</span>
        <h1 style={{ fontSize: "2rem", color: "#fff", margin: "10px 0 8px" }}>System Reports</h1>
        <p style={{ color: "#b9c9de" }}>A smart summary of all environmental readings to support data-driven decisions.</p>
        <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
          <button onClick={exportExcel} style={{ width: "auto", padding: "10px 20px", background: "linear-gradient(135deg, #16a34a, #15803d)", borderRadius: "12px", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px" }}>
            📥 Export Excel
          </button>
          <button onClick={exportPDF} style={{ width: "auto", padding: "10px 20px", background: "linear-gradient(135deg, #dc2626, #b91c1c)", borderRadius: "12px", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px" }}>
            📄 Export PDF
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="reports-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginBottom: "24px" }}>
        {reportCards.map((card, index) => (
          <div className="card report-card" key={index}
            style={{ borderTop: `3px solid ${card.color}`, transition: "transform 0.25s ease" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{card.icon}</div>
            <h3 style={{ color: "#b9c9de", fontSize: "0.95rem", marginBottom: "10px" }}>{card.label}</h3>
            <p style={{ fontSize: "2rem", color: card.color, fontWeight: 800 }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Chart 1 - Temperature */}
      <div style={chartStyle}>
        <div className="section-heading">
          <span className="section-label">🌡️ Temperature</span>
          <h2>Temperature per Reading</h2>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" tick={{ fill: "#b9c9de", fontSize: 12 }} />
            <YAxis tick={{ fill: "#b9c9de", fontSize: 12 }} unit="°C" />
            <Tooltip {...tooltipStyle} formatter={(v) => [`${v}°C`, "Temperature"]} />
            <Bar dataKey="temperature" fill="#38bdf8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2 - Humidity */}
      <div style={chartStyle}>
        <div className="section-heading">
          <span className="section-label">💧 Humidity</span>
          <h2>Humidity per Reading</h2>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" tick={{ fill: "#b9c9de", fontSize: 12 }} />
            <YAxis tick={{ fill: "#b9c9de", fontSize: 12 }} unit="%" />
            <Tooltip {...tooltipStyle} formatter={(v) => [`${v}%`, "Humidity"]} />
            <Bar dataKey="humidity" fill="#34d399" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3 - Pie */}
      <div style={chartStyle}>
        <div className="section-heading">
          <span className="section-label">🥧 Distribution</span>
          <h2>Status Distribution</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={110} dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: "rgba(255,255,255,0.3)" }}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[entry.name.toLowerCase()]} />
              ))}
            </Pie>
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ color: "#b9c9de" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 4 - Line */}
      <div style={chartStyle}>
        <div className="section-heading">
          <span className="section-label">📉 Trends</span>
          <h2>Temperature & Humidity Over Time</h2>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" tick={{ fill: "#b9c9de", fontSize: 12 }} />
            <YAxis tick={{ fill: "#b9c9de", fontSize: 12 }} />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ color: "#b9c9de" }} />
            <Line type="monotone" dataKey="temperature" stroke="#38bdf8" strokeWidth={2.5} dot={{ fill: "#38bdf8", r: 5 }} name="Temperature °C" />
            <Line type="monotone" dataKey="humidity" stroke="#34d399" strokeWidth={2.5} dot={{ fill: "#34d399", r: 5 }} name="Humidity %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Location Comparison */}
      <div style={chartStyle}>
        <div className="section-heading">
          <span className="section-label">📊 Comparison</span>
          <h2>Location Comparison</h2>
          <p style={{ color: "#b9c9de" }}>Compare average temperature, humidity, and status across all monitored locations.</p>
        </div>

        {/* Comparison Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          {locationData.map((loc, i) => (
            <div key={i} style={{
              background: "rgba(15,23,42,0.8)",
              borderRadius: "18px",
              padding: "20px",
              border: `2px solid ${COLORS[loc.dominantStatus]}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>📍 {loc.fullName}</span>
                <span className={`status-badge ${loc.dominantStatus}`}>{loc.dominantStatus}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ background: "rgba(56,189,248,0.1)", borderRadius: "12px", padding: "10px", textAlign: "center" }}>
                  <p style={{ color: "#7d8fa8", fontSize: "0.8rem", margin: "0 0 4px" }}>Avg Temp</p>
                  <p style={{ color: "#38bdf8", fontWeight: 800, fontSize: "1.2rem", margin: 0 }}>{loc.avgTemp}°C</p>
                </div>
                <div style={{ background: "rgba(52,211,153,0.1)", borderRadius: "12px", padding: "10px", textAlign: "center" }}>
                  <p style={{ color: "#7d8fa8", fontSize: "0.8rem", margin: "0 0 4px" }}>Avg Humidity</p>
                  <p style={{ color: "#34d399", fontWeight: 800, fontSize: "1.2rem", margin: 0 }}>{loc.avgHumidity}%</p>
                </div>
                <div style={{ background: "rgba(34,197,94,0.1)", borderRadius: "12px", padding: "10px", textAlign: "center" }}>
                  <p style={{ color: "#7d8fa8", fontSize: "0.8rem", margin: "0 0 4px" }}>Safe</p>
                  <p style={{ color: "#22c55e", fontWeight: 800, fontSize: "1.2rem", margin: 0 }}>{loc.safe}</p>
                </div>
                <div style={{ background: "rgba(239,68,68,0.1)", borderRadius: "12px", padding: "10px", textAlign: "center" }}>
                  <p style={{ color: "#7d8fa8", fontSize: "0.8rem", margin: "0 0 4px" }}>Danger</p>
                  <p style={{ color: "#ef4444", fontWeight: 800, fontSize: "1.2rem", margin: 0 }}>{loc.danger}</p>
                </div>
              </div>
              <p style={{ color: "#7d8fa8", fontSize: "0.85rem", margin: "12px 0 0", textAlign: "center" }}>
                Total: {loc.total} readings
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Bar Chart */}
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={locationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" tick={{ fill: "#b9c9de", fontSize: 12 }} />
            <YAxis tick={{ fill: "#b9c9de", fontSize: 12 }} />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ color: "#b9c9de" }} />
            <Bar dataKey="avgTemp" name="Avg Temp °C" fill="#38bdf8" radius={[6, 6, 0, 0]} />
            <Bar dataKey="avgHumidity" name="Avg Humidity %" fill="#34d399" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Reports;