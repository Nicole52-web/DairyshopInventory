const DailyReport = require("../Model/DailyReport");



const createDailyReport = async (req, res) => {
    try {
        const { date,till, deficit, surplus,sales, expenses, cash, coins} = req.body;


        const dailyReport = new DailyReport({
            date,
            till,
            deficit,
            surplus,
            sales,
            expenses,
            cash,
            coins
        });

        await dailyReport.save();

        res.status(201).json({ message: "Daily report created successfully", dailyReport})
    } catch (error) {
        res.status(500).json({ message: "Error creating daily report", error: error.message})
    }
};

const getAllDailyReports = async (req, res) => {
    try {
        const reports = await DailyReport.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving reports", error: error.message})
    }
};

const getDailyReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await DailyReport.findById(id);

        if (!report){
            return res.status(404).json({ message: "Daily report not found"});
        }

        res.status(200).json(report)
    } catch (error) {
        res.status(500).json({ message: "Error retrieving report", error: error.message})
    }
};

const updateDailyReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { date,till, deficit, surplus,sales, expenses, cash, coins} = req.body;


        const updatedReport = await DailyReport.findByIdAndUpdate(
            id,
            {date,till, deficit, surplus,sales, expenses, cash, coins},
            { new: true}
        );

        if (!updatedReport) {
            return res.status(404).json({ message: "Daily report not found"});
        }

        res.status(200).json({ message: "Daily report updated successfully", report: updatedReport })
    } catch (error) {
        res.status(500).json({message: "Error updating report", error: error.message})
    }
};

const deleteDailyReport = async (req,res) => {
    try {
        const { id } = req.params;

        const deletedReport = await DailyReport.findByIdAndDelete(id);

        if (!deletedReport){
            return res.status(404).json({message: "Daily report not found"});
        }

        res.status(200).json({ message: "Daily report deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error deleting report", error: error.message})
    }
};

module.exports = { createDailyReport, getAllDailyReports, getDailyReportById, updateDailyReport, deleteDailyReport}