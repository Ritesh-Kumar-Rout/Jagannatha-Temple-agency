const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Generic CRUD Factory
const createController = (Model) => {
  return {
    getAll: async (req, res) => {
      try {
        const items = await Model.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
      }
    },
    
    getOne: async (req, res) => {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, data: item });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
      }
    },

    create: async (req, res) => {
      try {
        const data = { ...req.body };
        if (req.file) {
          data.image = '/uploads/' + req.file.filename;
        } else if (req.body.image) {
          // Fallback if image was passed as string (from seed script or existing url)
          data.image = req.body.image;
        }
        
        // Handle array fields if passed as strings (e.g. gallery)
        if (data.gallery && typeof data.gallery === 'string') {
            try { data.gallery = JSON.parse(data.gallery); } catch(e) {}
        }

        const item = await Model.create(data);
        res.status(201).json({ success: true, data: item });
      } catch (error) {
        console.error('Error creating item:', error);
        res.status(400).json({ success: false, message: error.message });
      }
    },

    update: async (req, res) => {
      try {
        const data = { ...req.body };
        if (req.file) {
          data.image = '/uploads/' + req.file.filename;
        }
        
        if (data.gallery && typeof data.gallery === 'string') {
            try { data.gallery = JSON.parse(data.gallery); } catch(e) {}
        }

        const item = await Model.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, data: item });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    },

    remove: async (req, res) => {
      try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
      }
    }
  };
};

module.exports = {
  upload,
  createController
};
