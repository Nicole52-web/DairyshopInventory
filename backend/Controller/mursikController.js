const Mursik = require("../Model/MursikModel");


const createMursikEntry = async (req, res) => {
    try {
        const {date, supply, price, litresSold, litreCost, remarks}= req.body;

        const totalCost= Number(supply) * Number(price);
        const amount = Number(litresSold) * Number(litreCost);


        const mursik = new Mursik({
            date,
            supply,
            price,
            totalCost,
            litresSold,
            litreCost,
            amount,
            remarks
        })

        await mursik.save();
        res.status(201).json({message: 'Mursik entry created Successfully!', mursik})
    } catch (error) {
        res.status(500).json({message: 'Error creating mursik entry', error})
    }
}

const getAllMursik = async (req, res) => {
    try {
        const mursikEntries = await Mursik.find();
        res.status(201).json({mursikEntries});
    } catch (error) {
        res.status(500).json({message: 'Error retrieving Mursik entries', error})
    }
}

const getMursikById = async (req,res) => {
    try {
        const mursik = await Mursik.findById(req.params.id);
        if(!mursik){
          return  res.status(404).json({message: "Mursik entry not found"})
        }
        res.status(200).json(mursik)
    } catch (error) {
        res.status(500).json({message: "Error retrieving Mursik entry"})
    }
}

const updateMursik = async (req, res) => {
    try {
        const { date, supply, price, litresSold, litreCost, remarks }= req.body;

        const totalCost = Number(supply) * Number(price);
        const amount = Number(litresSold) * Number(litreCost);
        
        const mursik = await Mursik.findByIdAndUpdate(
            req.params.id,
            {date, supply, price, totalCost, litresSold, litreCost, amount, remarks},
            { new: true}
        )

        if(!mursik){
            return res.status(404).json({message: "Mursik entry not found"});
        }
        res.status(200).json(mursik);
    } catch (error) {
        res.status(500).json({message: "Error retrieving Mursik entry"})
    }
}

const deleteMursik = async (req, res) => {
    try {
        const mursik = await Mursik.findByIdAndDelete(req.params.id);
        if(!mursik){
            return res.status(404).json({message: "MUrsik entry not found"});
        }
        res.status(200).json({message: "Mursik Entry deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Error deleting Mursik entry"})
    }
}

module.exports = {createMursikEntry, getAllMursik, getMursikById, updateMursik, deleteMursik}