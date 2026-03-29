function Reports({ readings }) {
  const totalReadings = readings.length;

  const warningCount = readings.filter(
    (reading) => reading.status === "Warning"
  ).length;

  const normalCount = readings.filter(
    (reading) => reading.status === "Normal"
  ).length;

  const avgTemperature = (
    readings.reduce((sum, reading) => sum + reading.temperature, 0) /
    totalReadings
  ).toFixed(1);

  const avgHumidity = (
    readings.reduce((sum, reading) => sum + reading.humidity, 0) / totalReadings
  ).toFixed(1);

  const maxTemperature = Math.max(...readings.map((reading) => reading.temperature));
  const maxHumidity = Math.max(...readings.map((reading) => reading.humidity));

  return (
    <section className="page-section">
      <div className="section-heading">
        <span className="section-label">Analysis</span>
        <h2>System Reports</h2>
        <p>
          A quick summary of the stored readings to support basic environmental
          analysis.
        </p>
      </div>

      <div className="reports-grid">
        <div className="card report-card">
          <h3>Total Readings</h3>
          <p>{totalReadings}</p>
        </div>

        <div className="card report-card">
          <h3>Warning Readings</h3>
          <p>{warningCount}</p>
        </div>

        <div className="card report-card">
          <h3>Normal Readings</h3>
          <p>{normalCount}</p>
        </div>

        <div className="card report-card">
          <h3>Average Temperature</h3>
          <p>{avgTemperature}°C</p>
        </div>

        <div className="card report-card">
          <h3>Average Humidity</h3>
          <p>{avgHumidity}%</p>
        </div>

        <div className="card report-card">
          <h3>Highest Temperature</h3>
          <p>{maxTemperature}°C</p>
        </div>

        <div className="card report-card">
          <h3>Highest Humidity</h3>
          <p>{maxHumidity}%</p>
        </div>
      </div>
    </section>
  );
}

export default Reports;