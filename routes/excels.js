
    var express = require('express');
    var app = express();
    const router = express.Router();
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var xlstojson = require("xls-to-json-lc");
    var xlsxtojson = require("xlsx-to-json-lc");
    const User = require('../models/user');
    app.use(bodyParser.json());
    const fs = require('fs');
    const MongoClient = require('mongodb').MongoClient;
    const excel = require('exceljs');
    const url='mongodb+srv://talent:kamal1234@cluster0.walu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


// //export data from database




//  /** API path that will export the files */
 router.get('/export', function(req, res) {
  
// Create a connection to the MongoDB database
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    
    let dbo = db.db("myFirstDatabase");
    
    dbo.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      
      
      let workbook = new excel.Workbook(); //creating workbook
      let worksheet = workbook.addWorksheet('users'); //creating worksheet
  
      //  WorkSheet Header
      worksheet.columns = [
          { header: '_id', key: '_id', width: 10 },
          { header: 'role', key: 'role', width: 30 },
          { header: 'username', key: 'username', width: 30 },
          { header: 'email', key: 'email', width: 30},
          { header: 'password', key: 'password', width: 150},
          { header: 'token', key: 'token', width: 150}
      ];
      
      // Add Array Rows
      worksheet.addRows(result);
      
      // Write to File
      workbook.xlsx.writeFile("users.xlsx")
          .then(function() {
              console.log("file saved!");
          });
      
      db.close();
    });
  });
  
});






    //load data to database

    function loaddata(data) {

        try {
          data.forEach(element => {
            var user = new User(element);
            user.save();
          });
          console.log('Done!');
         
        } catch(e) {
          console.log(e);
         
        }
      };
    
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    var upload = multer({ //multer settings
                    storage: storage,
                    fileFilter : function(req, file, callback) { //file filter
                        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }
                }).single('file');
    /** API path that will upload the files */
    router.post('/upload', function(req, res) {
        var exceltojson;
        
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
          
            /** Multer gives us file info in req.file object */
            if(!req.file){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
            /** Check the extension of the incoming file and
             *  use the appropriate module
             */
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
                exceltojson({
                    input: req.file.path,
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true
                }, function(err,result){
                    if(err) {
                        return res.json({error_code:1,err_desc:err, data: null});
                    }
                    loaddata(result);
                    res.json({error_code:0,err_desc:null, data: result});
                });
            } catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        })
    });


    router.get('/s',function(req,res){
        res.status(200).send(`Welcome to login , sign-up api`);
    });
    

module.exports = router;