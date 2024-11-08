const { AudioProcessingModel } = require("../model/audioProcessing.model");
const { cloudinaryUploader } = require("../utils/cloudinaryUploads");
const { transcribeAudio } = require("../utils/transcribeAudio");


const audioUpload = async (req, res) => {
  if (req.fileValidationError) {
    return res
      .status(400)
      .json({ message: `File validation error: ${req.fileValidationError}` });
  }

  try {
    const audioResponse = await cloudinaryUploader(req, res);

    // Transcribe the audio using the separate transcription service
    const transcriptionText = await transcribeAudio(audioResponse.secure_url);

    // Save the audio URL and transcription in the database
    await AudioProcessingModel.create({
      userId: req.user.id,
      mediaFileUrl: audioResponse.secure_url,
      transcription: transcriptionText,
    });

    return res.status(200).json({
      audioUrl: audioResponse.secure_url,
      transcription: transcriptionText,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error processing audio file.");
  }
};

module.exports = { audioUpload };
