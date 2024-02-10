import designcategoryModel from '../models/designcategoryModel.js';
import designsubcategoryModel from '../models/designsubcategoryModel.js';
import slugify from "slugify";
export const createdesignCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await designcategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exisits",
      });
    }
    const categorydesign = await new designcategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new design-category created",
      categorydesign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

//update category
export const updatedesignCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const categorydesign = await designcategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      categorydesign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all cat
export const designcategoryController = async (req, res) => {
  try {
    const categorydesign = await designcategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      categorydesign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singledesignCategoryController = async (req, res) => {
  try {
    const categorydesign = await designcategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      categorydesign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deletedesignCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await designcategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "designCategry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting designcategory",
      error,
    });
  }
};

export const designsubcategoryController = async (req, res) => {
  try {
    const { categorydesignId } = req.params;
    await designsubcategoryModel.find({ parentCategorydesign: categorydesignId });
    res.status(200).send({ success: true, message: 'Subcategories for category retrieved successfully.'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ 
        success: false, 
        error,
         message: 'Error while getting subcategories for category.' });
  }
};
