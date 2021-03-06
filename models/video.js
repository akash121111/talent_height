const mongoose = require('mongoose');

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
 })