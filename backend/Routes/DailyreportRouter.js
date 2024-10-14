const express = require('express');
const { createDailyReport, getAllDailyReports, getDailyReportById, updateDailyReport, deleteDailyReport } = require('../Controller/dailyreportController');
const DailyreportRouter = express.Router();

DailyreportRouter.post('/create', createDailyReport);
DailyreportRouter.get('/getAll', getAllDailyReports);
DailyreportRouter.get('/:id', getDailyReportById);
DailyreportRouter.put('/update/:id', updateDailyReport);
DailyreportRouter.delete('/delete/:id', deleteDailyReport);

module.exports = DailyreportRouter;