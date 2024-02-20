// Import necessary dependencies and helper functions
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import StaffModel from "../models/staffModel.js";
import JWT from "jsonwebtoken";

// Login controller for both users and staff members
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Check if the email exists in either user or staff database
    const user = await userModel.findOne({ email });
    const staff = await StaffModel.findOne({ email });

    if (!user && !staff) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Determine the user role
    const role = user ? "user" : "staff";
    const entity = user || staff;

    if (!entity.active) {
      return res.status(403).json({
        success: false,
        message: `${role.capitalize()} is deactivated and cannot log in`,
      });
    }

    // Compare hashed password
    const match = await comparePassword(password, entity.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Token
    const token = await JWT.sign({ _id: entity._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      [role]: {
        _id: entity._id,
        firstname: entity.firstname,
        lastname: entity.lastname,
        streetaddress: entity.streetaddress,
        city: entity.city,
        state: entity.state,
        postal: entity.postal,
        email: entity.email,
        phone: entity.phone,
        address: entity.address,
        role: entity.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Helper function to capitalize the first letter of a string
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
