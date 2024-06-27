const multer = require("multer");

// configure multer disk storage for dile uploads
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    let fileExt = file.originalname.split(".").pop();
console.log(" fileExt",fileExt);
    // generate new file name
    const fileName = `${new Date().getTime()}.${fileExt}`;
console.log(" fileName",fileName);
    // callback to use the new file name when storing the uploaded

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  // Define the allowed file types
  const allowedFileTypes = [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/ogg",
    "audio/webm",
    "audio/aac",
    "audio/flac",
    "audio/aiff",
    "audio/wma",
    "audio/mp4",
    "audio/m4a",
  ];

  // Check if the file's mimetype is in the allowedFileTypes array
  if (allowedFileTypes.includes(file.mimetype)) {
    // If the file type is allowed, move to the next action
    cb(null, true);
  } else {
    // If the file type is not allowed, return an error
    req.fileValidationError =
      "File type must be one of: mpeg, mp3, mp4, wav, ogg, webm, aac, flac, aiff, wma or  m4a";
    cb(null, false, req.fileValidationError);
  }
}; 

const upload = multer({
  storage,
  fileFilter,
}).single("mediaFileUrl");

module.exports = upload;
