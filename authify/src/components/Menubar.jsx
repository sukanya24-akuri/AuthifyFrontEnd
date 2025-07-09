import { useNavigate } from "react-router-dom";
import logohome from "../assets/logohome.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { emit } from "dom/lib/event";

export const Menubar = () => {
  const navigate = useNavigate();
  const { userData, backEnd, setIsLoggedIn, setUserData } =
    useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
   axios.defaults.withCredentials = true;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(backEnd + "/logout");
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const sendEmailVerificationOTP = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(backEnd + "/send-otp");
      
      if (response.status === 200) {
        
        toast.success("OPT has been sent successfully");
        navigate("/emailverify");
        
      } else {
        toast.error("Unable to sent OTP");
      }
    } catch (error) {
    console.error("Error sending email verification OTP:", error);
    }
  };
  return (
    <nav className="navbar bg-secondary px-5 py-4 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-2">
        <img
          src={logohome}
          alt="logohome"
          width={36}
          height={36}
          onClick={() => navigate("/")}
        />
        <span className="fw-bold fs-4 text-dark">Authify</span>
      </div>
      {userData ? (
        <div className="position-relative" ref={dropdownRef}>
          <div
            className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            {userData.name[0].toUpperCase()}
          </div>
          {dropdownOpen && (
            <div
              className="position-absolute shadow bg-white rounded p-2"
              style={{
                top: "50px",
                right: 0,
                zIndex: 100,
              }}
            >
              {!userData.isAccountVerified && (
                <div
                  className="dropdown-item py-1 px-2"
                  style={{ cursor: "pointer" }}
                  onClick={sendEmailVerificationOTP}
                >
                  Verify email
                </div>
              )}
              <div
                className="dropdown-item py-1 px-2 text-danger"
                style={{
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="btn btn-outline-dark rounded-pill px-3"
          onClick={() => navigate("/login")}
        >
          Log in <i className="bi bi-arrow-right ms-3"></i>
        </div>
      )}
    </nav>
  );
};
