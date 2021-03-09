const express = require('express');
const Channel = require('../models/channel');
const User = require('../models/user');
const Video = require('../models/video');
const helper = require('../util/_helper');
const multer = require('multer');
const upload = multer({dest: 'resources/static/assets/uploads/'});
const router = express.Router();
const fs = require("fs");
// const uploadFile = require('../middlewares/upload');

router.post('/:id', upload.single("videoFile"), async (req, res)=>{
    let token = req.cookies.auth;
    const id = req.params.id;
    const video = new Video(req.body);
    video.videolink = req.file.path;
    video._channel = id;
    //check user is loged in or not

    await video.save()
        .then(data=> {
            res.status(200).json({
                success: true,
                message: data,
            })
        })
        .catch(err=> {
            res.status(400).json({
                success: false,
                message: err
            })
        });


});

router.get("/", async (req, res)=>{
    try{
        const video = await Video.find();
        res.json(video);

    }catch(err){
        console.log(err);
        res.json({message: err});
    }
})


router.get("/:id", async (req, res)=> {
    try{
        const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const id = req.params.id;
  await Video.findById(id)
    .then(video ={
        
    })
    .catch(err => console.log(err));
  const videoPath = video.videolink;
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);

    }catch(err){
        console.log(err);
        res.json({message: err});
    }
});



router.put("/edit/:id", async (req, res)=> {
    try{
        var id = req.params.id;
        const vidoe = await User.findById(id);
        res.json(video);

    }catch(err){
        console.log(err);
        res.json({message: err});
    }
});

router.put("/like/:id", async (req, res)=> {
    try{
        var id = req.params.id;
        const video = await Video.findById(id);
        var likes = video.like+1;
        video
            .updateOne({like: likes})
            .then(data => {
                res.status(202).json({
                    success: true,
                    data: data
                });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    message: err
                })
            });
        
        res.json(channel);

    }catch(err){
        console.log(err);
        res.json({message: err});
    }
});

router.put("/dislike/:id", async (req, res)=> {
    try{
        var id = req.params.id;
        const video = await Video.findById(id);
        var dislikes = video.dislike+1;
        video
            .updateOne({dislike: dislikes})
            .then(data => {
                res.status(202).json({
                    success: true,
                    data: data
                });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    message: err
                })
            });
        
        res.json(channel);

    }catch(err){
        console.log(err);
        res.json({message: err});
    }
});

router.delete("/delete/:id", async (res, req)=> {
    try{
        var id = req.params.id;
        await Video.deleteOne({ _id: id});
    }catch(err){
        console.log(err);
        res.json({message: err});
    }
});



module.exports = router;