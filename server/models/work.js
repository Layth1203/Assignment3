let mongoose = require('mongoose');
// create a model
let workModel = mongoose.Schema({
    name : String,
    sets : Number,
    reps : String,
    description : String,
    targetMuscle : String
    },
    {
        collection: 'workout'
    }
);
module.exports = mongoose.model('Work',workModel);
