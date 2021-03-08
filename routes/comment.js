const express = require('express');
const Comment = require('../models/comment');
const Video = require('../models/comment');
const User = require('../models/user');
const helper = require('../util/_helper');
const router = express.Router();

router.post('/:id', (req, res)=>{
    let token = req.cookies.auth;
    let video_id = req.params.id; 
    //check user is loged in or not
    User.findByToken(token, (err, user)=>{
        if(err) return res.json(err);
        if(user){


            
        }
        else{
            return res.status(400).json({
                error: true,
                message: "log in first"
            })
        }
    })
    const channel = new Channel(req.body);

});

router.get("/:id", async (req, res)=>{
    try{
        var id = req.params.id;
        const comments = await Comment.find({_video:id});
        res.json(comments);

    }catch(err){
        console.log(err);
        res.json({message: err});
    }
});



router.put("/like/:id", async (req, res)=> {
    try{
        var id = req.params.id;
        const comment = await Comment.findById(id);
        var likes = comment.like+1;
        comment
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
        const comment = await Comment.findById(id);
        var dislikes = comment.dislike+1;
        comment
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



router.put("/edit/:id", async (req, res)=> {
    try{
        var id = req.params.id;
        const comment = await Comment.findById(id);
        comment
            .updateOne({comment: req.bady.comment})
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

router.delete("/delete/:id", async (req, res)=> {
    try{
        var id = req.params.id;
        await Comment.deleteOne({_id: id})
            .then(data =>{
                res.status(202).json({
                    success: true,
                    message: data
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    message: err
                })
            });


    }catch(err){
        console.log(err);
        res.json({message: err});
    }
});



module.exports = router;