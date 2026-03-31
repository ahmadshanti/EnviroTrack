import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !registrationNumber) return;

    localStorage.setItem("username", username);
    localStorage.setItem("registrationNumber", registrationNumber);

    navigate("/dashboard");
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <span className="section-label">Welcome</span>
        <h1>Environmental Tracking System</h1>
        <p>
          Enter your name and registration number to access the monitoring
          dashboard.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Registration Number</label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="Enter your registration number"
            />
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
    </section>
  );
}

export default Login;