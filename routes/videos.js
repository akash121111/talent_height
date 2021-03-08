const express = require('express');
const Channel = require('../models/channel');
const User = require('../models/user');
const Video = require('../models/video');
const helper = require('../util/_helper');
const multer = require('multer');
const { base } = require('../models/user');
const { json } = require('body-parser');
const upload = multer({dest: 'uploads/'});
const router = express.Router();
// const uploadFile = require('../middlewares/upload');

router.post('/:id', upload.single("videoFile"), async (req, res)=>{
    let token = req.cookies.auth;
    let id = req.params.id;
    //check user is loged in or not
    User.findByToken(token, (err, user)=>{
        if(err) return res.json(err);

        if(user && user.role=='creator'){
            
            Channel.findById(id)
            .then(data => {
                try{
                    const video = new Video(req.body);
                    video._channel = id;
                    video.videolink = req.baseUrl+"/upload/"+req.videoFile.originalname;
                    video.save()
                        .then(result=> {
                            res.status(200).json({
                                success: true,
                                message: result,
                            })
                        })
                        .catch(err => {
                            res.status(404).json({
                                success: false,
                                message: err
                            })
                        });
                }catch(err){
                    
                }
                
            })
            .catch(err => {return res.json(err)});
            
            
            
        }
        if(user.role!='creator'){
            return res.status(400).json({
                success: false,
                message: "create a channel first"
            });
        }
        else{
            return res.status(400).json({
                success: false,
                message: "log in first"
            })
        }
    })

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
        const id = req.params.id;
        const video = await Video.findById(id);
        res.json(video);

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