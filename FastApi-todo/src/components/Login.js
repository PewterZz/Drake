import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await response.json();
    console.log(data);
    if (data.message === "Login successful") {
      navigate("/homepage");
    }
  };



  const handleResetPassword = () => {

  };  

  const provider = new GoogleAuthProvider();

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="welcome">
      <h1>Todo-List</h1>
      <div className="login-register-container">
            <input type="email" placeholder="Email" onChange={handleEmailChange} value={email} />
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
            />
            <button className="sign-in-register-button" onClick={handleSignIn}>
              Sign In
            </button>
            <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
            <button onClick={handleResetPassword}>Reset Password</button>
            <button
              className="create-account-button"
              onClick={() => navigate("/register")}
            >
              Create an account
            </button>
      </div>
    </div>
  );
}
