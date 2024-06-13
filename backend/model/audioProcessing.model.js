const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const AudioProcessingModel = sequelize.define(
  "AudioProcessing",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    mediaFileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transcription: {
      type: DataTypes.TEXT,
      allowNull: false,

    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "AudioProcessings",
  }
);

module.exports = { AudioProcessingModel };
