// index.model.js
const { sequelize } = require("../config/db");
const { UserModel } = require("./user.model");
const { AudioProcessingModel } = require("./audioProcessing.model");

UserModel.hasMany(AudioProcessingModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
AudioProcessingModel.belongsTo(UserModel, { foreignKey: "userId" });

// Sync models with the database
sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  UserModel,
  AudioProcessingModel,
};
