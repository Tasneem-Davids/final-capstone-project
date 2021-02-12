const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet')
const mongoose = require('mongoose');

require('dotenv').config();//To enable the use of env files

app.use(express.json())//Middleware
app.use(cors())
app.use(logger('dev'))
app.use(helmet())

app.use('/auth', require('./routes/auth.route'))//Import routes
app.use('/appointments', require('./routes/appointments.route'))

mongoose.Promise = global.Promise;

//Connect to database
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log('Application successfully connected to database...')})
.catch(() => {
    console.log('Error: Not able to connect to database..') 
    process.exit();
})

const PORT = process.env.PORT || 8080//Use port

app.listen(PORT, () => {//Listen on port
    console.log(`Now listening on http://localhost:${PORT}`)
})