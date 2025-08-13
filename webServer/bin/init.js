const db = require('../db');
const process = require('process');
const commander = require('commander');
const fs = require('fs-extra');
const path = require('path');

commander
  .option('-A, --all', '重置全部models')
  .option('-m, --models <model>', '指定重建的model')
  .parse(process.argv);

async function createSampleData(modelName) {
  const dataList = JSON.parse(fs.readFileSync(path.join(__dirname, `../../webServer/bin/sampleData/${modelName}.json`), 'utf8'));
  for (const data of dataList) {
    await db.models[modelName].create(data);
  }
}

async function init() {
  await db.init(
    !!commander.all,
    commander.models ? commander.models.split(',') : null,
  );
  console.log('Database init finish.');
  // await createSampleData('tables');
  // console.log('Sample Data finish.');

  process.exit(0);
}

init()
  .then()
  .catch(error => {
    console.error(error.stack);
  });
