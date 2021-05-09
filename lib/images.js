'use strict';

const {Storage} = require('@google-cloud/storage');
const storage = new Storage({keyFilename: "lib/key.json"});
const config = require('../config');

const MAIN_IMAGE_BUCKET = config.get('MAIN_IMAGE_BUCKET');
const sharp = require('sharp');
const main_image_bucket = storage.bucket(MAIN_IMAGE_BUCKET);
const thumbnails_image_bucket = storage.bucket(config.get('THUMBNAILS_IMAGE_BUCKET'));


// [START public_url]
function getPublicUrl (path,filename) {
    return `https://storage.googleapis.com/${config.get('MAIN_IMAGE_BUCKET')}/${filename}`;
}

function  deleteMainImage(id,callback) {
    var file = main_image_bucket.file(id);
    file.delete(callback);
}
// [END public_url]

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
// [START process]
async function sendUploadToGCS (req, res, next) {
    console.log('sendUploadToGCS' );
    // console.log('files : ' + req.files );
    if (!req.file) {
        return next();
    }
    // console.log('url : ' + req.path );
    var resizedFileBuffer = await sharp(req.file.buffer).resize(1024).toBuffer();     //사진 크기 너무 큼
    req.file.buffer = resizedFileBuffer;
    const gcsname = Date.now()+'_'+req.file.originalname; //메인 이미지가 아니면 랜덤아이디 생성
    const file = main_image_bucket.file(gcsname);
    let metadata = {  resumeable: false , contentType: req.file.mimetype,  cacheControl: "public, max-age=360000"} //캐시 무한
    const stream = file.createWriteStream({metadata});


    stream.on('error', (err) => {
        console.log('stream error : ' +  JSON.stringify(err) );
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', async () => {
        req.file.cloudStorageObject = gcsname;
        console.log('finish file is ' + JSON.stringify(req.file.size));
        if (metadata.contentType.startsWith('image/') ) {
            if(!metadata.contentType.endsWith('gif') )
                await createThumbNail(req.file.buffer, metadata, gcsname);
        }
        var imageSize  =req.file.size;
        var filename = req.file.cloudStorageObject;
        console.log('filename ' + filename + ' imageSize is ' + imageSize); //쓰레기들 색출을 위해 파일 사이즈 리턴
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(req.path,gcsname);
            next();
        });
    });
    stream.end(req.file.buffer);
}
function sendArrayFilesUploadToGCS (req, res, next) {
    console.log('sendArrayFilesUploadToGCS' );
    var count =0;
    if (!req.files || req.files.length==0) {
        return next();
    }
    req.files.map(file=>{
        var request = {file };
        sendUploadToGCS(request,res, ()=>(++count==req.files.length)?next():null);
    });

}

// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
// [START multer]
const Multer = require('multer');
// [END multer]
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 100 * 1024 * 1024 // no larger than 50mb
    }
});

async function uploadToMainBucket(fileName ,userId ) {
    let talkThumbnailsBucket = thumbnails_image_bucket.file(fileName);    //원본 아니고 섬네일에서 카피해와야댐
    let mainImageBucketFile = main_image_bucket.file(userId);
    await talkThumbnailsBucket.copy(mainImageBucketFile);
}
function createThumbNail(filebuffer ,metadata,filename) {
    // console.log('createThumbNail filename is ' + filename);
    let thumnail_dstObject = thumbnails_image_bucket.file(filename);
    let thumbnail_dstStream = thumnail_dstObject.createWriteStream({ metadata});

    sharp(filebuffer).resize(200,200).pipe( thumbnail_dstStream);
    return new Promise((resolve, reject) => {
        thumbnail_dstStream
            .on("error", (err) => {
                console.log(`Error: ${err}`);
                reject(err);
            })
            .on("finish", () => {
                console.log(`create thumb Success: ${filename}`);
                resolve();
            });
    });
}

module.exports = {
    sendUploadToGCS,
    multer,
    deleteMainImage,
    sendArrayFilesUploadToGCS,
    uploadToMainBucket,
};
