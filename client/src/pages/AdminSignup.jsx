import React, { useState } from "react";
import { useSignup } from "../hooks/useAdminSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ password: "" });
  const [confirmPassword, setConfirmPassword] = useState({ confirmPassword: "" });
  const [secretKey, setSecretKey] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.password !== confirmPassword.confirmPassword) {
      setPasswordMessage("Passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isStrongPassword = passwordRegex.test(password.password);

    if (!isStrongPassword) {
      setPasswordMessage("Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.");
      return;
    }

    if (secretKey !== "burger") {
      setPasswordMessage("Incorrect secret key.");
      return;
    }

    await signup( email, password.password);
    setButtonClicked(true);
  };

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", color: "#333", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ flex: 1, padding: "20px", textAlign: "left" }}>
        <h1 style={{ fontSize: "2.5em", marginBottom: "20px", fontWeight: "bold", letterSpacing: "1px", color: "#333" }}>Sign Up As Admin Now</h1>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        <form style={{ marginBottom: "20px", width: "100%", maxWidth: "400px", background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
         
            

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder="Email Address"
            style={{ fontSize: "1.2em", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", marginBottom: "20px", width: "100%", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          />

          <input
            onChange={(e) => setPassword({ password: e.target.value })}
            type="password"
            value={password.password}
            placeholder="Password"
            style={{ fontSize: "1.2em", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", marginBottom: "20px", width: "100%", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          />

          <input
            onChange={(e) => setConfirmPassword({ confirmPassword: e.target.value })}
            type="password"
            value={confirmPassword.confirmPassword}
            placeholder="Confirm Password"
            style={{ fontSize: "1.2em", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", marginBottom: "20px", width: "100%", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          />

          {/* Secret Key Input */}
          <input
            onChange={(e) => setSecretKey(e.target.value)}
            type="text"
            value={secretKey}
            placeholder="Secret Key"
            style={{ fontSize: "1.2em", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", marginBottom: "20px", width: "100%", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          />

          {/* Password Strength Message */}
          {passwordMessage && (
            <>
              <p style={{ color: "#ff4d4f", fontSize: "1.2em", margin: "0 0 20px 0" }}>
                {passwordMessage}
              </p>
            </>
          )}

          <button
            disabled={isLoading}
            className={`signup-button ${error ? 'error-button' : ''}`}
            onClick={(e) => handleSubmit(e)}
            style={{
              fontSize: "1.5em",
              padding: "15px 30px",
              backgroundColor: buttonClicked ? "#4caf50" : (error ? "red" : "#333"),
              color: buttonClicked || error ? "#fff" : "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              width: "100%",
            }}
          >
            {buttonClicked ? "Signed Up!" : "Sign Up"}
          </button>

          {error && <div className="error">{error} </div>}
        </form>
      </div>
    </div>
  );
}
