const { cloudinary } = require("./cloudinary");

// async function to upload files to cloudinary
const cloudinaryUploader = async (req, res) => {
  // extract the file from the request
  const file = req.file;

  // check if the file exists
  if (!file) {
    return res.status(400).json({ message: "File not found" });
  }

  // else extract the original file name
  const fName = file.originalname.split(".")[0];

  //   upload the file to cloudinary server

  try {
    const uploadAudio = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw",
      public_id: `media/${fName}`,
    });

    // we are retuning the object response from the cloudinary
    return uploadAudio;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { cloudinaryUploader };
