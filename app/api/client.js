'use strict';
// import {ObjectId} from "mongodb";
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash'); //lodash 라고 자바스크립트 array, map 메소드 만들어놓은거

//model 들
var Account = require('../models/account');
var SmsInfo = require('../models/smsInfo');
var NoticeInfo = require('../models/noticeInfo');
var ChatRoom = require('../models/chatRoom');
var ChatList = require('../models/chatList');
var BanUser = require('../models/banUser');
const images = require('../../lib/images');
const { RandomPicture } = require('random-picture')

// const redis = require('redis');
// const bluebird = require('bluebird');
// bluebird.promisifyAll(redis);
const moment = require('moment');
var fetch = require('node-fetch');
const router = express.Router();
router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({extended: false}));
// serverInfo(디비서버 점검 중 여부나 앱 버전 정보같은거) 레디스에 만들어놓음 = 임시서버 => ex. 디비 닫아야될 때 클라에서 점검중표시
// const client = redis.createClient(6379, '34.64.191.146', {auth_pass: "SyMd2htw41tV"});
// 푸쉬알림 보낼 때 필요, 파이어베이스에서 프로젝트만들어서 연결
// const fcmKey = "key=AAAAMlWpuR8:APA91bFdxHn28Zi6jU4E2KAX7tqSn1iRVcu4QXO4jhfRUhoqP1g8PZXyxm6kk1UFd_RgEMspyp_hCdISCoCVPGTPBb04QBMnrL9EUdsUuvXKJ0Mj_i7HBgSH65eYOszsDi8N863oIR8y";

router.post('/newAccount', async (req, res, next) => {
    console.log('newAccount : ' + JSON.stringify(req.body));
    var id = req.body._id;
    do {
        req.body.uid = randomString(8);
        var token_exist = await Account.findOne({uid: req.body.uid}).lean();
    } while (token_exist);
    // req.body.badgeInfo = {event:1};
    // req.body.pushInfo = {  chat: true , like:true , chatLike : true};
    req.body.profileInfo['lastLoginTime'] = moment().toDate();
    var exist = await Account.findOne({'_id': id}).lean();
    var account;
    if (exist) {
        req.body.passSimsa = false;
        account = await Account.findOneAndUpdate({_id: id}, {$set: req.body, $unset: {withDraw: ''}}, {new: true});
    } else {
        account = new Account(req.body);
        account = await account.save();
    }
    res.json({uid: account.uid});
});


function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

router.post('/loginByUid', async (req, res, next) => {
    console.log('loginByUid : ' + JSON.stringify(req.body));
    var account = await Account.findOne({uid: req.body.uid}).lean();
    if (account) {
        if (account.withDraw) {

            var passedDay = parseInt(moment.duration(moment().diff(moment(account.withDraw))).asDays());
            // console.log('passedDay : ' + JSON.stringify(req.body));
            if (passedDay < 7) {
                res.json({result: -1, passedDay});
                return;
            }
        }
        var passedMinute = moment.duration(moment().diff(moment(account.profileInfo.lastLoginTime))).asMinutes();
        if (passedMinute > 5) {
            await Account.findOneAndUpdate({uid: req.body.uid}, {$set: {'profileInfo.lastLoginTime': new Date()}});
        }

        console.log('login success');
        res.json({result: 1, account});
    } else {
        console.log('login fail');
        res.json({result: 0});
    }
});

//테스트용
router.get('/makeTestAccount', async (req, res, next) => {
    console.log('makeTestAccount ' + JSON.stringify(req.body));
    var phoneNumber = getRandomInteger(10000000, 99999999);
    const image = await RandomPicture();
    var imageUrl = image.url;
    var account = {
        "_id" : '010' + phoneNumber.toString(),
        "profileInfo" : {
            "pics": [{"url": imageUrl, "pass": 0}], "name": randomString(4),
        }
    };

    await new Account(account).save();
    res.json({result: 'ok'});
    // Store information
});

router.post('/uploadImage', images.multer.single('image'), images.sendUploadToGCS, (req, res, next) => {
        // console.log('uploadImage req.file ' + JSON.stringify(req.file) );
        if (req.file && req.file.cloudStoragePublicUrl) {
            // console.log('uploadImage is ' + (req.file));
            req.body.imageUrl = req.file.cloudStoragePublicUrl;
        }
        console.log('req.body.imageUrl ' + req.body.imageUrl);
        res.json({result: req.body.imageUrl});
    }
);

function getRandomInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

module.exports = router;
