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
  // Define the relationship
  foreignKey: "audioProcessingId",
  onDelete: "CASCADE",
});
SummaryModel.belongsTo(AudioProcessingModel, {
  foreignKey: "audioProcessingId",
});

AudioProcessingModel.hasMany(SpeakerModel, {
  foreignKey: "audioProcessingId",
  onDelete: "CASCADE",
});

SpeakerModel.belongsTo(AudioProcessingModel, {
  foreignKey: "audioProcessingId",
});

// Sync models with the database
sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  UserModel,
  AudioProcessingModel,
 
  SummaryModel,
  SpeakerModel,
};

/**
 * The biggest poison is regret. Life is short and we only get one chance to live it. It's easy to make excuses and put off our dreams, but in the end, it's what we *don't* do that we regret most. Don't wait for the perfect time or the perfect experience – there is no such thing. Live your life to the fullest and don't settle for the 80% version.
 */
/**
 * the biggest poison is regret\n I think there are a lot of people that have dreams and aspirations of things that they always wanted to do but it wasn't the right time or they didn't have enough money or didn't have enough experience it's never the right time you never going to have the right experience and all the sudden you wake up and you're 70\n and you like God I wish I could have done it\n it's what you don't do that screws with you later on\n I got one shot at this life\n this is it and I don't want to go through life in the 80% version of it I don't look back and be like 77 be like I didn't do that\n there's so much I want to do and I love life so much I don't want to miss it
 */