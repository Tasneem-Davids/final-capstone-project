const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { request } = require('express');
const {hash, compare} = require('bcryptjs');

const registerUser = async(req, res) => {//register user function 
    const {name, email, password} = req.body//user info coming from the client

    try{
        const user = await User.findOne({email});

        if(user){
            console.log('Error: User already exists')
            return res.status(400).json({Error: "User already exists"})
        }
        //hash password sent by user from client
        const hashed_password = await hash(password, 10)

        const newUser = new User({
            name: name,
            email: email,
            password: hashed_password
        });

        await newUser.save()//Save new user to db
        return res.status(201).json({Message: 'You have registered successfully, awesome! You will now be redirected to the sign in page.', newUser})
    }
    catch(error){//If an error occurs
        console.log('An error occured when registering')
        res.status(404).json({Error: 'Registration unsuccessful, please try again'})
    }
}


const loginUser = async(req, res) => {
    const {email, password} = req.body//Values coming from the client

    try {
        const user = await User.findOne({email})//Check if user exists
        const validPassword = await compare(password, user.password)//Check if the password provided by the user matches the user password in the database
        
        if(!user){//If user cannot be found
            console.log('User does not exist')
            return res.status(400).json({Error: 'User could not be found, please register'})
        }

        if(!validPassword){//If user cannot be found
            console.log('Password invalid')
            return res.status(404).json({Error: 'Password invalid'})
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})//Create token from user id 

        return res.status(200).json({user, token})//If successful, send user object and token to client in the response

    } catch (error) {//If error occurs when logging in
        console.log('An error occured when logging in')
        return res.status(404).json({Error: 'Login unsuccessful, please try again'})
    }
}

const idUser = async (req, res) => {//Id user when adding a new appointment
    const _id = req.body._id

    try {
        const user = await User.findOne({_id})//Check is user exists

        if(!user){
        console.log('User does not exist')
        return res.status(400).json({Error: 'User does not exist, please register'})
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});//Create a token containing user info

        return res.status(200).json({user, token})

    } catch (error) {
        console.log('An error occured while finding user')
        return res.status(400).json({Error: 'User could not be found'})
    }
}

module.exports = {registerUser, loginUser, idUser}//Export functions