function AlertBox({ message }) {
  if (!message) return null;

  return (
    <div className="alert-box">
      <div className="alert-icon">!</div>
      <div>
        <strong>Warning Detected</strong>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default AlertBox;