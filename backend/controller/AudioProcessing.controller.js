const { AudioProcessingModel } = require("../model/audioProcessing.model");
const { SummaryModel } = require("../model/summary.model");
const { AudioQnAModel } = require("../model/audioQnAModel");
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
    const audioRecord = await AudioProcessingModel.create({
      userId: req.user.id,
      mediaFileUrl: audioResponse.secure_url,
      transcription: transcriptionText,
    });

    return res.status(200).json({
      id: audioRecord.id,
      audioUrl: audioResponse.secure_url,
      transcription: transcriptionText,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error processing audio file.");
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await AudioProcessingModel.findAll({
      where: { userId: req.user.id },
      attributes: ["id", "mediaFileUrl", "transcription", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(history);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to fetch upload history." });
  }
};

const getAudioDetail = async (req, res) => {
  try {
    const audio = await AudioProcessingModel.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [SummaryModel, { model: AudioQnAModel, as: "questions" }],
      order: [[{ model: AudioQnAModel, as: "questions" }, "createdAt", "ASC"]],
    });

    if (!audio) {
      return res.status(404).json({ message: "Audio not found." });
    }

    return res.status(200).json(audio);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to fetch audio detail." });
  }
};

const deleteAudio = async (req, res) => {
  try {
    const audio = await AudioProcessingModel.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!audio) {
      return res.status(404).json({ message: "Audio not found." });
    }

    // AudioQnA has no ON DELETE CASCADE, so its rows must be removed explicitly
    // before the parent AudioProcessing row, or the delete below would fail.
    await AudioQnAModel.destroy({ where: { audioProcessingId: audio.id } });
    await SummaryModel.destroy({ where: { audioProcessingId: audio.id } });
    await audio.destroy();

    return res.status(200).json({ message: "Audio deleted." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to delete audio." });
  }
};

module.exports = { audioUpload, getHistory, getAudioDetail, deleteAudio };
