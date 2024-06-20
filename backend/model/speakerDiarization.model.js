const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { AudioProcessingModel } = require("./audioProcessing.model");

// Speaker model
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
  },
  {
    tableName: "Speakers",
  }
);

SpeakerModel.belongsTo(AudioProcessingModel, {
  foreignKey: "audioProcessingId",
  onDelete: "CASCADE",
});

// Speaker segment model
const SpeakerSegmentModel = sequelize.define(
  "SpeakerSegments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    speakerId: {
      type: DataTypes.INTEGER,
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
    tableName: "SpeakerSegments",
  }
);

SpeakerSegmentModel.belongsTo(SpeakerModel, {
  foreignKey: "speakerId",
  onDelete: "CASCADE",
});

module.exports = {
  SpeakerModel,
  SpeakerSegmentModel,
};
