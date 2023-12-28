import React, { useState } from "react";
import styles from "./signin.module.css";
import { useRouter } from "next/router";
import vector from "../public/Vectors.png";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const showToast = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded credentials
    const hardcodedEmail = "admin@gmail.com";
    const hardcodedPassword = "123456";

    if (email === hardcodedEmail && password === hardcodedPassword) {
      // Hardcoded credentials match, simulate a successful login
      showToast("Login successful!", "success");
      router.push("/list");
    } else {
      // Hardcoded credentials do not match, show error toast
      showToast("Login failed. Please check your credentials.", "error");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:5000/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     });

  //     if (response.ok) {
  //       showToast("Login successful!", "success");
  //       router.push("/list");
  //     } else {
  //       setEmail("");
  //       setPassword("");
  //       setRememberMe("");
  //       const responseData = await response.json();

  //       if (response.status === 401) {
  //         console.error("Unauthorized: Invalid credentials");
  //       } else {
  //         showToast(responseData.message || "Login failed. Please check your credentials.", "error");
  //       }
  //     }
  //   } catch (error) {
  //     // Handle other errors and show toast
  //     setEmail("");
  //     setPassword("");
  //     setRememberMe("");
  //     showToast("An error occurred. Please try again later.", "error");
  //   }
  // };

  return (
    <div className="containerMovie">
      <form onSubmit={handleSubmit} className="">
        <h1 className="title mb-5">Sign in</h1>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.rememberMe}>
          <input
            type="checkbox"
            id="rememberMe"
            className={styles.checkbox}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe" className="rememberMeText">
            Remember Me
          </label>
        </div>
        <button type="submit" className={styles.button}>
          <span className="submitText py-3">Login</span>
        </button>
      </form>
      <div className="position-absolute bottom-0 left-0">
        <Image src={vector} alt="Your Alt Text" style={{ width: "100vw" }} />
      </div>
    </div>
  );
};

export default SignIn;
