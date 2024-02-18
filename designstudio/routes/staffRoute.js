import express from "express";
import {
    createStaffMember,
    loginController,
    getAllStaffMembers,
    getStaffMemberById,
    updateStaffMemberById,
    deleteStaffMemberById,
} from "../controllers/staffController.js";
import { requireStaffSignIn, isAuthorized } from "../middlewares/staffMiddleware.js";

const router = express.Router();

// Route to create a new staff member
router.post("/create-staff", createStaffMember);

// Route for staff member login
router.post("/login-staff", loginController);

// Protected routes - require sign in and authorization
router.use(requireStaffSignIn);
router.get("/staff", isAuthorized, getAllStaffMembers);
router.get("/staff/:id", isAuthorized, getStaffMemberById);
router.put("/staff/:id", isAuthorized, updateStaffMemberById);
router.delete("/staff/:id", isAuthorized, deleteStaffMemberById);

export default router;
