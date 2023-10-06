import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Validation state
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");

  // Get user data from context and populate the state
  useEffect(() => {
    console.log("User Data from auth:", auth?.user); // Add this line for debugging
    const { email, name, phone, address } = auth?.user;
    console.log("Name:", name); // Add this line for debugging
    console.log("Email:", email); // Add this line for debugging
    console.log("Phone:", phone); // Add this line for debugging
    console.log("Address:", address); // Add this line for debugging
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);
  

  // Form submission function
  // Form submission function
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation checks
  let valid = true;

  if (!name) {
    setNameError("Name is required");
    valid = false;
  } else if (!/^[A-Za-z\s]+$/.test(name)) {
    setNameError("Name must contain only letters and spaces");
    valid = false;
  } else {
    setNameError("");
  }

  if (!password) {
    setPasswordError("Password is required");
    valid = false;
  } else if (password.length < 6) {
    setPasswordError("Password must be at least 6 characters");
    valid = false;
  } else {
    setPasswordError("");
  }

  if (!phone) {
    setPhoneError("Phone number is required");
    valid = false;
  } else if (!/^[1-9]\d{9}$/.test(phone)) {
    setPhoneError("Invalid phone number format");
    valid = false;
  } else {
    setPhoneError("");
  }

  if (!address) {
    setAddressError("Address is required");
    valid = false;
  } else if (!/^[A-Za-z\s]+$/.test(address)) {
    setAddressError("Address must contain only letters and spaces");
    valid = false;
  } else {
    setAddressError("");
  }

  if (!valid) {
    return;
  }

  try {
    // Send a PUT request to update the user's profile
    const { data } = await axios.put("http://localhost:8080/api/v1/auth/profile", {
      name,
      email,
      password,
      phone,
      address,
    });

    if (data?.error) {
      toast.error(data?.error);
    } else {
      // Update the user's data in the context only after a successful update response
      setAuth({ ...auth, user: data?.updatedUser });

      // Update the user's data in localStorage after a successful update response
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      ls.user = data.updatedUser;
      localStorage.setItem("auth", JSON.stringify(ls));

      toast.success("Profile Updated Successfully");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong");
  }
};


  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-7">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                  <span className="text-danger">{nameError}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                  <span className="text-danger">{passwordError}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone"
                  />
                  <span className="text-danger">{phoneError}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                  />
                  <span className="text-danger">{addressError}</span>
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
