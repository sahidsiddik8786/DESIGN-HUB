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

export const getSitesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const sites = await Site.find({ createdBy: userId }).populate('createdBy');
    // Convert Buffers to base64 strings for the client
    const sitesWithBase64Images = sites.map(site => ({
      ...site._doc,
      images: site.images.map(image => ({
        data: `data:${image.contentType};base64,${image.data.toString('base64')}`,
        // No need for contentType anymore since it's included in the data URI
      })),
    }));
    res.json(sitesWithBase64Images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
