import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

export const EmailVerify = () => {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const { getUserData, isLoggedIn, userData, backEnd } = useContext(AppContext);
  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    e.target.value = value;
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    paste.forEach((digit, i) => {
      if (inputRef.current[i]) {
        inputRef.current[i].value = digit;
      }
    });
    const next = paste.length < 6 ? paste.length : 5;
    inputRef.current[next].focus();
  };

  const handleVerify = async () => {
    const otp = inputRef.current.map((input) => input.value).join("");
    if (otp.length !== 6) {
      toast.error("Enter 6-digits OTP");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(backEnd + "/verify-otp",{otp});
      if (response.status === 200) {
        toast.success("OTP verified successfully");
    await  getUserData();
        navigate("/");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Failed to veirfy OTP.please try again...");
    } finally {
      setLoading(false);
    }
  }
  useEffect(
    ()=>{
      userData &&
      isLoggedIn && userData.isAccountVerified && navigate("/");
    },[isLoggedIn,userData]
  )
  return (
    <div
      className="email-verify-container d-flex align-items-center justify-content-center vh-100 position-relative"
      style={{ backgroundColor: "grey" }}
    >
      <Link
        to="/"
        className="position-absolute top-0 start-0 p-4 align-items-center gap-2 text-decoration-none"
      >
        <img src={assets.logo} alt="logo" height={32} width={32} />
        <span className="fs-4 fw-semibold text-light">Authify</span>
      </Link>
      <div className="p-5 rounded-4 shadow bg-white" style={{ width: "350px" }}>
        <h4 className="text-center mb-2 fw-bold">Email verify Otp</h4>
        <p className="text-center text-dark-50 mb-4">
          Enter the 6-digit code sent to your email
        </p>
        <div className="d-flex justify-content-between gap-1 mb-4 text-white-70 ">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="form-control text-center fs-4 otp-input"
              ref={(element) => (inputRef.current[i] = element)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <button
          className="btn btn-primary w-100 fw-semibold"
          disabled={loading}
          onClick={handleVerify}
        >
          {loading ? "verifying" : "verify email"}
        </button>
      </div>
    </div>
  );
};
