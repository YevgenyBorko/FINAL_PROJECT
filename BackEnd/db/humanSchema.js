const { Long } = require('mongodb');
const mongoose = require('mongoose');


const humanSchema = mongoose.model('humans', {
    type: {
        type: String,
        required: true
    },timestamp: {
        type: Date,
        required: true
    },
    shirtColor1: {
        type: String,
        required: true
    },
    shirtColor2: {
        type: String,
        required: true
    },
    pantsColor1: {
        type: String,
        required: true,
    },
    pantsColor2: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    bbox: {
        type: Object,
        required: true,
    },
    camera: {
        type: String,
        required: true,
    }
});


module.exports = humanSchema;