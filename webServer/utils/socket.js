var _  = require('lodash');
var qs = require('qs');
const WebSocket = require('ws');


const db = require('../db');
const models = db.models;

let wss;
let list = [];

exports.init = async function init(){
  wss = new WebSocket.Server({ 
    host: '0.0.0.0',
    port: 8489
  });
  
  wss.on('connection', async function connection(ws, req) { //用于获取连接时候的参数 eg: ws://ip:port/path?token=xxxxxx
    let url = req.url; 
    // console.log('url is ' + url); // "/path?token=xxxxxx"
    let params = qs.parse(_.split(url,'?')[1]); // token=xxxxxx
    // console.log('url is ' + JSON.stringify(params));// {token:xxxxxxx}
    
    const loginkey = await models.adminloginkeys.find({
      where: {
        type: 0,
        accesskey: params.token
      },
    });
    console.log(loginkey)

    if(loginkey){
      var wsjson = {};
      wsjson.ws = ws;
      wsjson.token = params.token;
      wsjson.userid = loginkey.userid;
      
      // console.log(wsjson);

      list.push(wsjson);

      ws.on('message', (message) => {
        if(message == 'ping'){
          ws.send('pong');
        }
      })

      ws.on('close', function (e) {
        _.pull(list, wsjson);
        console.log('在线人数' + list.length);
      })
    }else{
      ws.close();
    }

  });
}

exports.sendMessage = async function sendsendMessage(data, type, useridlist){
  list.forEach(function each(client) {
    if(client.ws.readyState === WebSocket.OPEN){
      if(useridlist.indexOf(client.userid) != -1){
        client.ws.send(JSON.stringify({
          type: type,
          data: data
        }));
      }
    }
  });
}