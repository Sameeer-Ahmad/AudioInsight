const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const blackList = sequelize.define(
  "blacklist",
  {
    token: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

module.exports = { blackList };
