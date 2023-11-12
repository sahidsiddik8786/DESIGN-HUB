import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "../../index.css";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'popper.js/dist/umd/popper.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const navigate = useNavigate();
  //const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //const [selectedCountryCode, setSelectedCountryCode] = useState("+1");

  /*const sendVerificationEmail = () => {
    axios.post('http://localhost:3001/send-verification-email', { email })
      .then((response) => {
        console.log(response.data);
        // Handle the response as needed
      })
      .catch((error) => {
        console.error(error);
        // Handle the error as needed
      });
  };*/
  const handleWhitespaceValidation = (value) => {
    // Check for leading whitespace
    if (value.startsWith(" ")) {
      toast.dismiss();
      toast.error("Leading whitespace is not allowed.");
      return false;
    }
    return true;
  };

  const handleNameValidation = (value) => {
    // Check if the value contains only alphabetic characters and no numbers or whitespace
    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(value) || /\s/.test(value)) {
      toast.dismiss();
      toast.error("Name should contain only alphabetic characters without whitespace or numbers.");
      return false;
    }
    return true;
  };

  const handlePhoneValidation = (value) => {
    // Check if the value contains only numbers
    const phonePattern = /^[0-9]*$/; // Allow an empty string or only numeric characters
    if (!phonePattern.test(value)) {
      toast.dismiss();
      toast.error("Phone number should contain only numbers.");
      return false;
    }
  
    // Check if the phone number is of a valid length (e.g., 10 digits for a standard phone number)
    if (value.length !== 10) {
      toast.dismiss();
      toast.error("Phone number should be 10 digits long.");
      return false;
    }
  
    // Add any other custom phone number validation rules here
  
    return true;
  };
  

  const handlePhoneZeroValidation = (value) => {
    // Check if the value contains 10 consecutive zeros
    if (/0{10}/.test(value)) {
      toast.dismiss();
      toast.error("Phone number cannot contain 10 consecutive zeros.");
      return false;
    }
    return true;
  };

  const handlePasswordStrength = (value) => {
    // Check password strength (at least one letter and one number)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (passwordPattern.test(value)) {
      setPasswordStrength("strong");
    } else if (value.length >= 8) {
      setPasswordStrength("moderate");
      toast.dismiss();
      toast.error("Password is too weak. It should contain at least one letter and one number.");
    } else {
      setPasswordStrength("weak");
      toast.dismiss();
      toast.error("Password is too weak. It should contain at least one letter and one number.");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !phone || !address) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Email validation using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Whitespace validation
    if (!handleWhitespaceValidation(name)) return;
    if (!handleWhitespaceValidation(email)) return;
    if (!handleWhitespaceValidation(password)) return;
    if (!handleWhitespaceValidation(phone)) return;
    if (!handleWhitespaceValidation(address)) return;

    // Name validation
    if (!handleNameValidation(name)) return;

    // Phone number validation
    if (!handlePhoneValidation(phone)) return;

    // New phone number zero validation
    if (!handlePhoneZeroValidation(phone)) return;

    // Password strength validation
    if (passwordStrength === "weak") {
      toast.error("Password is too weak.");
      return;
    }

    // Other custom validation rules can be added here

    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 100);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register">
      <div className="form-container">
        <form className="rounded p-4 bg-light" onSubmit={handleSubmit}>
          <h4 className="title">Sign Up</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleWhitespaceValidation(e.target.value);
                handleNameValidation(e.target.value);
              }}
              className="form-control mb-2 rounded"
              placeholder="Enter Your Username"
              required
              autoFocus
            />
          </div>

          <div className="mb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleWhitespaceValidation(e.target.value);
              }}
              className="form-control mb-2 rounded"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-2">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleWhitespaceValidation(e.target.value);
                handlePasswordStrength(e.target.value);
              }}
              className="form-control mb-2 rounded"
              placeholder="Enter Your Password"
              required
            />
            <div className={`password-strength ${passwordStrength}`} />
          </div>

          <div className="mb-2">
  <div className="input-group">
   {/* <div className="input-group-prepend">
      <select
        className="form-control rounded"
        value={selectedCountryCode}
        onChange={(e) => setSelectedCountryCode(e.target.value)}
      >
        <option value="+1">+1 (US)</option>
        <option value="+91">+91 (IN)</option>
        <option value="+44">+44 (UK)</option>
      </select>
            </div>*/}
    <input
      type="text"
      value={phone}
      onChange={(e) => {
        setPhone(e.target.value);
        handleWhitespaceValidation(e.target.value);
        handlePhoneValidation(e.target.value);
        handlePhoneZeroValidation(e.target.value);
      }}
      className="form-control rounded mb-2"
      placeholder="Phone Number"
      required
    />
  </div>
          </div>

          <div className="mb-2">
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                handleWhitespaceValidation(e.target.value);
              }}
              className="form-control mb-2 rounded"
              placeholder="Address"
              required
            />
          </div>

          <button type="submit" className="btn-primary rounded-pill">
            Sign Up
          </button>
          <div className="mt-2  rounded-pill" >
          <GoogleOAuthProvider clientId="1024520067027-654iu66ttlfcksukd5r1orfjl8hfffsi.apps.googleusercontent.com">
              <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        />
          </GoogleOAuthProvider>
          </div>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
        <Toaster />
      </div>
    </Layout>
  );
};

export default Register;