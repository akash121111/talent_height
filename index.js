const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./config/config').get(process.env.NODE_ENV);

const cors=require("cors");

//routes import
const userRoutes = require('./routes/users');
const channelRoutes = require('./routes/channels');

//model import
const User=require('./models/user');

//middleware import
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

//endpoints
app.use('/api/users', userRoutes);
app.use('/api/channels',channelRoutes);

// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});



