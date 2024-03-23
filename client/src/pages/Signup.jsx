import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from 'react-router-dom'; 

export default function Signup() {
  const [name, setName] = useState({ firstname: "", lastname: "" });
  const [email, setEmail] = useState({ email: "" });
  const [studentid, setStudentid] = useState({ studentid: "" });
  const [password, setPassword] = useState({ password: "" });
  const [confirmPassword, setConfirmPassword] = useState({ confirmPassword: "" });
  const [dob, setDob] = useState({ dob: "" });
  const [gender, setGender] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const {signup, error, isLoading} =useSignup()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await signup(email.email, password.password,studentid.studentid);
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
  
    setButtonClicked(true);
    //navigate("/welcome");
  };
  

  return (
    <div style={{
      background: "#f7f7f7",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      color: "#333",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      <div style={{ flex: 1, padding: "20px", textAlign: "left" }}>
        <h1 style={{ fontSize: "2.5em", marginBottom: "20px", fontWeight: "bold", letterSpacing: "1px", color: "#333" }}>Sign Up Now</h1>
        <p style={{ fontSize: "1.2em", lineHeight: "1.5", color: "#666" }}>
          Join our community and get access to exclusive features! Sign up now to stay connected and be a part of something amazing.
        </p>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        <form style={{ marginBottom: "20px", width: "100%", maxWidth: "400px", background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", marginBottom: "20px" }}>
  <input
    onChange={(e) => setName({ ...name, firstname: e.target.value })}
    type="text"
    value={name.firstname}
    placeholder="First Name"
    style={{ flex: 1, fontSize: "1.2em", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", marginRight: "5px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
  />
  <input
    onChange={(e) => setName({ ...name, lastname: e.target.value })}
    type="text"
    value={name.lastname}
    placeholder="Last Name"
    style={{ flex: 1, fontSize: "1.2em", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
  />
</div>

           

          <input
            onChange={(e) => setEmail({ email: e.target.value })}
            type="email"
            value={email.email}
            placeholder="Email Address"
            style={{ fontSize: "1.2em", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", marginBottom: "20px", width: "100%", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          />
          <input
            onChange={(e) => setStudentid({ studentid: e.target.value })}
            type="number"
            value={studentid.studentid}
            placeholder="Student Id"
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

          <div style={{ display: "flex", marginBottom: "20px" }}>
            <input
              onChange={(e) => setGender(e.target.value)}
              type="text"
              value={gender}
              placeholder="Gender"
              style={{ flex: 1, fontSize: "1.2em", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", marginRight: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
            />
            <input
              onChange={(e) => setDob({ dob: e.target.value })}
              type="date"
              value={dob.dob}
              style={{ flex: 1, fontSize: "1.2em", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
            />
          </div>

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
