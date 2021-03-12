const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./config/config').get(process.env.NODE_ENV);
const cors=require("cors");
const swaggerJsDoc = require('swagger-jsdoc');  
// const swafferDefination = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');


const User=require('./models/user');
const {auth} =require('./middlewares/auth');


//route imports
const userRoutes = require('./routes/users');
const channelRoutes = require('./routes/channels');
const videoRoutes = require('./routes/videos');
const commentRoutes = require('./routes/comments');
const excelRoutes = require('./routes/excels');

const options = {
  swaggerDefinition: {
    info: {
      title: "Talent Height API",
      version: "1.0.0",
      description: ""
    },
    servers:[
      {
        url:"http://localhost:3002"
      }
    ]
  },
  apis: ["./routes/*.js"],
}

const spec = swaggerJsDoc(options);


const app=express();

//swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec));

// app use
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(cookieParser());

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err) return console.log(err);
    console.log("database is connected");
});
app.use(express.static('public')); 
app.use('static/assets/images', express.static('images'));  
app.get('/',function(req,res){
    res.status(200).send(`Welcome to login , sign-up api`);
});

//endpoints
app.use('/api/users', userRoutes);
app.use('/api/channels',channelRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments',commentRoutes);



//upload excel files routes

app.use('/api/excel', excelRoutes);


// listening port
const PORT=process.env.PORT||3002;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});



