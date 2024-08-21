const cloudinary=require('cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})

// Function to upload image to Cloudinary
const uploadImage = async (image,folder) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(image, { folder: folder});
    return result;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

module.exports = uploadImage;
