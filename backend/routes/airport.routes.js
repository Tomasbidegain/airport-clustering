const Router = require('express');

const { getAllAirports, getAirport, createAirport, deleteAirport } = require('../controllers/airport.controllers');

const router = Router()

router.get('/getAllAirports', getAllAirports)
router.get('/getAirport', getAirport)
router.post('/createAirport', createAirport)
router.delete('/deleteAirport', deleteAirport)


module.exports = router