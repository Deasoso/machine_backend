const path = require('path');
const fs = require('fs');
const process = require('process');

const sequelize = require('./sequelize').connect;

const models = {};

const define = function define() {
  // define models from model files
  const files = fs
    .readdirSync(path.join(__dirname, '../../models'))
    .filter(file => !file.match(/\..*\.swp/));
  files.forEach(file => {
    models[path.parse(file).name] = require("../../models/" + file); // eslint-disable-line
  });
};

define();

exports.init = async function init(isRebuildAll, rebuildModels) {
  if (process.env.NODE_ENV === 'production' && isRebuildAll) {
    throw new Error('Production Env with all models');
  }

  if (!isRebuildAll && !rebuildModels) {
    throw new Error('No models have been rebuild');
  }
  if (isRebuildAll) {
    await sequelize.drop();
    await sequelize.sync();
  } else if (rebuildModels) {
    for (let i = 0; i < rebuildModels.length; i += 1) {
      const model = models[rebuildModels[i]];
      if (model) {
        await model.drop(); // eslint-disable-line no-await-in-loop
        await model.sync(); // eslint-disable-line no-await-in-loop
      } else {
        throw new Error(`Model ${rebuildModels[i]} does not exist`);
      }
    }
  }
};

exports.models = models;
exports.sequelize = sequelize;
