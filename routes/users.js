const express = require('express');
const User = require('../models/user');
const router = express.Router();

//get users
router.get('/', async (req, res)=>{
    try{
        const users = await User.find();
        res.json(users);

    }catch(err){
        console.log(err);
        res.json({message: err});
    }
    
})

router.get('/:role', async (req, res)=> {
    const param = req.params;
    // res.json(role);
    try{
        const users = await User.find({role: param.role});
        res.json(users);
    }catch(err){
        res.json({
            message: err,
        });
    }
});

/**
 * @swagger
 * /api/puppies:
 *   post:
 *     tags:
 *       - Puppies
 *     description: Creates a new puppy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: puppy
 *         description: Puppy object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Puppy'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/register',function(req,res){
    // taking a user

    const newuser=new User(req.body);
    
    let token=req.cookies.auth;

    
    User.findOne({email:newuser.email},function(err,user){
        if(user) return res.status(400).json({ auth : false, message :"email exits"});
 
        newuser.save((err,doc)=>{

            doc.generateToken((err,doc)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',doc.token).json({
                    isAuth:true,
                     user : doc,
                });
            });
        });
    });
 });


 // login
 router.post('/login', function(req,res){
    let token=req.cookies.auth;
    User.findByToken(token,(err,user)=>{
        if(err) return  res(err);
        if(user) return res.status(400).json({
            error :true,
            message:"You are already logged in"
        });
    
         else{
            User.findOne({'email':req.body.email},function(err,user){
                if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
        
                user.comparepassword(req.body.password,(err,isMatch)=>{
                    if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
        
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id
                        ,email : user.email,
                        token : user.token

                    });
                });    
            });
          });
       }
    });
});

//logout
// router('/logout', (req, res)=>{
//     let token = req.cookies.auth;
//     // error handel

//     //clear cookie
    
// });

//edit
router.put('/edit/:id', (req, res)=>{
    const userId = req.params;
    const user = User.findById(userId);
    res.json("edit");
    // code for editing user details
});

//desable


module.exports= router;
