
const { AudioProcessingModel } = require("../model/audioProcessing.model");
const { cloudinaryUploader } = require("../utils/cloudinaryUploads");
const { speechToText } = require("../utils/speachToText");


const audioUpload = async (req, res) => {
  if (req.fileValidationError) {
    return res
      .status(400)
      .json({ message: `File validation error: ${req.fileValidationError}` });
  }

  try {
    // Upload the audio to Cloudinary
    const audioResponse = await cloudinaryUploader(req, res);
 console.log("audio response",audioResponse);
    // Transcribe the audio
    const transcriptionResponse = await speechToText(audioResponse.secure_url);
console.log("transcription response",transcriptionResponse);
    // Save the audio URL and transcription in the database
    const audioProcessing = await AudioProcessingModel.create({
      userId: req.user.id,
      mediaFileUrl: audioResponse.secure_url,
      transcription: transcriptionResponse ,
    });

    return res.status(200).json({
      audioUrl: audioResponse.secure_url,
      transcription: transcriptionResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error processing audio file.");
  }
};

module.exports = { audioUpload };


// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
// const { promisify } = require("util");
// const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
// const ffmpeg = require("fluent-ffmpeg");
// const { AudioProcessingModel } = require("../model/audioProcessing.model");

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: "dpgrbczei",
//   api_key: "885943315231431",
//   api_secret: "1jQO5WBfKpXA1f_uByOxDgrMXKI",
// });

// ffmpeg.setFfmpegPath(ffmpegPath);

// const upload = multer({ dest: "uploads/" });

// const uploadAudio = async (req, res) => {
//   const file = req.file;
//   console.log(req.file);
//   if (!file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   try {
//     let audioUrl;

//     // Check if the file is a video
//     if (file.mimetype.startsWith("video/")) {
//       // Extract audio from video using FFmpeg
//       const audioPath = `uploads/${file.filename}.mp3`;

//       await promisify(ffmpeg.ffprobe)(file.path).then((info) => {
//         const duration = info.format.duration;
//         return promisify(
//           ffmpeg(file.path)
//             .outputOptions("-vn") 
//             .outputOptions("-acodec libmp3lame") 
//             .output(audioPath)
//             .on("end", async () => {
//               // Upload the audio file to Cloudinary
//               try {
//                 const result = await cloudinary.uploader.upload(audioPath, {
//                   resource_type: "video",
//                   public_id: file.filename,
//                 });
//                 audioUrl = result.secure_url;
//                 fs.unlinkSync(audioPath); // Delete the temporary audio file
//               } catch (error) {
//                 console.error(error);
//                 return res
//                   .status(500)
//                   .send("Error uploading audio file to Cloudinary.");
//               }
//             })
//             .on("error", (error) => {
//               console.error(error);
//               return res.status(500).send("Error extracting audio from video.");
//             })
//             .run()
//         );
//       });
//     } else {
//       // Upload the audio file directly to Cloudinary
//       try {
//         const result = await cloudinary.uploader.upload(file.path, {
//           resource_type: "video",
//           public_id: file.filename,
//         });
//         audioUrl = result.secure_url;
//       } catch (error) {
//         console.error(error);
//         return res
//           .status(500)
//           .send("Error uploading audio file to Cloudinary.");
//       }
//     }

//     // Save the audio processing metadata in the database
//     const audioProcessing = await AudioProcessingModel.create({
//       userId: req.user.id, // Assuming user is authenticated and req.user is available
//       audioFileUrl: audioUrl,
//     });
// console.log("audio processing",audioProcessing);
//     res.json({ audioUrl: audioProcessing.audioFileUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error processing audio file.");
//   }
// };

// module.exports = {
//   uploadAudio,
// };