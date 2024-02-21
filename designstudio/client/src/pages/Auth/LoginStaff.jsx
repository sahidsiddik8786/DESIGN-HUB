import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Background from "../../components/Background/Background";
import toast, { Toaster } from "react-hot-toast";
import GoBackButton from "../../components/layout/goback";
import { useAuth } from "../../context/auth"; // Import useAuth hook

const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const StaffLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);
  const [auth, setAuth] = useAuth(); // Destructure setAuth from useAuth

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/staff/login-staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        const { success, token, user, message } = responseData; // Ensure the response contains the 'user' object
        if (success) {
          console.log("Logged in user details:", user); // Log the logged-in user details
          localStorage.setItem("auth", JSON.stringify({ token, user })); // Store user data in local storage
          setAuth({ user, token }); // Update auth context with user data and token
          navigate(location.state || "/staff-dashboard");
          toast.success("Login successful as staff");
        } else {
          setError(message || "Failed to login");
          toast.error("Failed to login");
        }
      } else {
        setError(responseData.message || "Failed to login");
        toast.error("Failed to login");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Failed to login");
      toast.error("Failed to login");
    }
  };
  
  return (
    <>
      <Background playStatus={playStatus} heroCount={heroCount} />
      <GoBackButton />
      <CenteredBox>
        <div className="col-md-2">
          <div className="card-header text-center " style={{ color: "white" }}>
            <h2>Staff Login Page </h2>
          </div>
          <Card>
            <CardHeader title="Login" align="center" />
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="rounded w-100">
                <div className="mb-3 w-100">
                  <TextField
                    {...register("email", { required: true })}
                    type="email"
                    label="Email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email && "Email is required"}
                  />
                </div>
                <div className="mb-3 w-100">
                  <TextField
                    {...register("password", { required: true })}
                    type="password"
                    label="Password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password && "Password is required"}
                  />
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#007bff",
                      "&:hover": { bgcolor: "#0056b3" },
                    }}
                  >
                    Login
                  </Button>
                </div>
                <p>
                  <Link to="/forgotpwd">
                    <a className="font-bold">Forgot password?</a>
                  </Link>
                </p>
              </form>
              {error && (
                <Typography color="error" variant="body1" mt={3}>
                  {error}
                </Typography>
              )}
            </CardContent>
          </Card>
        </div>
      </CenteredBox>
    </>
  );
};

export default StaffLogin;
