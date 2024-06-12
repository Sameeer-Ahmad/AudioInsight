// transcription.model.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const TranscriptionModel = sequelize.define(
  "Transcription",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    audioProcessingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "AudioProcessings", 
        key: "id",
      },
    },
    transcription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Transcriptions",
    timestamps: false,
  }
);

module.exports = { TranscriptionModel };
