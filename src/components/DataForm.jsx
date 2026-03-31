import { useState } from "react";

function DataForm({ onAddReading }) {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!temperature || !humidity || !location || !latitude || !longitude) return;

    const tempValue = Number(temperature);
    const humidityValue = Number(humidity);
    const lat = Number(latitude);
    const lng = Number(longitude);

    let status = "safe";
    if (tempValue > 35 || humidityValue > 75) {
      status = "danger";
    } else if (tempValue >= 28 || humidityValue >= 60) {
      status = "warning";
    }

    const newReading = {
      id: Date.now(),
      temperature: tempValue,
      humidity: humidityValue,
      location,
      latitude: lat,
      longitude: lng,
      status,
      date: new Date().toLocaleString(),
    };

    onAddReading(newReading);

    setTemperature("");
    setHumidity("");
    setLocation("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="section-heading">
        <span className="section-label">Input Panel</span>
        <h2>Add New Reading</h2>
        <p>Enter the latest environmental values and link them to a specific location.</p>
      </div>

      <div className="form-group">
        <label>Temperature (°C)</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          placeholder="e.g. 29"
        />
      </div>

      <div className="form-group">
        <label>Humidity (%)</label>
        <input
          type="number"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          placeholder="e.g. 64"
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Nablus City Center"
        />
      </div>

      <div className="form-group">
        <label>Latitude</label>
        <input
          type="number"
          step="any"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="e.g. 32.2211"
        />
      </div>

      <div className="form-group">
        <label>Longitude</label>
        <input
          type="number"
          step="any"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="e.g. 35.2544"
        />
      </div>

      <button type="submit">Add Reading</button>
    </form>
  );
}

export default DataForm;