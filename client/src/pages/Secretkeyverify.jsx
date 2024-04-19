import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SecretKeyVerification = () => {
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleVerification = (e) => {
    e.preventDefault();
    // Replace 'YOUR_SECRET_KEY' with your predefined secret key
    if (secretKey === 'burger') {
      // Redirect to the signup page if the key is correct
      history.push("/signup");
    } else {
      // Display an error message if the key is incorrect
      setError("Invalid secret key");
    }
  };

  return (
    <div>
      <h1>Secret Key Verification</h1>
      <form onSubmit={handleVerification}>
        <input
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="Enter Secret Key"
        />
        <button type="submit">Verify</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SecretKeyVerification;
