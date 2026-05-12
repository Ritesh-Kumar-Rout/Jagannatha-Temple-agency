const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

/**
 * Uploads a buffer to Cloudinary using a stream
 * @param {Buffer} buffer - The file buffer from multer
 * @param {String} folder - Optional folder name in Cloudinary
 * @returns {Promise<Object>} - The Cloudinary upload result
 */
const uploadFromBuffer = (buffer, folder = 'ratha_yatra') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
        // Optional: Add optimization transformations here
        // transformation: [{ width: 1000, crop: 'limit', quality: 'auto' }]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

module.exports = {
  uploadFromBuffer,
};
