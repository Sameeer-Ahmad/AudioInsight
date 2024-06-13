
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
