const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'channel name is required'],
        maxlength: 100,
    },
    _creator:{
        type: mongoose.Schema.Types.ObjectId, 
        ref='users'
    },
    description: String,
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref='users'}],
    views: {
        type: Number,
        default: 0
    },
    type:{
        type: String
    },
    created_at: Date.now,
    

});

module.exports = mongoose.model('Channel', channelSchema);