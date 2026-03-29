function ReadingsTable({ readings }) {
  return (
    <div className="card table-card">
      <div className="section-heading">
        <span className="section-label">History</span>
        <h2>Recent Readings</h2>
        <p>A record of the latest temperature and humidity measurements.</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {readings
            .slice()
            .reverse()
            .map((reading) => (
              <tr key={reading.id}>
                <td>{reading.temperature}°C</td>
                <td>{reading.humidity}%</td>
                <td>
                  <span
                    className={`status-badge ${
                      reading.status === "Warning" ? "warning" : "normal"
                    }`}
                  >
                    {reading.status}
                  </span>
                </td>
                <td>{reading.time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReadingsTable;