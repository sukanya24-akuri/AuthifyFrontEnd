import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import "../pages/Style.css";

export const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { backEnd, setIsLoggedIn ,getUserData} = useContext(AppContext);
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    try {
      if (isCreateAccount) {
        const reponse = await axios.post(`${backEnd}/register`, {
          name,
          email,
          password,
        });

        if (reponse.status === 201) {
          navigate("/");
          toast.success("Account created successfully");
        } else {
          toast.error("Email already exists");
        }
      } else {
        const response = await axios.post(`${backEnd}/login`, {
          email,
          password,
        });

        if (response.status === 201 || response.status === 200) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
          toast.success("Logged in successfully");
        } else {
          toast.error("Incorrect email and password");
        }
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-relative min-vh-100 d-flex justify-content-center align-items-center login-container"
      style={{
        backgroundColor: "white",
        border: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            gap: 5,
            fontSize: "24px",
            textDecoration: "none",
            alignItems: "center",
          }}
        >
          <img src={assets.logohome} alt="logo" height={32} width={32} />
          <span className="fw-bold fs-4 text-white">Authify</span>
        </Link>
      </div>
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">
          {isCreateAccount ? "Create Account" : "Login"}
        </h2>
        <form onSubmit={onSubmitHandler}>
          {isCreateAccount && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter full name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Id
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password atleast 6 characters"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {!isCreateAccount && (
          <div className="d-flex justify-content-between mb-3">
            <Link to="/reset-password" className="text-decoration-none">
              Forgot Password
            </Link>
          </div>)}
          <button
            type="submit "
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Loading" : isCreateAccount ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">
            {isCreateAccount ? (
              <>
                Already have an account?
                <span
                  onClick={() => setIsCreateAccount(false)}
                  className="text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setIsCreateAccount(true)}
                  className="text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  Sign up
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
