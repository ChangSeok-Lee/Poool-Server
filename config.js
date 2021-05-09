'use strict';

// Hierarchical node.js configuration with command-line arguments, environment
// variables, and files.
const nconf = module.exports = require('nconf');
const path = require('path');

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'DATA_BACKEND',
    'GCLOUD_PROJECT',
    'INSTANCE_CONNECTION_NAME',
    'MONGO_URL',
    'MONGO_COLLECTION',
    'NODE_ENV',
    'PORT'
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, 'config.json') })
  // 4. Defaults
  .defaults({
    DATA_BACKEND: 'mongodb',
    MAIN_IMAGE_BUCKET: 'poool_main_image',  //구글 스토리지 버킷 이름
    THUMBNAILS_IMAGE_BUCKET: 'poool_thumbnail_image',   //구글 스토리지 버킷 이름
    // This is the id of your project in the Google Cloud Developers Console.
    GCLOUD_PROJECT: 'PooL',       //구글 프로젝트 아이디
    MONGO_URL: 'mongodb://root:k9iesMtUa31L@34.64.207.241:27017/admin',
    MONGO_COLLECTION: 'notices',
    PORT: 8080,
    SECRET: 'keyboardcat'
  });

// Check for required settings
checkConfig('GCLOUD_PROJECT');

if (nconf.get('DATA_BACKEND') === 'mongodb') {
  checkConfig('MONGO_URL');
  checkConfig('MONGO_COLLECTION');
}

function checkConfig (setting) {
  if (!nconf.get(setting)) {
    throw new Error('You must set ${setting} as an environment variable or in config.json!');
  }
}