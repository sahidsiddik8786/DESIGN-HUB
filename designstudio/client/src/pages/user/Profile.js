import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Validation state
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");

  // Get user data from context and populate the state
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

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
      // Send a PUT request to update the user's profile without the password field
      const { data } = await axios.put("http://localhost:8080/api/v1/auth/profile", {
        name,
        email,
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

                <button type="submit" className="btn-primary">
                  Update
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
