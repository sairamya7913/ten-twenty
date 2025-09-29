import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSavedCredentials, login } from "../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load saved credentials
  useEffect(() => {
    const saved = getSavedCredentials();
    if (saved) {
      setEmail(saved.email);
      setPassword(saved.password);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await login(email, password, remember);
    if (response.success) {
      navigate("/dashboard");
    } else {
      setError(response.message || "Login failed");
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      {/* Left Side (Form) */}
      <div className="d-flex flex-column justify-content-center align-items-center col-12 col-md-6 bg-white p-4">
        <div className="w-100 w-md-75">
          <h3 className="mb-4 fw-bold text-center text-md-start">Welcome back</h3>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* Right Side (Branding) */}
      <div className="d-none d-md-flex col-md-6 bg-primary text-white justify-content-center align-items-center p-4">
        <div className="w-100 text-center">
          <h2 className="fw-bold">ticktock</h2>
          <p className="mt-3">
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours. With
            ticktock, you can effortlessly track and monitor employee
            productivity from anywhere, anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
