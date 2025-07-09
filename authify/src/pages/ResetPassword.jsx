import React, { useContext, useRef, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const { getUserData, isLoggedIn, userData, backEnd } = useContext(AppContext);
  axios.defaults.withCredentials = true;
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
  }
  const onSubmitHandler= async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const response=await axios.post(backEnd + "/send-otp-email?email=" + email);
      if(response.status === 200)
        {
          toast.success("Email sent successfully. Please check your inbox.");
          setIsEmailSent(true)
  
    }
    else{
      toast.error("Failed to send email. Please try again.");
    }
  }
    catch(error)
    {
      console.error("Error sending email:", error);
      toast.error("An error occurred while sending the email. Please try again.");
    } finally
    {
      setLoading(false);
    }
  }
const handleVerify=() =>
   {
    const otp=inputRef.current.map((input) => input.value).join("");
    if (otp.length !=6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;  
}
setOtp(otp);
setIsOtpSubmitted(true);
   }

   const onSubmitResetPassword = async (e) =>
     {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backEnd +"/reset-password",{email, newPassword,otp });
      if(response.status === 200) {
        toast.success("Password reset successfully.");
        navigate("/login");
      }
      else{
        toast.error("Failed to reset password. Please try again.");
      }
   }
   catch (error) {
toast.error(error.response?.data?.message || "An error occurred while resetting the password. Please try again.");
   }
   finally {
    setLoading(false);
   }
  }
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 position-relative"
      style={{border: "none", background: "gray" }}
    >
      <Link
        to="/"
        className="position-absolute top-0 start-0 p-4 align-items-center gap-2 text-decoration-none"
      >
        <img src={assets.logo} alt="logo" height={32} width={30} />
        <span className="fs-4 fw-semibold text-light">Authify</span>
      </Link>
{/* email verify card */}
      {!isEmailSent && (
        <div
          className="rounded-4 p-5 text-center bg-white "
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h4 className="mb-2">Reset Password</h4>
          <p className="mb-4">Enter your registered email address</p>
          <form onSubmit={onSubmitHandler}>
            <div className="input-group mb-2 bg-secondary bg-opacity-10 rounded-pill">
              <span className="input-group-text bg-transparent border-0 ps-4">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control bg-transparent border-0  ps-1 pe-4 rounded-end"
                placeholder="Enter your email"
                style={{ height: "50px" }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <button className="btn btn-primary w-10 py-2" type="submit" disabled={loading}>
             {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      )}
      {/* opt  card*/}
      {!isOtpSubmitted && isEmailSent && (
        <div
          className="p-5 rounded-4 shadow bg-white"
          style={{ width: "350px" }}
        >
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
            disabled={loading} onClick={handleVerify}
          >
            {loading ? "verifying" : "verify email"}
          </button>
        </div>
      )}
      {/* new password form */}
      {isOtpSubmitted && isEmailSent && (
        <div
          className="rounded-4 p-4 text-center bg-white"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h4>New Password</h4>
          <p className="mb-4">Enter the new Password below</p>
          <form onSubmit={onSubmitResetPassword}>
            <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
              <span className="input-group-text bg-transparent border-0 ps-4">
                <i className="bi bi-person-fill-lock"></i>
              </span>
              <input
                type="password"
                className="form-control bg-transparent border-0 ps-1 pe-4 rounded-end"
                placeholder="*******"
                style={{ height: "50px" }}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading} >
              {loading ? "Resetting..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
