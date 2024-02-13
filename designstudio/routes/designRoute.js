import express from "express";
import {
  createDesignController,
  deleteDesignController,
  getDesignController,
  getSingleDesignController,
  designFiltersController,
  designPhotoController,
  updateDesignController,
  designCountController,
  designListController,
  searchDesignController,
  realtedDesignController,
} from "../controllers/designController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-design",
  requireSignIn,
  isAdmin,
  formidable(),
  createDesignController
);
//routes
router.put(
  "/update-design/:did",
  requireSignIn,
  isAdmin,
  formidable(),
  updateDesignController
);

//get products
router.get("/get-design", getDesignController);

//single product
router.get("/get-design/:slug", getSingleDesignController);

//get photo
router.get("/design-photo/:pid", designPhotoController);

//delete rproduct
router.delete("/delete-design/:pid", deleteDesignController);
//filter product
router.post("/design-filters", designFiltersController);
//product count
router.get("/design-count",designCountController);

//product per page
router.get("/design-list/:page", designListController);
//search
router.get("/search/:keyword", searchDesignController);
//similar product
router.get("/related-design/:pid/:cid", realtedDesignController);
export default router;