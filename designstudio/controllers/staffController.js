import StaffModel from "../models/staffModel.js";



export const createStaffMember = async (req, res) => {
  try {
    const newStaffMember = new StaffModel(req.body);
    await newStaffMember.save();
    res.status(201).json({ success: true, data: newStaffMember });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllStaffMembers = async (req, res) => {
    try {
      const staffMembers = await StaffModel.find();
      res.status(200).json({ success: true, data: staffMembers });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

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

  export const updateStaffMemberById = async (req, res) => {
    try {
      const updatedStaffMember = await StaffModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ success: true, data: updatedStaffMember });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  export const deleteStaffMemberById = async (req, res) => {
    try {
      await StaffModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: "Staff member deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };