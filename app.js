'use strict';

const express = require('express');
const config = require('./config');
const cors = require('cors')
const app = express();
// Start the server
var start = new Date()
const server = app.listen(config.get('PORT'), "0.0.0.0", () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
    var end = new Date() - start
    console.info('Execution time: %dms', end)
});
//채팅용 레디스 연결 시작
// const redisAdapter = require('socket.io-redis');
// const redis = require('redis');
// const io_s = require('socket.io')(server , {pingInterval: 10000, pingTimeout: 5000});
// const pub = redis.createClient(6379, '34.64.191.146', {auth_pass: "SyMd2htw41tV"});
// const sub = redis.createClient(6379, '34.64.191.146', {auth_pass: "SyMd2htw41tV"});
//채팅용 레디스 연결 끝
//gcp 에서 레디스 열어서 외부 ip 설정하기

// io_s.adapter(redisAdapter({ pubClient: pub, subClient: sub}));
// global.io = io_s.of('mynamespace');
// global.localRedisClient = redis.createClient('redis://127.0.0.1:6379');
// Set up mongoose connection
var mongoose = require('mongoose');     //디비 연결
mongoose.connect(config.get('MONGO_URL'),{  useUnifiedTopology: true , useNewUrlParser: true , useFindAndModify: false,useCreateIndex : true});
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

app.disable('etag');

app.set('trust proxy', true);

app.use(cors());

app.get('/_ah/health', (req, res) => {
    res.status(200)
    res.send();
});

app.use('/api', require('./app/api/client'));  // client용 api 요청들, 파일 하나에 다 작성해놓음

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use((err, req, res, next) => {
  /* jshint unused:false */
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});



app.locals.moment = require('moment');
module.exports = app;
