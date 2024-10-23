const mongoose = require('mongoose');



const DailyReportSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    till:{
        type:Number,
        required: true
    },
    deficit:{
        type: Number
    },
    surplus:{
        type: Number
    },
    sales:{
        type: Number,
        default: 0,
    },
    expenses:{
        type: Number,
        required: true
    },
    cash:{
        type: Number,
        required: true
    },
    coins:{
        type: Number,
        required: true
    },
    toBank:{
        type: Number,
        required: true
    }
}, {timestamps: true});



const DailyReport = mongoose.model('DailyReport', DailyReportSchema);

module.exports= DailyReport;