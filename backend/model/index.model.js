// index.model.js
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


// Sequelize sync (and table creation) already happens once, in order, in
// config/db.js's ConnectToDB() after authenticate() succeeds. A second,
// unawaited sync() here raced it and could crash the process on an
// unhandled rejection if the DB wasn't ready yet at require time.

module.exports = {
  UserModel,
  AudioProcessingModel,
  SummaryModel,
}

