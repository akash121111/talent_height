const AWS = require('aws-sdk');
const Busboy = require('busboy');
const confiq=require('../config/config').get(process.env.NODE_ENV);
const S3FS = require('s3fs');



s3fsImpl = new S3FS(config.bucketName, {
  accessKeyId,
  secretAccessKey,
})



  router.get("/:id", (req, res)=> {
    
    const range = 'undefined' !== typeof req.headers.range ? req.headers.range : 'bytes=0-';

  if (!range) {
    res.status(400).send("Requires Range header");
  }



var positions = range.replace(/bytes=/, "").split("-");
var start = parseInt(positions[0], 10);
var total = details.ContentLength;
var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
var chunksize = (end - start) + 1;

  // Create headers


res.setHeader("Content-Type", contentType);
res.status(206);
res.setHeader("Content-Range", "bytes " + start + "-" + end + "/" + total);
res.setHeader("Accept-Ranges", "bytes");
res.setHeader("Content-Length", chunksize);


s3fsImpl.createReadStream(id,{ start: start, end: end }).pipe(res);


});
      











