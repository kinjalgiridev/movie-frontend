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
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        showToast("Login successful", "success");
        router.push('/list'); 
      }
    } catch (error) {
      showToast("Invalid email or password", "error");
      console.error(error);
    }
  };

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
