import { useState } from "react";
import { Link } from "react-router-dom"; 
import { useLogin } from "../hooks/useAdminLogin"


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [buttonClicked, setButtonClicked] = useState(false);
  const {login} = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  
    setButtonClicked(true);
  }

  return (
    <div style={{
      background: "#f7f7f7",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#333",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      <h1 style={{ fontSize: "2.5em", marginBottom: "20px", fontWeight: "bold", letterSpacing: "1px", color: "#333" }}>Login</h1>

      <form style={{ width: "300px", background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          value={email}
          placeholder="Email"
          style={{ fontSize: "1.2em", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", marginBottom: "20px", width: "100%", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="Password"
          style={{ fontSize: "1.2em", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", marginBottom: "20px", width: "100%", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
        />

       

        <button
          className="login-button"
          onClick={(e) => handleSubmit(e)}
          style={{
            fontSize: "1.5em",
            padding: "15px 30px",
            backgroundColor: buttonClicked ? "#4caf50" : "#333",
            color: buttonClicked ? "#fff" : "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            width: "100%",
          }}
        >
          {buttonClicked ? "Logging In..." : "Log In"}
        </button>

        <p style={{ marginTop: "20px", fontSize: "1.2em" }}>
          <Link to="/admin/signup" style={{ color: "#3498db" }}>Sign up as Admin</Link>
        </p>
      </form>
    </div>
  );
}
