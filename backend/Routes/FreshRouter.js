const express = require('express');
const { createFreshEntry, getAllFreshMilk, updateFresh, deleteFresh, getFreshById } = require('../Controller/freshController');
const FreshRouter = express.Router();

FreshRouter.post('/create',createFreshEntry);
FreshRouter.get('/getAll', getAllFreshMilk);
FreshRouter.put('/update/:id', updateFresh);
FreshRouter.delete('/delete/:id', deleteFresh)
FreshRouter.get('/:id',getFreshById )

module.exports= FreshRouter;