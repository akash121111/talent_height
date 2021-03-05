const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    name:{
        type: String,
        required: [true,'channel name is required'],
        maxlength: 100,
    },
    creator:{
        type: Schema.Types.ObjectId, 
        ref: 'users',
        required: true
    },
    description: String,
    subscribers: [{ type: Schema.Types.ObjectId, ref:'users'}],
    views: {
        type: Number,
        default: 0
    },
    watchtime:{
        hours:{
            type:Number,
            default:0
        },
        minutes:{
            type: Number,
            default: 0
        },
        seconds:{
            type: Number,
            default: 0
        }
    },
    videos:[{ type: Schema.Types.ObjectId, ref:'Video'}],
    category:{
        type: String,
        enum:['sports', 'news', 'entertainment'],
        required: [true, 'choose category']
    },
    isMonotized: {type: Boolean, default:false},
    created_at: {
        type : Date,
        default : Date.now(),
    }

});

module.exports = mongoose.model('Channel', channelSchema);