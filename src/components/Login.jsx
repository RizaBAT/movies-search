import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass.length < 7) {
      setError("Password must be at least 7 characters.");
      return;
    }
    if (action === "Sign Up") {
      setIsRegistered(true);
      setAction("Login");
      console.log("User is being registered...");
    } else {
      console.log("Logging in...");
      handleLogin();
    }
    setSubmitted(true);
    setEmail("");
    setPass("");
    setUsername("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

 const handleLogin = () => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (isRegistered) {
      if (email !== storedEmail && pass !== storedPassword){
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setError("");
        navigate("/search");
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("You must register first.");
    }
};

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password"); 
    setIsLoggedIn(false);
    setEmail("");
    setPass("");
    setAction("Sign Up");
  };

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.removeItem("isLoggedIn");
    }
  }, [isLoggedIn]);

  
  return (
    <div className="wrapper">
        <form action="" onSubmit={handleSubmit}>
        <h1>{action}</h1>
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input-box">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
            <FaUser className="icon" />
          </div>
        )}
      <div className="input-box">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            required
          />
          <MdEmail className="icon" />
        </div>
        <div className="input-box">
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Password"
            required
            onKeyPress={handleKeyPress}
          />
          <FaLock className="icon" />
        </div>
        {error && <div className="error">{error}</div>}
        {action === "Sign Up" ? (
          <div className="remember-forgot">
            <button type="submit">Sign Up</button>
            <p>
              Do you already have an account?
              <a
                href="/search"
                onClick={(e) => {
                  e.preventDefault();
                  setAction("Login");
                }}
              >
                Login
              </a>
            </p>
          </div>
        ) : (
          <div className="remember-forgot">
            <button type="submit">Login</button>
            <p>
              Don't have an account?
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setAction("Sign Up");
                }}
              >
                 Sign Up
              </a>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
