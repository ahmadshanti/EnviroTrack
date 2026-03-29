function History({ readings }) {
  return (
    <section className="page-section card">
      <div className="section-heading">
        <span className="section-label">Records</span>
        <h2>Readings History</h2>
        <p>Review all saved environmental readings in one place.</p>
      </div>

      <div className="table-card history-table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
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
              .map((reading, index) => (
                <tr key={reading.id}>
                  <td>{index + 1}</td>
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
    </section>
  );
}

export default History;