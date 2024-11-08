const multer = require("multer");

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
    "audio/x-m4a",
  ];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);

  } else {
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