function ReadingsTable({ readings }) {
  return (
    <div className="card table-card">
      <div className="section-heading">
        <span className="section-label">History</span>
        <h2>Recent Readings</h2>
        <p>
          A record of the latest environmental readings, including location,
          status, and monitoring date.
        </p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Location</th>
            <th>Status</th>
            <th>Date</th>
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
                <td>{reading.location}</td>
                <td>
                  <span className={`status-badge ${reading.status}`}>
                    {reading.status}
                  </span>
                </td>
                <td>{reading.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReadingsTable;