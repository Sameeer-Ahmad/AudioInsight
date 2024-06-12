// summary.model.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const SummaryModel = sequelize.define("Summary", {
    audioProcessingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "AudioProcessings", 
          key: "id",
        },
      },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = { SummaryModel };
