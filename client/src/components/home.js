import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import home from '../images/homeImage.jpg';
import Button from 'react-bootstrap/Button';

class Home extends Component{
    constructor(props){
        super(props)
    }
    //This is the home page component
    render(){
        return(
           <div className="content-wrapper">
               <img src={home}/>
               <div className="text-wrapper">
                   <a href="/login"><Button className="HomeLoginButton"><b>Sign in</b></Button></a>{/*Here is the sign button*/}
                   <h1 className="HomeHeading">{`What's up doc, keep track of your\n appointments quick and easy!`}</h1>
                   <br/>
                   <a href="/register"><Button className="HomeButton"><b>Get Started</b></Button></a>{/*Button to register*/}
               </div>
           </div> 
        )
    }
}

export default Home