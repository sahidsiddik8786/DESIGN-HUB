import express from "express";
import {
  createStaffMember,
  getAllStaffMembers,
  getStaffMemberById,
  updateStaffMemberById,
  deleteStaffMemberById,
} from "../controllers/staffController.js";

const router = express.Router();

// Route to create a new staff member
router.post("/create-staff", createStaffMember);

// Route to get all staff members
router.get("/staff", getAllStaffMembers);

// Route to get a specific staff member by ID
router.get("/staff/:id", getStaffMemberById);

// Route to update a specific staff member by ID
router.put("/staff/:id", updateStaffMemberById);

// Route to delete a specific staff member by ID
router.delete("/staff/:id", deleteStaffMemberById);

export default router;
