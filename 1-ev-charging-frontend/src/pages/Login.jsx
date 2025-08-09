import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 🔹 Form Validation
  const validateForm = () => {
    let errors = {};
    if (isSignup && !fullName.trim()) errors.fullName = "Full Name is required";
    if (!email.match(/^\S+@\S+\.\S+$/)) errors.email = "Invalid email format";
    if (password.length < 6)
      errors.password = "Password must be at least 6 characters";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 🔹 Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await fetch("http://localhost:5000/auth/google-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: user.displayName,
          email: user.email,
          googleId: user.uid
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setTimeout(() => {
          navigate("/welcome");
        }, 2000); // 2 seconds delay before redirecting
      } else {
        alert(data.error || "Google signup failed");
      }
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      alert("Google sign-in failed, please try again.");
    }
  };


  // 🔹 Handle Manual Login/Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const endpoint = isSignup ? "signup" : "login";
    try {
      const response = await fetch(`http://localhost:5000/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/welcome");
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Server error, please try again later.");
    }
  };

  // 🔹 Handle Toggle and Reset Form
  const handleToggle = () => {
    setIsSignup(!isSignup);
    setFullName("");
    setEmail("");
    setPassword("");
    setErrors({});
  };

  return (
    <div
      className={`login-container d-flex align-items-center justify-content-center ${
        isSignup ? "signup-background" : "login-background"
      }`}
    >
      <div className="form-card p-4 rounded-4 shadow-lg text-white animate__animated animate__fadeInDown">
        <h2 className="mb-4 text-center">
          {isSignup ? "Sign Up for EV Charging" : "Login to EV Charging"}
        </h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-3">
              <input
                type="text"
                className={`form-control ${
                  errors.fullName ? "is-invalid" : ""
                }`}
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
              )}
            </div>
          )}

          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-3 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="text-warning toggle-link" onClick={handleToggle}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>

        <div className="mt-3 text-center">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-danger w-100 mt-2 google-btn"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
