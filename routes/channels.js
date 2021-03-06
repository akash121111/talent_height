const express = require('express');
const Channel = require('../models/channel');
const User = require('../models/user');
const helper = require('../util/_helper');
const router = express.Router();

router.post('/', (req, res)=>{
    let token = req.cookies.auth;
    //check user is loged in or not
    User.findByToken(token, (err, user)=>{
        if(err) return res.json(err);
        if(user){
            const channel = new Channel(req.body);
            // check channer name is unique or not.


            //save channel
            channel.creator = user._id;
            channel.save().then((data) => {
                const _channels = user.channels;
                _channels.push(data._id);
                user.update({channels: _channels}).then((result)=>{
                    return res.status(202).json({
                        success: true,
                        user: result,
                        channel: data,
                    })
                }).catch((err)=> {
                    console.log(err);
                    return res.status(400).json({
                        success: false,
                    });
                });
            }).catch((err)=> {
                console.log(err);
                return res.status(400).json({
                    success: false,
                });
            });
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