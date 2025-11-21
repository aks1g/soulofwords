const express = require('express');
const Admin = require('../models/Admin');
const Gallery = require('../models/Gallery');
const Product = require('../models/Product');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Get database statistics (protected)
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    const galleryCount = await Gallery.countDocuments();
    const productCount = await Product.countDocuments();

    res.json({
      admins: adminCount,
      galleries: galleryCount,
      products: productCount
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve stats: ' + err.message });
  }
});

module.exports = router;
