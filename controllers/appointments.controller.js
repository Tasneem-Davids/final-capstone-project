const Appointment = require('../models/appointments.model')
const User = require('../models/user.model')
const expressJwt = require('express-jwt')

const addAppointments = async(req, res) => {//Function for adding an appointment
    const {_id, name, reason, duration, date, day} = req.body//Value coming from the client

    User.findById(_id).exec((error, user) => {//Check if user exists
        if(error){
            return res.status(400).json({Error: 'User not found'})//If error occurs
        }

        const newAppointment = new Appointment(//Create new appointment 
            {
            name: name,
            reason: reason,
            duration: duration,
            date: date,
            day: day,
            user: _id
        });

        newAppointment.save((err, appointment) => {//Add appointment
            if(err){
                console.log('Could not save appointment')
                return res.status(400).json({Error: 'Appointment could not be saved'})
            }

            return res.status(200).json({//In response, send appointment
                Message: 'Great, your new appointment has been added successfully! You can now view it in your "Appointment Book.',
                appointment,
            });
        });
        
        user.appointments.push(newAppointment);//push new appointment to the user appointments array
        user.save();//Save user with new appointment
    })
}

const fetchAppointments = async(req, res) => {//Fetch all appointments from the database
    const _id = req.user._id//req.user only available when using requireUser middleware

    User.findById(_id).populate('appointments').exec((err, user) => {
        if(err){
            console.log('Failed to fetch appointments')
            return res.status(400).json({Error: 'Failed to fetch appointments'})
        }

        const appointments = user.appointments//User appointments
        return res.send(appointments);//Send apppointments in response
    })
}

const requireUser = expressJwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']})//Identifying a user when fetching appointments using the json web token provided

const removeAppointment = async(req, res) => {//Function for deleting an appointment using the id provided by the user 
    const _id = req.params._id

    Appointment.findOneAndRemove({_id: _id}, (err) => {
        if(err){
            console.log('Could not remove appointment')
            return res.status(400).json({Error: 'Unable to remove appointment'})
        }

        return res.send('Appointment Removed')
    })
}

const fetchAllAppointments = (res) => {//Function for fetching all appointments in the db
    Appointment.find((err) => {
        if(err){
            console.log('An error coccured while trying to fetch data')
            return res.status(400).json({Error: 'An error coccured while trying to fetch data'})
        }

        return res.status(200).json({Message: 'Data was fetched successfully'})
    })
}

const updateAppointment = (req, res) => {//Function for updating appointments
    const {name, reason, duration, date, day, toBeChanged, newValue} = req.body

    Appointment.findOneAndUpdate({name: name, reason: reason, duration: duration, date: date, day: day}, {$set: {[toBeChanged]: newValue}}, (err) => {
        if(err){
            console.log('An error occured while trying to update document')
            return res.status(404).json({Error: 'An error occured while trying to update document'})
        }

        return res.status(201).json({Message: 'Appointment updated successfully! You can now view the changes in your "Appointment Book"'})
    })
}

module.exports = {addAppointments, fetchAppointments, requireUser, removeAppointment, fetchAllAppointments, updateAppointment}