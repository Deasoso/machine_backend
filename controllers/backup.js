const db = require('../db');
const models = db.models;

const path = require('path');
const fs = require('fs-extra');

exports.backup = async function backup() {
  const result = await models.matchs.find({
    where: { roomid: '1111111' }
  });
  if(!(result && result.tableid == 1)) return;
  const filePath = path.join(__dirname, '../../../backup/');
  var backupname = 'backup.json';
  const thedate = (new Date()).getDate();
  if(thedate == 5){
    backupname = 'backup5.json'
  }else if(thedate == 15){
    backupname = 'backup15.json'
  }else if(thedate == 25){
    backupname = 'backup25.json'
  }else if((((new Date()).getTime()) / (24 * 60 * 60 * 1000)) % 2 == 0){
    backupname = 'backup2.json'
  }else{
    backupname = 'backup1.json'
  }
  const fileResource = filePath + backupname;
  const savejson = {
    time: new Date(),
    users: await models.users.findAll(),
    games: await models.games.findAll(),
    orders: await models.orders.findAll(),
    matchs: await models.matchs.findAll(),
    pictures: await models.pictures.findAll()
  }
  await new Promise((resolve, reject) => {
    fs.mkdir(filePath, resolve);
  });
  const writeStream = fs.createWriteStream(fileResource);
  await new Promise((resolve, reject) => {
    writeStream.write(JSON.stringify(savejson), resolve);
  });
  writeStream.close();
  
  return true;
};