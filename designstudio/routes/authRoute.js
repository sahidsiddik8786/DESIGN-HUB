import express from "express";
import { forgotPasswordController, registerContoller, loginController, updateProfileController } from '../controllers/authContoller.js'; // Make sure to include updateProfileController
import { testController } from "../controllers/authContoller.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerContoller);
router.post('/login', loginController);
router.post("/forgot-password", forgotPasswordController);
router.put("/profile", requireSignIn, updateProfileController); // Import and use updateProfileController here

router.get('/test', requireSignIn, isAdmin, testController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
