
import React, { useState } from "react";
import {BsBoxArrowInRight,BsEnvelope,BsLock,BsEye,BsEyeSlash,BsPerson,BsPersonPlus,BsX,
} from "react-icons/bs";
import logo from '../assets/logo.png';
import "./login.css";

const Login = ({onLogin}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // =========================
  // LOGIN
  // =========================
//   const handleLogin = (e) => {
//     e.preventDefault();

//     // You can add real authentication/API here later.

//     if (!email || !password) {
//       alert("Please enter your email and password.");
//       return;
//     }

//     // Save login information
//     localStorage.setItem("token", "logged-in");
//     localStorage.setItem("user", JSON.stringify({ email }));

//     // THIS sends the user to the Dashboard
//     onLogin();
//   };

//   // =========================
//   // REGISTER
//   // =========================
//   const handleRegister = (e) => {
//     e.preventDefault();

//     if (!registerEmail || !registerPassword || !confirmPassword) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     if (registerPassword !== confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     // Save registration information
//     localStorage.setItem(
//       "user",
//       JSON.stringify({
//         email: registerEmail,
//       })
//     );

//     alert("Account created successfully!");

//     // Return to login screen
//     setShowRegister(false);

//     setEmail(registerEmail);
//     setPassword("");

//     setRegisterEmail("");
//     setRegisterPassword("");
//     setConfirmPassword("");
//   };

const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter username and password.");
      return;
    }

    localStorage.setItem("token", "temporary-login");

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: email,
      })
    );

    // Open dashboard
    onLogin();
  };

  // TEMPORARY REGISTER
  const handleRegister = (e) => {
    e.preventDefault();

    if (!registerEmail || !registerPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (registerPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Account created successfully!");

    setEmail(registerEmail);
    setPassword("");

    setRegisterEmail("");
    setRegisterPassword("");
    setConfirmPassword("");

    setShowRegister(false);
  };


  return (
    <div className="login-page">

      {/* ================= LOGIN CARD ================= */}

      <div className="login-card">

        {/* Login Icon */}
        <div>
          <img src={logo} alt="Logo" className="loginImg" />
        </div>

        {/* Heading */}
        <div className="login-header">
          <h1>Welcome Back</h1>

          <p>
            Sign in to Equipment Track Management
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          {/* Username */}
          <div className="form-group">
            <label>Username</label>

            <div className="input-wrapper">
              <BsEnvelope className="input-icon" />

              <input
                type="text"
                placeholder="Enter your username"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <div className="input-wrapper">
              <BsLock className="input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <BsEyeSlash />
                ) : (
                  <BsEye />
                )}
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="login-options">

            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="forgot-password"
            >
              Forgot password?
            </button>

          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="sign-in-button"
            onClick={() => setShowRegister(false)}
          >
            Sign In
            <BsBoxArrowInRight />
          </button>

        </form>


        {/* ================= REGISTER BUTTON ================= */}

        <div className="register-section">

          <p>Don't have an account?</p>

          <button
            type="button"
            className="register-button"
            onClick={() => setShowRegister(true)}
          >
            <BsPersonPlus />

            Create an Account
          </button>

        </div>


        {/* Footer */}
        <div className="login-footer">

          <div className="footer-divider"></div>

          <h3>
            Equipment Track Management System
          </h3>

          <p>
            Inventory &amp; Asset Management
          </p>

        </div>

      </div>


      {/* =================================================
          REGISTRATION POPUP
      ================================================= */}

      {showRegister && (
        <div
          className="modal-overlay"
          onClick={() => setShowRegister(false)}
        >

          <div
            className="register-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="modal-header">

              <div className="modal-heading">

                <div className="modal-icon">
                  <BsPersonPlus />
                </div>

                <div>
                  <h2>Create Account</h2>

                  <p>
                    Register for Equipment Track Management
                  </p>
                </div>

              </div>

              {/* Close */}
              <button
                type="button"
                className="close-button"
                onClick={() => setShowRegister(false)}
              >
                <BsX />
              </button>

            </div>


            {/* Registration Form */}
            <form
              className="register-form"
              onSubmit={handleRegister}
            >

              {/* Full Name */}
              <div className="form-group">

                <label>Full Name</label>

                <div className="input-wrapper">

                  <BsPerson className="input-icon" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />

                </div>

              </div>


              {/* Email */}
              <div className="form-group">

                <label>Email Address</label>

                <div className="input-wrapper">

                  <BsEnvelope className="input-icon" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                  />

                </div>

              </div>

              {/* Password */}
              <div className="form-group">

                <label>Password</label>

                <div className="input-wrapper">

                  <BsLock className="input-icon" />

                  <input
                    type={
                      showRegisterPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a password"
                    minLength="6"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowRegisterPassword(
                        !showRegisterPassword
                      )
                    }
                  >
                    {showRegisterPassword ? (
                      <BsEyeSlash />
                    ) : (
                      <BsEye />
                    )}
                  </button>

                </div>

              </div>


              {/* Confirm Password */}
              <div className="form-group">

                <label>Confirm Password</label>

                <div className="input-wrapper">

                  <BsLock className="input-icon" />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    minLength="6"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? (
                      <BsEyeSlash />
                    ) : (
                      <BsEye />
                    )}
                  </button>

                </div>

              </div>


              {/* Terms */}
              <label className="terms">

                <input
                  type="checkbox"
                  required
                />

                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    className="terms-link"
                  >
                    Terms & Conditions
                  </button>
                </span>

              </label>


              {/* Modal Buttons */}
              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowRegister(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="create-button"
                >
                  <BsPersonPlus />

                  Create Account
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Login;