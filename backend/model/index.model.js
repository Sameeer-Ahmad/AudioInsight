// index.model.js
const { sequelize } = require("../config/db");
const { UserModel } = require("./user.model");
const { SummaryModel } = require("./summary.model");
const { AudioProcessingModel } = require("./audioProcessing.model");

UserModel.hasMany(AudioProcessingModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
AudioProcessingModel.belongsTo(UserModel, { foreignKey: "userId" });


AudioProcessingModel.hasMany(SummaryModel, {
  foreignKey: "audioProcessingId",
  onDelete: "CASCADE",
});
SummaryModel.belongsTo(AudioProcessingModel, {
  foreignKey: "audioProcessingId",
});


sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  UserModel,
  AudioProcessingModel,
  SummaryModel,
}

