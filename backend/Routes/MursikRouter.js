const express = require('express');
const { createMursikEntry, getAllMursik, getMursikById, updateMursik, deleteMursik } = require('../Controller/mursikController');
const MursikRouter = express.Router();

MursikRouter.post('/create', createMursikEntry);
MursikRouter.get('/getAll', getAllMursik);
MursikRouter.get('/:id', getMursikById);
MursikRouter.put('/update/:id', updateMursik)
MursikRouter.delete('/delete/:id',deleteMursik);

module.exports = MursikRouter;