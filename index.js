const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./config/config').get(process.env.NODE_ENV);
const userRoutes = require('./routes/users');
const cors=require("cors");

const User=require('./models/user');
const {auth} =require('./middlewares/auth');


const app=express();
// app use
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(cookieParser());

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err) console.log(err);
    console.log("database is connected");
});


app.get('/',function(req,res){
    res.status(200).send(`Welcome to login , sign-up api`);
});

//user endpoints
app.use('/api/users', userRoutes);

// listening port
const PORT=process.env.PORT||3002;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});



