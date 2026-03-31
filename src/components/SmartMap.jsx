import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const statusColors = {
  safe:    "#22c55e",
  warning: "#facc15",
  danger:  "#ef4444",
};

const defaultCoords = {
  "Nablus City Center": [32.2211, 35.2544],
  "Industrial Area":    [32.2100, 35.2700],
  "Near Main Road":     [32.2300, 35.2400],
  "University Zone":    [32.2350, 35.2600],
};

function SmartMap({ readings }) {
  const validReadings = readings.filter((r) => {
    const hasCoords = r.latitude && r.longitude;
    const hasDefault = defaultCoords[r.location];
    return hasCoords || hasDefault;
  });

  return (
    <div className="card map-section">
      <div className="section-heading">
        <span className="section-label">Smart Map</span>
        <h2>Environmental Readings by Location</h2>
        <p>Live map showing environmental status across all monitored zones.</p>
      </div>

      <div className="map-container">
        <MapContainer
          center={[32.2211, 35.2544]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {validReadings.map((reading) => {
            const coords = reading.latitude && reading.longitude
              ? [reading.latitude, reading.longitude]
              : defaultCoords[reading.location];

            return (
              <CircleMarker
                key={reading.id}
                center={coords}
                radius={14}
                pathOptions={{
                  color: statusColors[reading.status],
                  fillColor: statusColors[reading.status],
                  fillOpacity: 0.75,
                }}
              >
                <Popup>
                  <div style={{ minWidth: "160px" }}>
                    <strong>📍 {reading.location}</strong><br />
                    🌡️ Temp: {reading.temperature}°C<br />
                    💧 Humidity: {reading.humidity}%<br />
                    ⚠️ Status:{" "}
                    <span style={{ color: statusColors[reading.status], fontWeight: 700 }}>
                      {reading.status.toUpperCase()}
                    </span><br />
                    🕐 {reading.date}
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      <div className="map-legend">
        <div className="legend-item"><div className="legend-dot safe"></div><span>Safe</span></div>
        <div className="legend-item"><div className="legend-dot warning"></div><span>Warning</span></div>
        <div className="legend-item"><div className="legend-dot danger"></div><span>Danger</span></div>
      </div>
    </div>
  );
}

export default SmartMap;