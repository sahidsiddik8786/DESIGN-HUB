// App.js
import React, { createContext, useState} from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Router/Private";
import AdminRoute from "./components/Router/AdminRoute";
import Userdashboard from "./pages/user/Userdashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import OTPInput from "./pages/Auth/OTPInput";
import ResetPassword from "./pages/Auth/ResetPassword";
import Recovered from "./pages/Auth/Recovered";
import ForgotPassword from "./pages/Auth/ForgotPassword"
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Shop from "./pages/Shop";
import Search from "antd/es/input/Search";
import ProductDetails from "./pages/ProductDetails";
const RecoveryContext = createContext();

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  function NavigateComponents() {
   // if (page === "forgotpassword") return <ForgotPassword />;
   // if (page === "otp") return <OTPInput />;
    //if (page === "reset") return <ResetPassword />;

    return <Recovered />;
  }

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <div className="flex justify-center items-center">
        <Routes>
          {/* Your routes here */}
          <Route path="/" element={<HomePage />} />

<Route path="/Dashboard" element={<PrivateRoute />}>
  <Route path="/Dashboard" element={<Dashboard />} />
  <Route path="Userdashboard" element={<Userdashboard />} />
  <Route path="Userdashboard/Orders" element={<Orders />} />
  <Route path="Userdashboard/Profile" element={<Profile />} />
  
</Route>

<Route path="/Dashboard" element={<AdminRoute />}>
  <Route path="/Dashboard" element={<Dashboard />} />
  <Route path="AdminDashboard" element={<AdminDashboard />} />
  <Route path="AdminDashboard/create-category" element={<CreateCategory />} />
  <Route path="AdminDashboard/products" element={<Products />} />
  <Route path="AdminDashboard/create-product" element={<CreateProduct />} />
  <Route path="AdminDashboard/users" element={<Users />} />
  <Route path="AdminDashboard/product/:slug" element={<UpdateProduct />} />
</Route>

<Route path="/search" element={< Search />} />
<Route path="/product/:slug" element={< ProductDetails />} />
<Route path="/searchInput" element={< searchInput/>} />
<Route path="/shop" element={<Shop />} />
<Route path="/about" element={<About />} />
<Route path="/Contact" element={<Contact />} />
<Route path="/Policy" element={<Policy />} />
<Route path="/register" element={<Register />} />
<Route path="/Login" element={<Login />} />
<Route path="/otpinput" element={<OTPInput />} />
<Route path="/recovered" element={<Recovered />} />
<Route path="/reset" element={<ResetPassword />} />
<Route path="/forgotpassword" element={<ForgotPassword />} />
<Route path="/*" element={<PageNotFound />} />
        </Routes>

      </div>
      <Toaster />
    </RecoveryContext.Provider>
  );
}

export default App;

export { RecoveryContext };
