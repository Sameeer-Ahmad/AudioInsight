const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { AudioProcessingModel } = require('./audioProcessing.model');


const AudioQnAModel = sequelize.define('AudioQnA', {
  audioProcessingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'AudioProcessings', 
      key: 'id',
    },
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'AudioQnAs',
});


AudioQnAModel.belongsTo(AudioProcessingModel, {
  foreignKey: 'audioProcessingId',
  as: 'audioProcessing',
});

AudioProcessingModel.hasMany(AudioQnAModel, {
  foreignKey: 'audioProcessingId',
  as: 'questions',
});

module.exports = { AudioQnAModel };
