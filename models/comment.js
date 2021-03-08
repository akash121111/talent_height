const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    _video:{type: mongoose.Schema.Types.ObjectId, ref:'videos'},
    _user: {type: mongoose.Schema.Types.ObjectId, ref:'users' },
    comment:{
        type:String,
        required:true
    },
    like:{
        type: Number,
        default: 0
    },
    dislike:{
        type: Number,
        default: 0,
    },
    replay:[{type: mongoose.Schema.Types.ObjectId, ref:'comments'}],
});

module.exports = mongoose.model("Comment", commentSchema);