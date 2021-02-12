const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({//Create user Schema
    name: {
        type: String,
        required: true,
        trim: true,
        max: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    appointments: [//Reference appointment schema
        {
            type: Schema.Types.ObjectId,
            ref:'appointment'
        }
    ]
})

module.exports = mongoose.model('user', userSchema)