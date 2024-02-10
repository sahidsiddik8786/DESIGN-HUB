import designModel from "../models/designModel.js";
import designcategoryModel from "../models/designcategoryModel.js";
import designsubcategoryModel from "../models/designsubcategoryModel.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();



export const createDesignController = async (req, res) => {
  try {
    const { name_of_design, description, price_per_squarefeet,  category, subcategory, layout, room_dimension } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name_of_design:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price_per_squarefeet:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !subcategory:
        return res.status(500).send({ error: "Subcategory is Required" });
      case !layout:
        return res.status(500).send({ error: "Layout is Required" });
      case !room_dimension:
        return res.status(500).send({ error: "Room dimension is Required" });  
      case photo && photo.size > 5000000:
        return res.status(500).send({ error: "Photo is Required and should be less than 5mb" });
    }

    // Assuming `category` and `subcategory` are valid IDs
    const designs = new designModel({ ...req.fields });
    if (photo) {
      designs.photo.data = fs.readFileSync(photo.path);
      designs.photo.contentType = photo.type;
    }
    await designs.save();
    res.status(201).send({
      success: true,
      message: "Design Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating Designs",
    });
  }
};


//get all products
export const getDesignController = async (req, res) => {
  try {
    const designs = await designModel
      .find({})
      .populate("category-design")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALL Designs ",
      designs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSingleDesignController = async (req, res) => {
  try {
    const designs = await designModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category-design");
    res.status(200).send({
      success: true,
      message: "Single Design  Fetched",
      designs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single design",
      error,
    });
  }
};

// get photo
export const designPhotoController = async (req, res) => {
  try {
    const designs = await designModel.findById(req.params.pid).select("photo");
    if (designs.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(designs.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteDesignController = async (req, res) => {
  try {
    await designModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: " Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateDesignController = async (req, res) => {
  try {
    const { name_of_design, description, price_per_squarefeet,  category, subcategory, layout, room_dimension } = req.fields;
    const { photo } = req.files;
    switch (true) {
        case !name_of_design:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price_per_squarefeet:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !subcategory:
          return res.status(500).send({ error: "Subcategory is Required" });
        case !layout:
          return res.status(500).send({ error: "Layout is Required" });
        case !room_dimension:
          return res.status(500).send({ error: "Room dimension is Required" });  
        case photo && photo.size > 5000000:
          return res.status(500).send({ error: "Photo is Required and should be less than 5mb" });
      }

    const designs = await designModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields},
      { new: true }
    );
    if (photo) {
      designs.photo.data = fs.readFileSync(photo.path);
      designs.photo.contentType = photo.type;
    }
    await designs.save();
    res.status(201).send({
      success: true,
      message: " Updated Successfully",
      designs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte",
    });
  }
};

// filters
export const designFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const designs = await designModel.find(args);
    res.status(200).send({
      success: true,
      designs,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering",
      error,
    });
  }
};

// product count
export const designCountController = async (req, res) => {
  try {
    const total = await designModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const designListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const designs = await designModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      designs,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchDesignController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await designModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search ",
      error,
    });
  }
};

// similar products
export const realtedDesignController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const designs = await designModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category-design");
    res.status(200).send({
      success: true,
      designs,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related ",
      error,
    });
  }
};

export const designCategoryController = async (req, res) => {
  try {
    const categorydesign = await designcategoryModel.findOne({ slug: req.params.slug });
    const designs = await designModel.find({ categorydesign }).populate("category-design");
    res.status(200).send({
      success: true,
      categorydesign,
      designs,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting",
    });
  }
};

export const designsBySubcategoryController = async (req, res) => {
    try {
      const subcategorydesign = await designsubcategoryModel.findOne({ slug: req.params.slug });
      const designs = await designModel.find({ subcategorydesign }).populate("subcategory-design");
  
      res.status(200).json({
        success: true,
        designs : designs,
      });
    } catch (error) {
      console.error("Error fetching products by designsubcategory", error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  };
