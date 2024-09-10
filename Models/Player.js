const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Player Schema
const PlayerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true,
    },
    curr_x: {
        type: Number,
        default: 0
    },
    curr_y: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    days_active: {
        type: Number,
        default: 0
    },
    last_active_date: {
        type: Date,
        default: Date.now
    },
    current_level: {
        type: Number,
        default: 1
    }
});

const PlayerModel = mongoose.model('players', PlayerSchema);
module.exports = PlayerModel;
