const Fresh = require("../Model/FreshModel");


const createFreshEntry = async (req, res) => {
    try {

        // console.log('Incoming Data:', req.body)


        
        const {date, supply, price, litresSold, litreCost, remarks} = req.body;

        //calculate the totalCost and amount

        const totalCost = Number(supply) * Number(price);
        const amount = Number(litresSold) * Number(litreCost);

        const fresh = new Fresh ({
            date,
            supply,
            price,
            totalCost,
            litresSold,
            litreCost,
            amount,
            remarks
        });

        await fresh.save();
        res.status(201).json({message: 'Fresh Milk entry created successfully!', fresh});
    } catch (error) {
        res.status(500).json({message: 'Error creating entry', error})
    }
};


const getAllFreshMilk = async (req, res) => {
    try {
        const freshMilkEntries = await Fresh.find();
        res.status(200).json(freshMilkEntries);
    } catch (error) {
       res.status(500).json({message: 'Error retrieving Fresh Milk entries', error}) 
    }
};

const getFreshById = async (req, res) => {
    try {
        const fresh = await Fresh.findById(req.params.id);
        if(!fresh){
            return res.status(404).json({message: 'Fresh Milk entry not found'});
        }
        res.status(200).json(fresh)
    } catch (error) {
      res.status(500).json({message: "Error retrieving Fresh Milk entry"});  
    }
}

const updateFresh = async (req, res) => {
    try {
        const { date, supply, price, litresSold, litreCost,remarks} = req.body;

        const totalCost = Number(supply) * Number(price);
        const amount = Number(litresSold) * Number(litreCost);


        const fresh = await Fresh.findByIdAndUpdate(
            req.params.id,
            {date, supply, price, totalCost, litresSold, litreCost, amount, remarks},
            {new: true}
        );

        if(!fresh){
            return res.status(404).json({message: "Fresh Milk entry not found"});
        }

        res.status(200).json({message: "FreshMilk entry updated successfully!", fresh})
    } catch (error) {
        res.status(500).json({message: "Error updating Fresh Milk entry ", error});
    }
}

const deleteFresh = async (req, res) => {
    try {
        const fresh = await Fresh.findByIdAndDelete(req.params.id);
        if(!fresh){
            res.status(404).json({message: "Fresh Milk entry not found"})
        }
        res.status(200).json({message: "Fresh Milk entry deleted successfully!"});
    } catch (error) {
      res.status(500).json({message: "Error deleting Fresh Milk entry"})  
    }
}

module.exports = {createFreshEntry, getAllFreshMilk, updateFresh, deleteFresh, getFreshById}