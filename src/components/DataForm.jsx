import { useState } from "react";

function DataForm({ onAddReading }) {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!temperature || !humidity) return;

    const tempValue = Number(temperature);
    const humidityValue = Number(humidity);

    let status = "Normal";
    if (tempValue > 35 || humidityValue > 75) {
      status = "Warning";
    }

    const newReading = {
      id: Date.now(),
      temperature: tempValue,
      humidity: humidityValue,
      status,
      time: new Date().toLocaleString(),
    };

    onAddReading(newReading);
    setTemperature("");
    setHumidity("");
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="section-heading">
        <span className="section-label">Input Panel</span>
        <h2>Add New Reading</h2>
        <p>Enter the latest environmental values to update the dashboard.</p>
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

      <button type="submit">Add Reading</button>
    </form>
  );
}

export default DataForm;