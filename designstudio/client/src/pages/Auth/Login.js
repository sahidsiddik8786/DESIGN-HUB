import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js/dist/umd/popper.min.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // State for real-time validation
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Function to handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous validation errors
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      toast.error("Email is required");
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });

      console.log("Server Response:", res);

      if (res && res.data.success) {
        // Successful login

        // Display a success toast message
        toast.success(res.data && res.data.message);

        // Update the authentication state with user information and token
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        // Store authentication data in local storage
        localStorage.setItem("auth", JSON.stringify(res.data));

        // Redirect after a short delay
        setTimeout(() => {
 
if(res.data.user.role === "1") {
  navigate(location.state || "/Dashboard/AdminDashboard");
}   else {
  navigate(location.state || "/")
}
},100);

      } else {
        // Unsuccessful login
        if (res.status === "User is deactivated") {
          // User is deactivated, show an error message
          toast.error("User is deactivated");
        } else {
          // Other login errors
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      // Something went wrong with the request
      console.log(error);
      toast.error("Contact Admin");
    }
  };

  return (
    <Layout title="Login">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="rounded p-5 bg-light w-50">
          <h4 className="title ">Sign In</h4>

          <div className=" mb-3 w-100">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>
          <div className="mb-3 w-100">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
            {passwordError && <p className="error-text">{passwordError}</p>}
          </div>
          <div className="mb-3 w-100">
            <NavLink to="/forgotpassword" className="forgot-link">
              Forgot Password
            </NavLink>
          </div>
          <div className="mb-3">
            <p>Don't have an account?</p>
            <NavLink to="/register" className=" btn btn-default  rounded-p4">
              Create new account
            </NavLink>
          </div>
          <button type="submit" className=" w-50 btn-primary rounded-pill">
            Sign In
          </button>
        </form>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Login;
