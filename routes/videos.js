const express = require('express');
const Channel = require('../models/channel');
const User = require('../models/user');
const Video = require('../models/video');
const helper = require('../util/_helper');
const router = express.Router();

router.post('/:id', (req, res)=>{
    let token = req.cookies.auth;
    let id = req.params.id;
    //check user is loged in or not
    User.findByToken(token, (err, user)=>{
        if(err) return res.json(err);
        if(user && user.role=='creater'){
            const video = new Video(req.body);
            
            
        }
        else{
            return res.status(400).json({
                error: true,
                message: "log in first and create a channel"
            })
        }
    })
    const channel = new Channel(req.body);

});

router.get("/", async (req, res)=>{
    try{
        const channel = await Channel.find();
        res.json(channel);

    }catch(err){
        console.log(err);
        res.json({message: err});
    }
})

router.get("/:id", async (req, res)=> {
    try{
        const id = req.params.id;
        const channel = await Channel.findById(id);
        res.json(channel);

    }catch(err){
        console.log(err);
        res.json({message: err});
    }
});



router.put("/edit/:id", async (req, res)=> {
    try{
        var id = req.params.id;
        const channel = await User.findById(id);
        res.json(channel);

    }catch(err){
        console.log(err);
        res.json({message: err});
    }
});

router.delete("/delete/:id", async (res, req)=> {
    try{
        var id = req.params.id;
        const channel = await User.findById(id);
        res.json(channel);

    }catch(err){
        console.log(err);
        res.json({message: err});
    }
});



module.exports = router;