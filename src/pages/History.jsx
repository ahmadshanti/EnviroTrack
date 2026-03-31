import { useState } from "react";
import Navbar from "../components/Navbar";
import SmartMap from "../components/SmartMap";

function History({ readings }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLocation, setFilterLocation] = useState("");
  const [searchTemp, setSearchTemp] = useState("");

  const locations = [...new Set(readings.map((r) => r.location))];

  const filtered = readings
    .slice()
    .reverse()
    .filter((r) => {
      const statusMatch = filterStatus === "all" || r.status === filterStatus;
      const locationMatch = filterLocation === "" || r.location === filterLocation;
      const tempMatch = searchTemp === "" || r.temperature >= Number(searchTemp);
      return statusMatch && locationMatch && tempMatch;
    });

  return (
    <div className="app">
      <Navbar />

      {/* Hero */}
      <div className="page-hero card" style={{ marginBottom: "24px", padding: "28px 34px" }}>
        <span className="section-label">📋 Records</span>
        <h1 style={{ fontSize: "2rem", color: "#fff", margin: "10px 0 8px" }}>Readings History</h1>
        <p style={{ color: "#b9c9de" }}>Review all saved environmental readings with location and status details.</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: "20px", padding: "20px", display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ color: "#93c5fd", fontWeight: 600 }}>🔍 Filter:</span>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(148,163,184,0.22)",
            borderRadius: "12px",
            padding: "10px 14px",
            color: "#fff",
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          <option value="all">All Status</option>
          <option value="safe">✅ Safe</option>
          <option value="warning">⚠️ Warning</option>
          <option value="danger">🚨 Danger</option>
        </select>

        {/* Location Filter */}
        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          style={{
            background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(148,163,184,0.22)",
            borderRadius: "12px",
            padding: "10px 14px",
            color: "#fff",
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          <option value="">All Locations</option>
          {locations.map((loc, i) => (
            <option key={i} value={loc}>{loc}</option>
          ))}
        </select>

        {/* Min Temp Filter */}
        <input
          type="number"
          placeholder="Min Temperature °C"
          value={searchTemp}
          onChange={(e) => setSearchTemp(e.target.value)}
          style={{
            background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(148,163,184,0.22)",
            borderRadius: "12px",
            padding: "10px 14px",
            color: "#fff",
            fontSize: "0.95rem",
            width: "180px",
          }}
        />

        {/* Reset */}
        <button
          onClick={() => { setFilterStatus("all"); setFilterLocation(""); setSearchTemp(""); }}
          style={{
            width: "auto",
            padding: "10px 16px",
            background: "rgba(239,68,68,0.15)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "12px",
            color: "#ef4444",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          ✕ Reset
        </button>

        <span style={{ color: "#7d8fa8", fontSize: "0.88rem", marginLeft: "auto" }}>
          Showing {filtered.length} of {readings.length} readings
        </span>
      </div>

      {/* Table */}
      <section className="card" style={{ marginBottom: "24px" }}>
        <div className="section-heading">
          <span className="section-label">All Records</span>
          <h2>Environmental Readings</h2>
        </div>

        <div className="table-card history-table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#7d8fa8", padding: "30px" }}>
                    No readings match your filters
                  </td>
                </tr>
              ) : (
                filtered.map((reading, index) => (
                  <tr key={reading.id}>
                    <td style={{ color: "#60a5fa", fontWeight: 700 }}>{index + 1}</td>
                    <td>🌡️ {reading.temperature}°C</td>
                    <td>💧 {reading.humidity}%</td>
                    <td>📍 {reading.location}</td>
                    <td>
                      <span className={`status-badge ${reading.status}`}>
                        {reading.status}
                      </span>
                    </td>
                    <td style={{ color: "#7d8fa8", fontSize: "0.88rem" }}>{reading.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Map */}
      <SmartMap readings={readings} />
    </div>
  );
}

export default History;