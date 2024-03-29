import Site from '../models/siteModel.js';

export const createSite = async (req, res) => {
  try {
    const { description, createdBy } = req.body;
    const images = req.files.map(file => ({
      data: file.buffer,
      contentType: file.mimetype
    }));

    const site = new Site({ description, images, createdBy });
    await site.save();
    res.status(201).json(site);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSites = async (req, res) => {
  try {
    const sites = await Site.find().populate('createdBy');
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

