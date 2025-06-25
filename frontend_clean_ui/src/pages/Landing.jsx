import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>🔐 Welcome to Password Reminder Service</h2>
      <p>Please choose an option to continue:</p>
      <button onClick={() => navigate("/login")}>Existing User? Login</button>
      <br /><br />
      <button onClick={() => navigate("/register")}>New User? Register</button>
    </div>
  );
}

export default Landing;
