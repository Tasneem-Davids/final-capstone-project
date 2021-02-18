const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet')
const mongoose = require('mongoose');

require('dotenv').config();//To enable the use of env files

app.use(express.urlencoded({ extended: true }))
app.use(express.json())//Middleware
app.use(cors())
app.use(logger('dev'))
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

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

const path = require("path");
if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
app.get("*", (req, res) => {
res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
}

const PORT = process.env.PORT || 8080//Use port

app.listen(PORT, () => {//Listen on port
    console.log(`Now listening on http://localhost:${PORT}`)
})
