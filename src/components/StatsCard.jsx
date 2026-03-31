function StatsCard({ title, value, unit, type, trend }) {
  const formatValue = () => {
    if (type === "status") {
      return String(value).charAt(0).toUpperCase() + String(value).slice(1);
    }
    return `${value}${unit}`;
  };

  const renderTrend = () => {
    if (trend === undefined || trend === null || trend === 0) return null;
    const isUp = trend > 0;
    return (
      <span style={{
        fontSize: "0.85rem",
        fontWeight: 700,
        color: isUp ? "#f87171" : "#34d399",
        display: "flex",
        alignItems: "center",
        gap: "2px",
        marginTop: "8px",
      }}>
        {isUp ? "↑" : "↓"} {Math.abs(trend)}{unit} from last reading
      </span>
    );
  };

  return (
    <div className={`stats-card ${type}`}>
      <div className="stats-card-top">
        <span className="stats-card-title">{title}</span>
        <span className="stats-card-icon">
          {type === "temperature" && "🌡️"}
          {type === "humidity" && "💧"}
          {type === "status" && "⚠️"}
          {type === "location" && "📍"}
        </span>
      </div>

      <div className="stats-card-value">
        {type === "status" ? (
          <span className={`status-badge ${String(value).toLowerCase()}`}>
            {formatValue()}
          </span>
        ) : (
          formatValue()
        )}
      </div>

      {renderTrend()}
    </div>
  );
}

export default StatsCard;