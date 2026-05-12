const multer = require('multer');
const { uploadFromBuffer } = require('../services/cloudinaryHelper');

// Configure Multer for memory storage
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  }
});

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
          console.log('Uploading image to Cloudinary...');
          const uploadResult = await uploadFromBuffer(req.file.buffer);
          data.image = uploadResult.secure_url;
          console.log('Upload successful:', data.image);
        } else if (req.body.image) {
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
          console.log('Uploading new image to Cloudinary...');
          const uploadResult = await uploadFromBuffer(req.file.buffer);
          data.image = uploadResult.secure_url;
          console.log('Update upload successful:', data.image);
        }
        
        if (data.gallery && typeof data.gallery === 'string') {
            try { data.gallery = JSON.parse(data.gallery); } catch(e) {}
        }

        const item = await Model.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, data: item });
      } catch (error) {
        console.error('Error updating item:', error);
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
