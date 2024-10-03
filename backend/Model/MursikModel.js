const mongoose = require('mongoose')


const MursikSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    supply: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    litresSold: {
        type: Number,
        required: true
    },
    litreCost: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    remarks: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Mursik = mongoose.model('Mursik', MursikSchema);

module.exports = Mursik;