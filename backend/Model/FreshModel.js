const mongoose = require ('mongoose');

const FreshSchema = new mongoose.Schema({
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
    litreCost : {
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
    },
}, {timestamps: true}
)

const Fresh = mongoose.model('Fresh', FreshSchema);

module.exports = Fresh;