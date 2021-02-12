const express = require('express');
const router = express.Router();

const {addAppointments, fetchAppointments, requireUser, removeAppointment, updateAppointment, fetchAllAppointments} = require('../controllers/appointments.controller');

router.post('/add', addAppointments)//Route for registering a user
router.get('/fetch', requireUser, fetchAppointments)//Route for registering a user
router.delete('/:_id', removeAppointment)//Route for removing an appointment
router.put('/update', updateAppointment)//Route for updating an appointment in the database

module.exports = router;