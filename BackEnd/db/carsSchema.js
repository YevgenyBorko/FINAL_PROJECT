const { Long } = require('mongodb');
const mongoose = require('mongoose');


const carSchema = mongoose.model('cars', {
    type: {
        type: String,
        required: true
    },timestamp: {
        type: Date,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    carType: {
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


module.exports = carSchema;