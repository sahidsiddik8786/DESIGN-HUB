import StaffModel from "../models/staffModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sahidsiddik0977@gmail.com",
    pass: "uhjr osxb cskd szzi",
  },
});



export const sendRegistrationConfirmationEmail = (email, password) => {
  const loginLink = "http://localhost:3000/login"; // Replace with your actual login page URL
  const mailOptions = {
    from: "Design_Studio",
    to: email,
    subject: " Staff Registration"<br>"This is user Credential"<br> "to Login As Staff ",
    html: `
      <p>Welcome to Design Studio Family.</p>
      <p>Your password: ${password}</p>
      <p>Please <a href="${loginLink}">click here</a> to login.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};


export const createStaffMember = async (req, res) => {
  try {
    const { firstname, lastname, address, streetaddress, city, state, country, postal, email, password, phone } = req.body;

    // Check if any required field is missing or empty
    if (!firstname || !lastname || !address || !streetaddress || !city || !state || !country || !postal || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await StaffModel.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    const user = await new StaffModel({
      firstname,
      lastname,
      address,
      streetaddress,
      city,
      state,
      postal,
      country,
      email,
      phone,
      password: hashedPassword,
    }).save();


// Send registration confirmation email
await sendRegistrationConfirmationEmail(email, password);
    
  
    res.status(201).json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};


// Login controller
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
    // Check user
    const staff = await StaffModel.findOne({ email });
    if (!staff) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    if (!staff.active) {
      return res.status(403).json({
        success: false,
        message: "User is deactivated and cannot log in",
      });
    }

    // Compare hashed password
    const match = await comparePassword(password, staff.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Token
    const token = await JWT.sign({ _id: staff._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({
      success: true,
      message: "Login successful",
      staff: {
        _id: staff._id,
        firstname: staff.firstname,
        lastname: staff.lastname,
        streetaddress: staff.streetaddress,
        city: staff.city,
        state: staff.state,
        country: staff.country,
        postal: staff.postal,
        email: staff.email,
        phone: staff.phone,
        address: staff.address,
        role: staff.role,
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

// Protected route test controller
export const testController = (req, res) => {
  res.send("Protected Route");
};

// Get all staff members
export const getAllStaffMembers = async (req, res) => {
  try {
    const staffMembers = await StaffModel.find();
    res.status(200).json({ success: true, data: staffMembers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get staff member by ID
export const getStaffMemberById = async (req, res) => {
  try {
    const staffMember = await StaffModel.findById(req.params.id);
    if (!staffMember) {
      return res.status(404).json({ success: false, message: "Staff member not found" });
    }
    res.status(200).json({ success: true, data: staffMember });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update staff member by ID
export const updateStaffMemberById = async (req, res) => {
  try {
    const updatedStaffMember = await StaffModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedStaffMember });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete staff member by ID
export const deleteStaffMemberById = async (req, res) => {
  try {
    await StaffModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Staff member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
