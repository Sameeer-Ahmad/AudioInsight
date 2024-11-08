const { cloudinary } = require("./cloudinary");


const cloudinaryUploader = async (req, res) => {
  
  const file = req.file;

  // check if the file exists
  if (!file) {
    return res.status(400).json({ message: "File not found" });
  }

  // else extract the original file name
  const fName = file.originalname.split(".")[0];

  
  try {
    const uploadAudio = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
      public_id: `media/${fName}`,
    });

    // here i am returning the object response from the cloudinary
    return uploadAudio;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { cloudinaryUploader };
