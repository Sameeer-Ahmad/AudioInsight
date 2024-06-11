const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Blacklist = sequelize.define("Blacklist", {
  token: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { timestamps: false });

module.exports = { Blacklist };
