function AlertBox({ message, type, location }) {
  if (!message) return null;

  let title = "";
  let icon = "";
  let tips = "";

  if (type === "danger") {
    title = "Danger Detected";
    icon = "🚨";
    tips = "Immediate action recommended. Avoid the area if possible.";
  } else if (type === "warning") {
    title = "Warning";
    icon = "⚠️";
    tips = "Monitor conditions closely and take precautionary measures.";
  } else {
    title = "All Good";
    icon = "✅";
    tips = "Environmental conditions are within safe limits.";
  }

  return (
    <div className={`alert-box ${type}`}>
      <div className="alert-icon">{icon}</div>
      <div className="alert-content">
        <strong>{title}</strong>
        {location && (
          <span className="alert-location">📍 {location}</span>
        )}
        <p>{message}</p>
        <p className="alert-tips">{tips}</p>
      </div>
    </div>
  );
}

export default AlertBox;