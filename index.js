const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./config/config').get(process.env.NODE_ENV);
const cors=require("cors");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');  
const swaggerUi = require('swagger-ui-express');


const User=require('./models/user');
const {auth} =require('./middlewares/auth');


//route imports
const userRoutes = require('./routes/users');
const channelRoutes = require('./routes/channels');
const videoRoutes = require('./routes/videos');
const commentRoutes = require('./routes/comments');

const excelRoutes = require('./routes/excels');


const app=express();



  
  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDocument,
    
    apis: ['./router/*.js'],
  };

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(options));

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
app.use(express.static('public')); 
app.use('static/assets/images', express.static('images'));  
app.get('/',function(req,res){
    res.status(200).send(`Welcome to login , sign-up api`);
});

//user endpoints
app.get('/users', (req, res)=>{
  res.json({
    message: "data"
  })
});
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



