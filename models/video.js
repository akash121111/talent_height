const mongoose = require('mongoose');
const Channel = require('../models/channel');

 const videoSchema = new mongoose.Schema({
        _channel:{  type: mongoose.Schema.Types.ObjectId, ref:'channels'},
        title: {
            type: String,
            required: [true, 'please provide video title'],
        },
        slug:{
            type: String
        },
        description:{
            type: String,
        },
        thumbnail:{
            type: String,
        },
        views:{
            type: Number,
            default: 0
        },
        likes:{
            type: Number,
            default: 0,
        },
        dislike:{
            type: Number,
            default: 0
        },
        shares:{
            type: Number,
            default: 0,
        },
        videolink:{
            type: String,
            required: true,
        },
        watchTime:{
            hours:{ type: Number, min : 0, default:0},
            minutes:{ type: Number, min : 0, max: 59, default:0},
            seconds: { type: Number, min : 0, max: 59, default:0},
        },
        isMonotized:Boolean,
        comments:[{ type: mongoose.Schema.Types.ObjectId, ref:'comments'}],
        created_at:{
            type: Date,
            default: Date.now(),
        }
 });

//  videoSchema.pre('save', async (next)=> {
//      var video = this;
//      const filelink = video.videolink;
//      const filePath = "resources/static/assets/";
//      const filename = Date.now();
//      console.log("hello2");
//      console.log(video.thumbnail);
//     if(typeof video.thumbnail != 'undefined' && video.thumbnail){}
//         console.lgo("here");
//         await exec(`bin/ffmpeg -i ${filelink} -ss 00:00:04.00 -r 1 -an -vframes 1 -f mjpeg ${filePath}/images/${filename}.jpg`, (error, stdout, stderr) => {
//             if(err){
//                 console.log(filelink);
//                 return;
//             }
//             consple.log("hello3");
//             video.thumbnail = filePath+"/images/"+filename.jpg;
//             next();    
//         });
//  });

 videoSchema.post('save', async function(next) {
    console.log(next);
    await Channel.findById(next._channel)
        .then(data => {
            console.log(" channel is available");
            console.log(data);
            const videos = data.videos;
            console.log(" 1");
            videos.push(next._id);
            console.log(" 2");
            data.updateOne({videos: videos})
                .then(data => {
                    console.log(data);
                }).catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
})

 module.exports = mongoose.model("Video", videoSchema);