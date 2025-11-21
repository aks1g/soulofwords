const express = require('express');
const Gallery = require('../models/Gallery');
const verifyToken = require('../middleware/auth');
const multer = require('multer');
const { galleryStorage } = require('../config/cloudinary');

const router = express.Router();
const upload = multer({ storage: galleryStorage });

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add gallery item (protected)
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  const gallery = new Gallery({
    title: req.body.title,
    description: req.body.description,
    image: req.file.path, // This is now a Cloudinary URL
    category: req.body.category
  });

  try {
    const saved = await gallery.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete gallery item (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
