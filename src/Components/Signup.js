import React, { useRef, useState } from "react";
import GoogleIcon from "../images/google-icon.svg";
import db from '../config/firebase';
import { auth, provider } from "../config/firebase"; // Import Firebase Authentication, Firestore, and other configurations
import { Dialog } from "@material-ui/core";
import "./Signup.css";
import Login from "./Login";

function Signup({ handleCloseLoginModal }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleLoginButtonClick = () => {
    setShowLoginModal(true);
  };
  const containerRef = useRef();

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        db.collection("users")
          .doc(user.uid)
          .set({
            name: name,
            email: email,
          })
          .then(() => {
            // Handle successful signup
            console.log("User signed up successfully!");
            setTimeout(function () {
              window.location = "index.html";
            }, 2000);
          })
          .catch((error) => {
            // Handle Firestore save error
            console.error("Error saving user data to Firestore:", error);
            // You may want to delete the created user from Firebase Authentication here to maintain consistency between Auth and Firestore.
            user.delete().catch((deleteError) => {
              console.error("Error deleting user:", deleteError);
            });
            alert("Error: " + error);
          });
      })
      .catch((error) => {
        // Handle signup error
        console.error("Error creating user:", error);
        alert("Error: " + error.message);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => res)
      .catch((err) => alert(err.message));
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Sign Up</h2>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          className="input-field"
          placeholder="Enter your full name"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="input-field"
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="input-field"
          placeholder="Enter your password"
        />
        <div className="popup-btn">
          <button className="submit-btn" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
        <span className="signup-link">
          Already Registered?{' '}
          <span className="link-form" onClick={handleLoginButtonClick}>
            Sign In
          </span>
        </span>
        <div ref={containerRef} className="login__container">
          <button onClick={signInWithGoogle} className="login__googleBtn">
            <img src={GoogleIcon} alt="Google Icon" className="login__google" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
      <Dialog open={showLoginModal} onClose={handleCloseLoginModal}>
       <Login handleCloseLoginModal={handleCloseLoginModal}  />
      </Dialog>
    </div>
  );
}

export default Signup;
