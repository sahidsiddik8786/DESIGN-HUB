// controllers/subcategoryController.js
import designsubcategoryModel from '../models/designsubcategoryModel.js';
import slugify from 'slugify';



export const createdesignSubcategoryController = async (req, res) => {
    try {
      const { name, parentCategorydesignId } = req.body;
  
      if (!name || !parentCategorydesignId) {
        return res.status(400).send({ success: false, message: 'Name and parentCategoryId are required.' });
      }
  
      // Validate that the parentCategoryId corresponds to an existing category
      const existingCategory = await designsubcategoryModel.findById(parentCategorydesignId);
      if (!existingCategory) {
        return res.status(400).send({ success: false, message: 'Invalid parentCategoryId.' });
      }
  
      const existingSubcategory = await subcategory.findOne({ name, parentCategorydesign: parentCategorydesignId });
  
      if (existingSubcategory) {
        return res.status(200).send({ success: true, message: 'Subcategory already exists for this category.' });
      }
  
      const subcategorydesign = await new subcategorydesign({
        name,
        slug: slugify(name),
        parentCategorydesign: parentCategorydesignId,
      }).save();
  
      res.status(201).send({ success: true, message: 'New subcategory created.', subcategorydesign });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error, message: 'Error creating subcategory.' });
    }
  };
  
// Get all subcategories
export const subcategorydesignController = async (req, res) => {
  try {
    const subcategorydesign = await subcategorydesign.find({}).populate('parentCategorydesign');
    res.status(200).send({ success: true, message: 'All Subcategories List', subcategorydesign });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: 'Error while getting all subcategories.' });
  }
};

// Update subcategory
export const updateSubcategorydesignController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const subcategory = await subcategorydesign.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({ success: true, message: 'Subcategory updated successfully.', subcategorydesign });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: 'Error while updating subcategory.' });
  }
};

// Delete subcategory
export const deleteSubcategorydesignController = async (req, res) => {
  try {
    const { id } = req.params;
    await Subcategorydesign.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: 'Subcategory deleted successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: 'Error while deleting subcategory.' });
  }
};
