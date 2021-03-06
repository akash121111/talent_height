const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./config/config').get(process.env.NODE_ENV);

const cors=require("cors");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//routes import
const userRoutes = require('./routes/users');
const channelRoutes = require('./routes/channels');

//model import
const User=require('./models/user');

//middleware import
const {auth} =require('./middlewares/auth');


const app=express();


// swagger definition
var swaggerDefinition = {
    info: {
      title: 'Talent Heght API',
      version: '1.0.0',
      description: 'Demonstrating api',
    },
    host: 'https://talentheight.herokuapp.com/',
    basePath: '/',
  };
  
  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
  };
  
  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);



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

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

//user endpoints
app.use('/api/users', userRoutes);
app.use('/api/channels',channelRoutes);

// listening port
const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});



