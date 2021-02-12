import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import login from '../images/loginImage.png';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {authenticateUser} from '../utils/utils';
import {withRouter} from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props)

        this.state={
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }

    onChange=(e)=>{//This will set the states of the email and password when the user inputs values in the input fields
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLogin=()=>{
        const {email, password} = this.state

        axios.post('/auth/login', {email, password})//Function for making the login request when the Sign in but below is clicked
        .then((response)=>authenticateUser(response, () => {
            alert('You are now signed in! You will be redirected to your appointment book shortly.')
            this.props.history.push('/appointments')//This will redirect the user to the appointment book if the login is successful
        }))
        .catch((err)=>alert('Sorry, your sign in failed. Please check your user info and try again'))
    }

    render(){
        return(
           <div className="content-wrapper">
               <img src={login}/>
               <div className="text-wrapper">
                <h1 className="LoginHeading">Hey there, please sign in</h1>
               <Form className="LoginForm">
               <Form.Group>
               <Form.Label className="LoginLabel"><b>E-mail Address</b></Form.Label>
               <Form.Control type="email" onChange={this.onChange} name="email" placeholder="isaacsdavid@gmail.com"/>
               <Form.Text className="LoginMuted">We'll never share your e-mail with anyone else.</Form.Text>
               </Form.Group>

               <Form.Group controlId="formBasicPassword">
               <Form.Label className="LoginLabel"><b>Password</b></Form.Label>
               <Form.Control type="password" onChange={this.onChange} name="password" placeholder="david123?"/>
               </Form.Group>
               <Button variant="primary" onClick={this.onLogin} className="LoginButton">Sign in</Button>
               </Form>
               </div>
           </div> 
        )
    }
}

export default withRouter(Login)