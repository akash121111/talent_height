const express = require('express');
const Channel = require('../models/channel');
const user = require('../models/user');
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
                user.channels.push(data._id);
                user.save().then((result)=>{
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

router.get("/", (req, res)=> {
    var token = req.cookies.auth;
    User.findOne({'token':token}).populate("channels").then(user => {
        res.json(user);
    });
});



module.exports = router;