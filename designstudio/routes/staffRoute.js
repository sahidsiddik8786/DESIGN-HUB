import express from "express";
import {
    createStaffMember,
    loginController,
    getAllStaffMembers,
    getStaffMemberById,
    updateProfileController,
    deleteStaffMemberById,
    sendRegistrationConfirmationEmail,
} from "../controllers/staffController.js";



const router = express.Router();

// Route to create a new staff member
router.post("/create-staff", createStaffMember);

// Route for staff member login
//router.post("/login-staff", loginController);

// Route to send registration confirmation email
router.post("/send-registration-email", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
      await sendRegistrationConfirmationEmail(email);
      res.status(200).json({ success: true, message: "Registration confirmation email sent successfully" });
    } catch (error) {
      console.error("Error sending registration confirmation email:", error);
      res.status(500).json({ success: false, message: "Error sending registration confirmation email" });
    }
  });
  

// Protected routes - require sign in and authorization
//router.use(requireStaffSignIn);
router.get("/staff",  getAllStaffMembers);
router.get("/staff/:id", getStaffMemberById);

//router.put("/profile-staff", requireStaffSignIn, updateProfileController); 
router.put('/profile-staff',  updateProfileController);


router.delete("/staff/:id", deleteStaffMemberById);

export default router;
