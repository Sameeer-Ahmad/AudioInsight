// speakers.model.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { AudioProcessingModel } = require("./audioProcessing.model");

const SpeakerModel = sequelize.define(
  "Speakers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    audioProcessingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speakerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speakerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spokenText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Speakers",
  }
);

SpeakerModel.belongsTo(AudioProcessingModel, {
  foreignKey: "audioProcessingId",
  onDelete: "CASCADE",
});

module.exports = {
  SpeakerModel,
};
