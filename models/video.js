const mongoose = require('mongoose');

 const videoSchema = new mongoose.Schema({
        _channel:{  type: mongoose.Schema.Types.ObjectId, ref='channels'},
        title: {
            type: String,
            required: [true, 'please provide video title'],
        },
        description:{
            type: String,
        },
        thumbnail:{
            type: String,
        },
        likes:{
            type: Number,
            default: 0,
        },
        dislike:{
            type: Number,
            default: 0
        },
        isMonotized:Boolean,
        comment:[{ type: mongoose.Schema.Types.ObjectId, ref:'comments'}],
        created_date:{
            type: Date,
            default: Date.now(),
        }
 })