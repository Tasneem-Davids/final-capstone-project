import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css';
import register from '../images/registerImage.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Register extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }

    onChange = (e) => {//This will set the states of the email and password when the user inputs values in the input fields
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onRegister = () => {
        const {name, email, password} = this.state

        axios.post('/auth/register', {name, email, password})//This will send a request to register the user by using the name, email and password the user inputs in state
        .then((res) => (alert(res.data.Message), 
            this.props.history.push('/login')))//This will redirect the user to the sign in page
        .catch((err) => alert('Registration unsuccessful: You may have used an e-mail address that is unavailable. Please check that you have entered your e-mail address correctly and try again.'))
    }

    render(){
        return(
           <div className="content-wrapper">
               <img src={register}/>
               <div className="text-wrapper">
                <h1 className="RegisterHeading">Welcome, you can get started by registering below</h1>
               <Form className="RegisterForm">
                <Form.Group>
                <Form.Label className="RegisterLabel"><b>Name</b></Form.Label>
                <Form.Control type="text" onChange={this.onChange} name="name" placeholder="David Isaacs"/>
                </Form.Group>

               <Form.Group>
               <Form.Label className="RegisterLabel"><b>E-mail Address</b></Form.Label>
               <Form.Control type="email" onChange={this.onChange} name="email" placeholder="isaacsdavid@gmail.com"/>
               <Form.Text className="RegisterMuted">We'll never share your e-mail with anyone else.</Form.Text>
               </Form.Group>

               <Form.Group controlId="formBasicPassword">
               <Form.Label className="RegisterLabel"><b>Password</b></Form.Label>
               <Form.Control type="password" onChange={this.onChange} name="password" placeholder="david123?"/>
               </Form.Group>
               <Button variant="primary" onClick={this.onRegister} className="RegisterButton">Register</Button>
               </Form>
               </div>
           </div> 
        )
    }
}

export default withRouter(Register)